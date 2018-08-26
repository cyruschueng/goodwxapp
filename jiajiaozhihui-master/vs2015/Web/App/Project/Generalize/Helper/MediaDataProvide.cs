using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Threading.Tasks;

namespace SfSoft.web.Generalize.Helper
{
    public class MediaDataProvide
    {
        private int _x = 0;
        private int _y = 0;
        private int _h = 0;
        private int _w = 0;
        private string _openId;
        private string _path;
        private int _size;
        private string _bg;
        private int _fontx = 0;
        private int _fonty = 0;
        private string _catalogue = "1";
        string AppId = App.Helper.WxBaseConfig.GxAppID;
        string AppSecret = App.Helper.WxBaseConfig.GxAppSecret;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="x">x坐标</param>
        /// <param name="y">y坐标</param>
        public MediaDataProvide(int x, int y,int w,int h,string openId,string bg, int fontx,int fonty,string catalogue, int size=238 )
        {
            this._x = x;
            this._y = y;
            this._w = w;
            this._h = h;
            this._openId = openId;
            this._size = size;
            this._bg = bg;
            this._fontx = fontx;
            this._fonty = fonty;
            this._catalogue = catalogue;

            this._path= System.AppDomain.CurrentDomain.BaseDirectory + "Files\\generalize\\";
        }
        public MediaDataProvide(string openId, string catalogue, string tmpid, int size = 238)
        {
            BLL.WX_SGroup_Tpl bll = new BLL.WX_SGroup_Tpl();
            var model = bll.GetModel(int.Parse(tmpid));


            this._x = Convert.ToInt32(model.qrcodex ?? 0);
            this._y = Convert.ToInt32(model.qrcodey ?? 0);
            this._w = Convert.ToInt32(model.qrcodew ?? 0);
            this._h = Convert.ToInt32(model.qrcodeh ?? 0);
            this._openId = openId;
            this._size = size;
            this._bg = model.src;
            this._fontx = Convert.ToInt32(model.tagx ?? 0);
            this._fonty = Convert.ToInt32(model.tagy ?? 0);
            this._catalogue = catalogue;

            this._path = System.AppDomain.CurrentDomain.BaseDirectory + "Files\\generalize\\";
        }
        public MediaDataProvide(string openId)
        {
            this._openId = openId;
            this._path = System.AppDomain.CurrentDomain.BaseDirectory + "Files\\generalize\\";
        }
        /// <summary>
        /// 上传图片到微信服务器并下载到本地
        /// </summary>
        /// <param name="imageMediaId"></param>
        /// <returns></returns>
        public string UploadImg(string imageMediaId)
        {
            string accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(AppId, AppSecret);

            var url = string.Format("http://api.weixin.qq.com/cgi-bin/media/get?access_token={0}&media_id={1}", accessToken, imageMediaId);
            WebClient wc = new WebClient();
            using (MemoryStream ms = new MemoryStream())
            {
                var res = wc.DownloadData(new Uri(url));
                ms.Write(res, 0, res.Length);
                if (ms.Length > 0)
                {
                    return SaveImg(ms);
                }
                else
                {
                    return "";
                }
            }
        }
        public void CreatePoster3(string openId, int contextId, string groupType)
        {
            var groupInfo = GetGroupInfo(int.Parse(groupType));
            //直接读取上传的二维码
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var model = bll.GetModel(contextId);
            if (model != null) {
                var contextImgSrc = model.img_url.Substring(1).Replace("/", "\\");
                //背景图片
                // / Files / group / 2017091503394168c2.jpg
                string sourceImg = AppDomain.CurrentDomain.BaseDirectory + this._bg.Substring(1).Replace("/", "\\");

                /*合成二维码*/
                var pathImg = CombinImage(sourceImg, contextImgSrc, this._x, this._y, this._w, this._h, this._fontx, this._fonty, groupInfo.Remark);

                /*发送二维码到微信*/
                var result = Senparc.Weixin.MP.AdvancedAPIs.MediaApi.UploadTemporaryMedia(AppId, Senparc.Weixin.MP.UploadMediaFileType.image, pathImg);
                var mediaId = result.media_id;

                Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendText(AppId, this._openId, "您的海报生成成功，可以分享朋友圈啦！");
                Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendImage(AppId, this._openId, mediaId, 60000);

                //二维码存存地址
                var path = this._path + openId + "\\group.png";

                /*单独二维码*/
                result = Senparc.Weixin.MP.AdvancedAPIs.MediaApi.UploadTemporaryMedia(AppId, Senparc.Weixin.MP.UploadMediaFileType.image, path);
                mediaId = result.media_id;

                Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendText(AppId, this._openId, "亲，如果你觉得生成的海报不够完善，你可以拿下面的二维码自己合成！");
                Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendImage(AppId, this._openId, mediaId, 60000);
            }
            
        }
        /// <summary>
        ///  海报生成 
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="groupType"></param>
        public void CreatePoster2(string openId, string groupType)
        {
            var groupInfo = GetGroupInfo(int.Parse(groupType));
            //生成二维码
            SfSoft.SfEmc.QRCode qrcode = new SfEmc.QRCode();
            //要生成二维码的url格式
            //http://weixin.jiajiaozhihui.cn/app/client/ReadQRCord/index.html?groupId=1&contentId=122
            var content = string.Format("http://weixin.jiajiaozhihui.cn/app/client/ReadQRCord/index.html?groupId={0}&contentId=1&t={1}&catalogue={2}", groupType, Guid.NewGuid().ToString("N"), this._catalogue);

            //如果不存在就创建file文件夹
            if (Directory.Exists(this._path + openId) == false)
            {
                Directory.CreateDirectory(this._path + openId);
            }
            //二维码存存地址
            var path = this._path + openId + "\\group.png";
            //生成二维码


            qrcode.WriteBarcode(content, path, _size);

            //背景图片
            // / Files / group / 2017091503394168c2.jpg
            string sourceImg = AppDomain.CurrentDomain.BaseDirectory +  this._bg.Substring(1).Replace("/","\\");

            var pathImg = CombinImage(sourceImg, path, this._x, this._y, this._w, this._h, this._fontx, this._fonty, groupInfo.Remark);



            /*合成二维码*/
            var result = Senparc.Weixin.MP.AdvancedAPIs.MediaApi.UploadTemporaryMedia(AppId, Senparc.Weixin.MP.UploadMediaFileType.image, pathImg);
            var mediaId = result.media_id;

            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendText(AppId, this._openId, "您的海报生成成功，可以分享朋友圈啦！");
            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendImage(AppId, this._openId, mediaId, 60000);

            /*单独二维码*/
            result = Senparc.Weixin.MP.AdvancedAPIs.MediaApi.UploadTemporaryMedia(AppId, Senparc.Weixin.MP.UploadMediaFileType.image, path);
            mediaId = result.media_id;

            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendText(AppId, this._openId, "亲，如果你觉得生成的海报不够完善，你可以拿下面的二维码自己合成！");
            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendImage(AppId, this._openId, mediaId, 60000);
        }

