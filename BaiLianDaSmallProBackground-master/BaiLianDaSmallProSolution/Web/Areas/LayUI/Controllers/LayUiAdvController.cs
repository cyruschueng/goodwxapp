using BaseDatabase.Entities.Admins.AdvertisingSpaces;
using BaseDatabase.Services.Admins.AdvertisingSpaces;
using MyUntil;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Areas.LayUI.Models;
using Web.Areas.LayUI.Models.Advs;
using Web.Infrastructure;

namespace Web.Areas.LayUI.Controllers
{
    public class LayUiAdvController : BaseAdminWebController
    {
        private readonly IAdvertisingSpaceService _advertisingSpaceService;

        private readonly IAdvContentInfoService _advContentInfoService;

        public LayUiAdvController()
        {
            _advertisingSpaceService = new AdvertisingSpaceService();
            _advContentInfoService = new AdvContentInfoService();
        }

        #region AdvertisingSpace

        public ActionResult AdvertisingSpaceIndex()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AdvertisingSpaceList(ListSearch search,string title)
        {
            var model = new ListResult();
            try
            {
                var list = _advertisingSpaceService.GetPageList(search.pageIndex, search.limit, title);

                model.count = list.TotalRecords;
                model.data = list.Datas.Select(q => new
                {
                    Id = q.Id,
                    Sign = q.Sign,
                    Title = q.Title,
                    Type = ((AdvertisingSpaceType)q.TypeId).GetEnumDescription(),
                    Width = q.Width,
                    Height = q.Height,
                    Intro = q.Intro,
                    CreateOn = q.CreateOn
                });
            }
            catch (Exception ex)
            {
                model.code = -1;
                model.msg = ex.Message;
            }

            return Json(model);
        }

        [NonAction]
        private void CreateTypeList()
        {
            var typeList = new List<SelectListItem>();
            foreach (var item in AdvertisingSpaceType.Fit.ToDic<AdvertisingSpaceType>())
            {
                typeList.Add(new SelectListItem()
                {
                    Text = item.Key,
                    Value = item.Value.ToString()
                });
            }
            ViewBag.TypeList = typeList;
        }

        public ActionResult AddAdvertisingSpace()
        {
            CreateTypeList();
            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        public ActionResult AddAdvertisingSpace(AdvertisingSpaceInfoModel paraModel)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };
            try
            {
                _advertisingSpaceService.Insert(new AdvertisingSpaceInfo()
                {
                    Height = paraModel.Height,
                    Width = paraModel.Width,
                    Sign = Guid.NewGuid().ToString("N"),
                    Intro = paraModel.Intro,
                    Title = paraModel.Title,
                    TypeId = paraModel.TypeId,
                    CreateOn = DateTime.Now
                });
                model.IsSuccess = true;
                model.ReturnMsg = "添加完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }
            return Json(model);
        }

        public ActionResult EditAdvertisingSpace(int id)
        {
            CreateTypeList();
            var model = _advertisingSpaceService.GetById(id);
            return View(model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult EditAdvertisingSpace(AdvertisingSpaceInfoModel paraModel)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };

            try
            {
                _advertisingSpaceService.Update(paraModel);
                model.IsSuccess = true;
                model.ReturnMsg = "编辑完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }

            return Json(model);
        }

        [HttpPost]
        public ActionResult DeleteAdvertisingSpace(int id)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };
            try
            {
                _advertisingSpaceService.Delete(id);
                model.IsSuccess = true;
                model.ReturnMsg = "删除完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }

            return Json(model);
        }

        #endregion



        #region AdvContent

        [NonAction]
        private void CreateAdvertisingSpaceSelectItemList()
        {
            var advertisingSpaceSelectItemList = new List<SelectListItem>();

            var advertisingSpaceList = _advertisingSpaceService.GetList();

            foreach (var item in advertisingSpaceList)
            {
                advertisingSpaceSelectItemList.Add(new SelectListItem()
                {
                    Text = item.Title,
                    Value = item.Sign
                });
            }
            ViewBag.AdvertisingSpaceSelectItemList = advertisingSpaceSelectItemList;
        }

        [NonAction]
        private void CreateAdvContentInfoTypeSelectItemList()
        {
            var advContentInfoTypeSelectItemList = new List<SelectListItem>();
            foreach (var item in AdvContentInfoType.Pic.ToDic<AdvContentInfoType>())
            {
                advContentInfoTypeSelectItemList.Add(new SelectListItem()
                {
                    Text = item.Key,
                    Value = item.Value.ToString()
                });
            }
            ViewBag.AdvContentInfoTypeSelectItemList = advContentInfoTypeSelectItemList;
        }

        [NonAction]
        private void CreateTargetTypeSelectItemList()
        {
            var targetTypeSelectItemList = new List<SelectListItem>();
            foreach (var item in TargetType.Blank.ToDic<TargetType>())
            {
                targetTypeSelectItemList.Add(new SelectListItem()
                {
                    Text = item.Key,
                    Value = item.Value.ToString()
                });
            }
            ViewBag.TargetTypeSelectItemList = targetTypeSelectItemList;
        }

        public ActionResult AdvContentIndex()
        {
            CreateAdvertisingSpaceSelectItemList();
            return View();
        }

