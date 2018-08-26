using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;
using Web.Models.Pictures;

namespace Web.Controllers
{
    public class PictureController : Controller
    {
        [HttpPost]
        public ActionResult SingleAsyncUpload()
        {
            var model = new PictureModel();

            try
            {
                var file = Request.Files[0];

                if (file == null)
                {
                    throw new MyProException("没有文件上传");
                }

                var stream = file.InputStream;
                var fileName = Path.GetFileName(file.FileName);
                var contentType = file.ContentType;

                var fileBinary = new byte[stream.Length];
                stream.Read(fileBinary, 0, fileBinary.Length);

                var fileExtension = Path.GetExtension(fileName);

                if (!string.IsNullOrEmpty(fileExtension))
                    fileExtension = fileExtension.ToLowerInvariant();

                model.code = 0;
                model.msg = "";
                model.data = new PictureModelReturnData()
                {
                    src = SaveImg("/uploadImg/" + DateTime.Now.ToString("yyyyMMdd") + "/", fileExtension, fileBinary)
                };
            }
            catch (Exception ex)
            {
                model.code = -1;
                model.msg = ex.Message;
                model.data = null;
            }
            return Json(model);
        }

        [NonAction]
        string SaveImg(string uploadDirectory, string fileExtension, byte[] pictureBinary)
        {
            var random = new Random(unchecked((int)DateTime.Now.Ticks));
            var fileName = (Environment.TickCount & int.MaxValue).ToString() + random.Next(1000, 9999).ToString() + fileExtension;
            System.IO.File.WriteAllBytes(GetPictureLocalPath(uploadDirectory, fileName), pictureBinary);
            return uploadDirectory + fileName;
        }


        [NonAction]
        private string GetPictureLocalPath(string uploadDirectory, string fileName)
        {
            var imagesDirectoryPath = MapPath(uploadDirectory);
            Directory.CreateDirectory(imagesDirectoryPath);

            var filePath = Path.Combine(imagesDirectoryPath, fileName);
            return filePath;
        }

        [NonAction]
        string MapPath(string path)
        {
            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            path = path.Replace("~/", "").TrimStart('/').Replace('/', '\\');
            return Path.Combine(baseDirectory, path);
        }
    }
}