        /// <summary>
        /// 海报生成
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="groupType"></param>
        public void  CreatePoster(string openId,string groupType)
        {
            var groupInfo = GetGroupInfo(int.Parse( groupType));
            //生成二维码
            SfSoft.SfEmc.QRCode qrcode = new SfEmc.QRCode();
            //要生成二维码的url格式
            //http://weixin.jiajiaozhihui.cn/app/client/ReadQRCord/index.html?groupId=1&contentId=122
            var content = string.Format("http://weixin.jiajiaozhihui.cn/app/client/ReadQRCord/index.html?groupId={0}&contentId=1&t={1}&catalogue={2}", groupType,Guid.NewGuid().ToString("N"),this._catalogue);
            
            //如果不存在就创建file文件夹
            if (Directory.Exists(this._path + openId) == false)
            {
                Directory.CreateDirectory(this._path + openId);
            }
            //二维码存存地址
            var path = this._path + openId + "\\group.png";
            //生成二维码


            qrcode.WriteBarcode(content, path,_size);
            
            //背景图片
            string sourceImg = this._path + this._bg;

            var pathImg = CombinImage(sourceImg, path, this._x, this._y, this._w, this._h,this._fontx,this._fonty,groupInfo.Remark);



            /*合成二维码*/
            var result = Senparc.Weixin.MP.AdvancedAPIs.MediaApi.UploadTemporaryMedia(AppId, Senparc.Weixin.MP.UploadMediaFileType.image, pathImg);
            var mediaId = result.media_id;

            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendText(AppId, this._openId, "您的海报生成成功，可以分享朋友圈啦！");
            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendImage(AppId, this._openId, mediaId, 60000);

            /*单独二维码*/
            result = Senparc.Weixin.MP.AdvancedAPIs.MediaApi.UploadTemporaryMedia(AppId, Senparc.Weixin.MP.UploadMediaFileType.image, path);
            mediaId = result.media_id;

            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendText(AppId, this._openId, "亲，如果你觉得生成的海报不够完善，你可以拿下面的二维码自己合成！");
            Senparc.Weixin.MP.AdvancedAPIs.CustomApi.SendImage(AppId, this._openId, mediaId, 60000);

        }
        /// <summary>
        /// 调用此函数后使此两种图片合并，类似相册，有个
        /// 背景图，中间贴自己的目标图片
        /// </summary>
        /// <param name="sourceImg">粘贴的源图片</param>
        /// <param name="destImg">粘贴的目标图片</param>
        public string CombinImage(string sourceImg, string destImg, int x, int y, int w, int h, int fontx,int fonty, string remark)
        {
            Image imgBack = System.Drawing.Image.FromFile(sourceImg);     //相框图片 
            Image img = System.Drawing.Image.FromFile(destImg);        //照片图片
            //从指定的System.Drawing.Image创建新的System.Drawing.Graphics       
            Graphics g = Graphics.FromImage(imgBack);
            //g.DrawImage(imgBack, 0, 0, 148, 124);      // g.DrawImage(imgBack, 0, 0, 相框宽, 相框高);
            g.FillRectangle(System.Drawing.Brushes.Black, x, y, w, h);//相片四周刷一层黑色边框，这里没有，需要调尺寸
            //g.DrawImage(img, 照片与相框的左边距, 照片与相框的上边距, 照片宽, 照片高);
            g.DrawImage(img, x, y, w, h);
            #region
            //添加文字
            if (!string.IsNullOrEmpty(remark)) {
                Font drawFont = new Font("Arial", 14);
                SolidBrush drawBrush = new SolidBrush(Color.Black);
                g.DrawString(remark, drawFont, drawBrush, fontx, fonty);
            }
            #endregion

            GC.Collect();
            string saveImagePath = this._path + this._openId + ".png";
            //save new image to file system.
            imgBack.Save(saveImagePath, ImageFormat.Png);
            return saveImagePath;
        }
        public string CombinImage(string sourceImg, Stream destImg,int x,int y,int w,int h)
        {
            Image imgBack = System.Drawing.Image.FromFile(sourceImg);     //相框图片 
            Image img = System.Drawing.Image.FromStream(destImg);        //照片图片
            //从指定的System.Drawing.Image创建新的System.Drawing.Graphics       
            Graphics g = Graphics.FromImage(imgBack);
            //g.DrawImage(imgBack, 0, 0, 148, 124);      // g.DrawImage(imgBack, 0, 0, 相框宽, 相框高);
            g.FillRectangle(System.Drawing.Brushes.Black, x, y, w,h);//相片四周刷一层黑色边框，这里没有，需要调尺寸
            //g.DrawImage(img, 照片与相框的左边距, 照片与相框的上边距, 照片宽, 照片高);
            g.DrawImage(img, x, y, w, h);
            GC.Collect();
            string saveImagePath = this._path + this._openId + ".png";
            //save new image to file system.
            imgBack.Save(saveImagePath, ImageFormat.Png);
            
            return saveImagePath;
        }