        [HttpPost]
        public ActionResult AdvContentList(ListSearch search,string contentJsonKeyword,string advertisingSpaceInfoSign)
        {
            var model = new ListResult();
            try
            {
                var list = _advContentInfoService.GetPageList(search.pageIndex, search.limit, contentJsonKeyword, advertisingSpaceInfoSign);
                var signs = list.Datas.Select(q => q.AdvertisingSpaceInfoSign).ToList();
                var advSpaces = _advertisingSpaceService.GetListByKeys(signs);
                model.count = list.TotalRecords;
                model.data = list.Datas.Select(q =>
                {
                    var advSpace = advSpaces.First(d => d.Sign == q.AdvertisingSpaceInfoSign);
                    return new
                    {
                        Id = q.Id,
                        Sign = q.AdvertisingSpaceInfoSign,
                        Title = q.Title,
                        q.ContentJsonKeyword,
                        AdvSpaceTitle = advSpace.Title,
                        Size = advSpace.Width.ToString() + "x" + advSpace.Height.ToString(),
                        BeginDatetime = q.BeginDatetime,
                        EndDateTime = q.EndDateTime,
                        CreateOn = q.CreateOn
                    };
                }
                );
            }
            catch (Exception ex)
            {
                model.code = -1;
                model.msg = ex.Message;
            }

            return Json(model);
        }

        public ActionResult AddAdvContent()
        {
            CreateAdvertisingSpaceSelectItemList();
            CreateAdvContentInfoTypeSelectItemList();
            CreateTargetTypeSelectItemList();
            ViewBag.Begin = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            ViewBag.End = DateTime.Now.AddMonths(1).ToString("yyyy-MM-dd HH:mm:ss");
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult AddAdvContent(AdvContentInfoModel paraModel, FormCollection form)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };
            try
            {
                var entity = new AdvContentInfo()
                {
                    AdvertisingSpaceInfoSign = paraModel.AdvertisingSpaceInfoSign,
                    Title = paraModel.Title,
                    Order = paraModel.Order,
                    Intro = paraModel.Intro,
                    TargetType = paraModel.TargetType,
                    ContentJsonKeyword = paraModel.ContentJsonKeyword,
                    Price = paraModel.Price,
                    BeginDatetime = paraModel.BeginDatetime,
                    EndDateTime = paraModel.EndDateTime,
                    Type = paraModel.Type
                };

                switch (paraModel.Type)
                {
                    case AdvContentInfoType.Word:
                        var wordModel = new AdvContentWordModel()
                        {
                            WordTitle = form["WordTitle"],
                            WordSize = form["WordSize"],
                            WordColor = form["WordColor"],
                            WordLink = form["WordLink"]
                        };
                        entity.ContentJson = JsonConvert.SerializeObject(wordModel);
                        break;
                    case AdvContentInfoType.Pic:
                        var picModel = new AdvContentPicModel()
                        {
                            PicUrl = form["PicUrl"],
                            PicImageAlt = form["PicImageAlt"],
                            PicLink = form["PicLink"]
                        };
                        entity.ContentJson = JsonConvert.SerializeObject(picModel);
                        break;
                    default:
                        break;
                }

                _advContentInfoService.Insert(entity);
                
                model.IsSuccess = true;
                model.ReturnMsg = "添加完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }
            return Json(model);
        }

        public ActionResult EditAdvContent(int id)
        {
            CreateAdvertisingSpaceSelectItemList();
            CreateAdvContentInfoTypeSelectItemList();
            CreateTargetTypeSelectItemList();

            var model = new EditAdvContentModel();

            model.AdvContentInfoModel = _advContentInfoService.GetById(id);

            if (model.AdvContentInfoModel.Type == AdvContentInfoType.Pic)
            {
                model.AdvContentPicModel = JsonConvert.DeserializeObject<AdvContentPicModel>(model.AdvContentInfoModel.ContentJson);
            }

            if (model.AdvContentInfoModel.Type == AdvContentInfoType.Word)
            {
                model.AdvContentWordModel= JsonConvert.DeserializeObject<AdvContentWordModel>(model.AdvContentInfoModel.ContentJson);
            }

            return View(model);
        }

        [HttpPost]
        public ActionResult EditAdvContent(AdvContentInfoModel paraModel, FormCollection form)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };

            try
            {
                var entityModel = _advContentInfoService.GetById(paraModel.Id);

                entityModel.AdvertisingSpaceInfoSign = paraModel.AdvertisingSpaceInfoSign;
                entityModel.Title = paraModel.Title;
                entityModel.Order = paraModel.Order;
                entityModel.Intro = paraModel.Intro;
                entityModel.TargetType = paraModel.TargetType;
                entityModel.ContentJsonKeyword = paraModel.ContentJsonKeyword;
                entityModel.Price = paraModel.Price;
                entityModel.BeginDatetime = paraModel.BeginDatetime;
                entityModel.EndDateTime = paraModel.EndDateTime;
                entityModel.Type = paraModel.Type;

                switch (paraModel.Type)
                {
                    case AdvContentInfoType.Word:
                        var wordModel = new AdvContentWordModel()
                        {
                            WordTitle = form["WordTitle"],
                            WordSize = form["WordSize"],
                            WordColor = form["WordColor"],
                            WordLink = form["WordLink"]
                        };
                        entityModel.ContentJson = JsonConvert.SerializeObject(wordModel);
                        break;
                    case AdvContentInfoType.Pic:
                        var picModel = new AdvContentPicModel()
                        {
                            PicUrl = form["PicUrl"],
                            PicImageAlt = form["PicImageAlt"],
                            PicLink = form["PicLink"]
                        };
                        entityModel.ContentJson = JsonConvert.SerializeObject(picModel);
                        break;
                    default:
                        break;
                }

                _advContentInfoService.Update(entityModel);

                model.IsSuccess = true;
                model.ReturnMsg = "编辑完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }

            return Json(model);
        }

        [HttpPost]
        public ActionResult DeleteAdvContent(int id)
        {
            var model = new BaseReturnModel() { IsSuccess = false, ReturnMsg = "操作失败" };
            try
            {
                _advContentInfoService.Delete(id);
                model.IsSuccess = true;
                model.ReturnMsg = "删除完成";
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }

            return Json(model);
        }

        #endregion
    }
}