        private string SaveImg(Stream destImg)
        {
            Image img = System.Drawing.Image.FromStream(destImg);        //照片图片
            //文件夹是不是存在
            if (Directory.Exists(this._path + _openId) == false)
            {
                Directory.CreateDirectory(this._path + _openId);
            }
            string saveImagePath = this._path+this._openId+"\\" + System.Guid.NewGuid().ToString("N") + ".png";
            img.Save(saveImagePath, ImageFormat.Png);
            return saveImagePath;
        }

        public void AddGroupInfo(DateTime date,int groupType,string imgPath,string title,string catalogue, string className)
        {
            BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
            var model = new Model.WX_SGroup_Content() {
                create_date = DateTime.Now,
                valid_date = date,
                group_type = groupType,
                img_url = imgPath,
                introduce = "",
                is_act = 0,
                title =title,
                catalogue=catalogue,
                class_name=className
            };
            bll.Add(model);
        }
        private Model.WX_SGroup GetGroupInfo(int groupId)
        {
            try
            {
                BLL.WX_SGroup bll = new BLL.WX_SGroup();
                var model = bll.GetModel(groupId);
                return model;
            }
            catch (Exception ex) {
                return new Model.WX_SGroup();
            }
            
        }
        public List<Model.WX_SGroup_Tpl>  GetGroupTpl()
        {
            BLL.WX_SGroup_Tpl bll = new BLL.WX_SGroup_Tpl();
            return bll.GetModelList("is_act=1  order by sn ");
        }

        
        

    }
}