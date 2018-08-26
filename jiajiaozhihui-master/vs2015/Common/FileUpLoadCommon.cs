using System;
using System.Collections.Generic;
using System.Text;
using System.Web.UI.WebControls;
using System.IO;
using System.Web;
using System.Drawing;
using SfSoft.Common;
using System.Net;
namespace SfSoft.Common
{
    /// <summary>
    /// 通用上传文件类


    /// </summary>
    public class FileUpLoadCommon
    {
        #region "Private Variables"
        private string _path;                   // 上传文件的路径


        private string _fileName;               // 文件名称
        private string _newFileName = "";            // 新的文件名


        private string _fileName_s;             // 缩略图文件名称


        private string _fileName_sy;            // 水印图文件名称（文字）


        private string _fileName_syp;           // 水印图文件名称（图片）


        private string _webFilePath;            // 服务器端文件路径
        private string _webFilePath_s;　　      // 服务器端缩略图路径


        private string _webFilePath_sy;　       // 服务器端带水印图路径(文字)
        private string _webFilePath_syp;　      // 服务器端带水印图路径(图片)
        private string _webFilePath_sypf;　     // 服务器端水印图路径(图片)

        private string _errorMsg;               // 错误信息
        private bool _isDate = true;            // 是否加上日期
        private bool _isThumbnail = true;       // 是否产生缩图
        private bool _isWatermarkT = false;      // 是否产生水印文字
        private bool _isWatermarkP = false;      // 是否产生水印叠加图片
        private bool _isOnly = true;            // 是否只产生一个文件，原始文件＋加水印文字＋加水印图片


        //private bool _isImage = true;           // 是否只充许图片



        private int _width = Common.UpImgWidth;               // 缩图宽度
        private int _height = Common.UpImgHeight;               // 缩图高度
        private string _mode = "Auto";        // 缩图模式 "HW"://指定高宽缩放（可能变形）  "W"//指定宽，高按比例 "H"//指定高，宽按比例  "Cut"://指定高宽裁减（不变形） Auto:自动 
        private string _addText = "supesoft.com";   // 水印文字
        private string _addPicture = Common.UpLoadDir + "shuiyin.jpg";   // 水印文字

        private int _fileSize = 0;          // 图片大小
        private int _fileWidth = 0;         // 图片宽度
        private int _fileHeight = 0;        // 图片高度
        private string _fileType;           // 文件类型
        private string _fileExt; //文件扩展名


        #endregion

        #region "出错信息"
        /// <summary>
        /// 出错信息
        /// </summary>
        public string errorMsg
        {
            get
            {
                return _errorMsg;
            }
        }
        #endregion

        #region 属性 -- 旧文件名
        /// <summary>
        /// 旧文件名
        /// </summary>
        public string fileName
        {
            get
            {
                return _fileName;
            }
        }
        #endregion

        #region 属性 -- 上传后新文件名


        /// <summary>
        /// 上传后新文件名


        /// </summary>
        public string newFileName
        {
            get
            {
                return _newFileName;
            }
        }
        #endregion

        #region 属性 -- 缩图文件名


        /// <summary>
        /// 缩图文件名


        /// </summary>
        public string fileName_s
        {
            get
            {
                return _fileName_s;
            }
        }
        #endregion

        #region 属性 -- 加文字水印的图片
        /// <summary>
        /// 加文字水印的图片
        /// </summary>
        public string fileName_sy
        {
            get
            {
                return _fileName_sy;
            }
        }
        #endregion

        #region 属性 -- 加图片水印的图片
        /// <summary>
        /// 加图片水印的图片
        /// </summary>
        public string fileName_syp
        {
            get
            {
                return _fileName_syp;
            }
        }
        #endregion

        #region 属性 -- 上传的文件的路径
        /// <summary>
        /// 上传的文件的路径
        /// </summary>
        public string path
        {
            get
            {
                return _path;
            }
        }
        #endregion

        #region 属性 -- 文件大小
        /// <summary>
        /// 文件大小
        /// </summary>
        public int fileSize
        {
            get
            {
                return _fileSize;
            }
        }
        #endregion

        #region 属性 -- 图片原始的宽度


        /// <summary>
        /// 图片原始的宽度


        /// </summary>
        public int fileWidth
        {
            get
            {
                return _fileWidth;
            }
        }
        #endregion

        #region 属性 -- 图片原始的高度


        /// <summary>
        /// 图片原始的高度


        /// </summary>
        public int fileHeight
        {
            get { return _fileHeight; }
        }
        #endregion

        #region 属性 -- 文件的类型


        /// <summary>
        /// 文件的类型


        /// </summary>
        public string fileType
        {
            get { return _fileType; }
        }
        #endregion

        #region 属性 -- 设置水印文字
        /// <summary>
        /// 设置水印文字
        /// </summary>
        public string addText
        {
            set { _addText = value; }
        }
        #endregion

        #region 属性 -- 设置水印图片
        /// <summary>
        /// 设置水印图片
        /// </summary>
        public string addPicture
        {
            set { _addPicture = value; }
        }
        #endregion

        #region "文件扩展名"
        /// <summary>
        /// 文件扩展名


        /// </summary>
        public string fileExt
        {
            get
            {
                return _fileExt;
            }
        }
        #endregion

        #region 构造函数


        /// <summary>
        /// 构造函数


        /// </summary>
        public FileUpLoadCommon()
            : this("/public/", true)
        {

        }

        //上传文件
        public static  string UpFile(string filepath, FileUpload file,string  UserDefinedFileName="")
        {
            FileUpLoadCommon fc = new FileUpLoadCommon(Common.UpLoadDir + filepath, false);
            fc.SaveFile(file, false, UserDefinedFileName);
            return fc.newFileName;
  
        }
        public static string UpFile(string prefix,  string filepath, FileUpload file)
        {
            FileUpLoadCommon fc = new FileUpLoadCommon(prefix+ filepath, false);
            fc.SaveFile(file, false);
            return fc.newFileName;

        }
        /// <summary>
        /// 构造函数


        /// </summary>
        /// <param name="filePath">文件路径</param>
        /// <param name="isDate">是否按日期创建目录</param>
        public FileUpLoadCommon(string filePath, bool isDate)
        {
            _path = filePath;
            _isDate = isDate;
            if (_isDate)
                _path += DateTime.Now.ToString("yyyyMMdd") + "/";

            string p = HttpContext.Current.Server.MapPath(_path);
            //如果目录不存在,将创建目录


            if (!Directory.Exists(p))
                Directory.CreateDirectory(p);
        }
        #endregion

        #region 方法 -- 保存文件

        /// <summary>
        /// 指定缩图的宽高


        /// </summary>
        /// <param name="fu">文件类型</param>
        /// <param name="Width">宽</param>
        /// <param name="Height">高</param>
        /// <returns></returns>
        public bool SaveImage(HttpPostedFile fu, int Width, int Height)
        {
            _width = Width;
            _height = Height;
            return SaveFile(fu, true);
        }

        /// <summary>
        /// 指定缩图的宽高


        /// </summary>
        /// <param name="fu">文件类型</param>
        /// <param name="Width">宽</param>
        /// <param name="Height">高</param>
        /// <param name="Mode">缩图模式 "HW"://指定高宽缩放（可能变形）  "W"//指定宽，高按比例 "H"//指定高，宽按比例  "Cut"://指定高宽裁减（不变形） </param>
        /// <returns></returns>
        public bool SaveImage(HttpPostedFile fu, int Width, int Height, string Mode)
        {
            _width = Width;
            _height = Height;
            _mode = Mode;
            return SaveFile(fu, true);
        }
        #endregion

        #region 方法 -- 保存文件
        /// <summary>
        /// 保存文件
        /// </summary>
        /// <param name="fu">上传文件对象</param>
        /// <param name="IsImage">是否图片</param>
        /// <param name="IsMakeSize">是否缩图</param>
        /// <param name="UserDefinedFileName">自定义文件名</param>
        /// <returns>成功/失败</returns>
        public bool SaveFile(HttpPostedFile fu, bool IsImage, bool IsMakeSize,string UserDefinedFileName="")
        {
            _isThumbnail = IsMakeSize;
            if (fu.ContentLength > 0)
            {
                string fileContentType = fu.ContentType;

                string name = fu.FileName;                        // 客户端文件路径


                FileInfo file = new FileInfo(name);
                _fileExt = file.Extension;
                _fileType = fu.ContentType;
                _fileSize = fu.ContentLength;

                bool isfileTypeImages = false;
                if (fileContentType == "image/x-png" || fileContentType == "image/bmp" || fileContentType == "image/gif" || fileContentType == "image/pjpeg" || fileContentType == "image/jpeg")
                {
                    isfileTypeImages = true;
                }

                if (IsImage == true && isfileTypeImages == false)
                {
                    _errorMsg = "文件类型不是图片!";

                    return false;
                }


                sys_ConfigDataTable sys_Config = new sys_ConfigDataTable();
                //检测文件扩展名是否正确
                if (!Common.Check_Char_Is(file.Extension.Substring(1).ToLower(), sys_Config.C_UploadFileExt.ToLower()))
                {
                    _errorMsg = string.Format("文件扩展名不符合系统需求:{0}", sys_Config.C_UploadFileExt);
                    //fu.Dispose();
                    return false;
                }
                if (_fileSize / 1024 > sys_Config.C_UploadSizeKb)
                {
                    _errorMsg = string.Format("上传文件超过系统允许大小:{0}K", sys_Config.C_UploadSizeKb);
                    //fu.Dispose();
                    return false;
                }


                _fileName = file.Name;                                // 文件名称
                if (UserDefinedFileName == "")
                {
                    _newFileName = CreateFileName() + file.Extension;
                }
                else {
                    _newFileName = UserDefinedFileName + file.Extension;
                }
                _webFilePath = HttpContext.Current.Server.MapPath(_path + _newFileName);         // 服务器端文件路径

                if (isfileTypeImages)
                {
                    _fileName_s = "s_" + _newFileName;                      // 缩略图文件名称


                    if (_isOnly)
                    {
                        _fileName_sy = _newFileName;                     // 水印图文件名称（文字）


                        _fileName_syp = _newFileName;                    // 水印图文件名称（图片）


                    }
                    else
                    {
                        _fileName_sy = "sy_" + _newFileName;                     // 水印图文件名称（文字）


                        _fileName_syp = "syp_" + _newFileName;                    // 水印图文件名称（图片）


                    }


                    _webFilePath_s = HttpContext.Current.Server.MapPath(_path + _fileName_s);　　   // 服务器端缩略图路径


                    _webFilePath_sy = HttpContext.Current.Server.MapPath(_path + _fileName_sy);　    // 服务器端带水印图路径(文字)
                    _webFilePath_syp = HttpContext.Current.Server.MapPath(_path + _fileName_syp);　   // 服务器端带水印图路径(图片)
                    _webFilePath_sypf = HttpContext.Current.Server.MapPath(_addPicture);　  // 服务器端水印图路径(图片)    



                    //检查文件是否存在
                start:
                    if (!File.Exists(_webFilePath))
                    {
                    
                        try
                        {
                            fu.SaveAs(_webFilePath);                                 // 使用 SaveAs 方法保存文件     

                            if (_isWatermarkT)
                                AddShuiYinWord(_webFilePath, _webFilePath_sy);
                            if (_isWatermarkP)
                                AddShuiYinPic(_webFilePath, _webFilePath_syp, _webFilePath_sypf);
                            if (_isThumbnail)
                                MakeThumbnail(_webFilePath, _webFilePath_s, _width, _height, _mode);   // 生成缩略图方法



                            // 只有上传完了,才能获取图片大小
                            if (File.Exists(_webFilePath))
                            {
                                System.Drawing.Image originalImage = System.Drawing.Image.FromFile(_webFilePath);
                                try
                                {
                                    _fileHeight = originalImage.Height;
                                    _fileWidth = originalImage.Width;
                                }
                                finally
                                {
                                    originalImage.Dispose();
                                }
                            }

                            _errorMsg = string.Format("提示：文件“{0}”成功上传，并生成“{1}”缩略图，文件类型为：{2}，文件大小为：{3}B", _newFileName, _fileName_s, fu.ContentType, fu.ContentLength);
                            //fu.Dispose();
                            return true;
                        }
                        catch (Exception ex)
                        {
                            _errorMsg = "提示：文件上传失败，失败原因：" + ex.Message;
                        }
                    }
                    else
                    {
                        try
                        {
                            File.Delete(_webFilePath);
                        }
                        catch (Exception ex) { 
                        
                        }
                        goto start;
                        //_errorMsg = "提示：文件已存在;
                    }
                }
                else
                {
                    //上传文件
                    //检查文件是否存在


                    if (!File.Exists(_webFilePath))
                    {
                        try
                        {
                            fu.SaveAs(_webFilePath);                                 // 使用 SaveAs 方法保存文件
                            _errorMsg = string.Format("提示：文件“{0}”成功上传，并生成“{1}”缩略图，文件类型为：{2}，文件大小为：{3}B", _newFileName, _fileName_s, fu.ContentType, fu.ContentLength);
                            //fu.Dispose();
                            return true;
                        }
                        catch (Exception ex)
                        {
                            _errorMsg = "提示：文件上传失败，失败原因：" + ex.Message;
                        }
                    }
                    else {
                        try
                        {
                            File.Delete(_webFilePath);
                            fu.SaveAs(_webFilePath);                                 // 使用 SaveAs 方法保存文件
                            _errorMsg = string.Format("提示：文件“{0}”成功上传，并生成“{1}”缩略图，文件类型为：{2}，文件大小为：{3}B", _newFileName, _fileName_s, fu.ContentType, fu.ContentLength);
                            //fu.Dispose();
                            return true;
                        }
                        catch (Exception ex) {
                            _errorMsg = "提示：文件上传失败，失败原因：" + ex.Message;
                        }
                    }
                }
            }
            else
            {
                _errorMsg = "提示:文件不能为空,请选择要上传文件!";
            }
            return false;
        }

        /// <summary>
        /// 保存文件
        /// </summary>
        /// <param name="fu">文件对象</param>
        /// <param name="IsImage">是否图片</param>
        /// <param name="UserDefinedFileName">自定义文件名</param>
        /// <returns>成功/失败</returns>
        public bool SaveFile(HttpPostedFile fu, bool IsImage,string  UserDefinedFileName="")
        {
            return SaveFile(fu, IsImage, true,UserDefinedFileName);
        }
        /// <summary>
        /// 保存文件
        /// </summary>
        /// <param name="fu">上传文件对象</param>
        /// <param name="IsImage">是否图片</param>
        /// <param name="UserDefinedFileName">自定义文件名</param>
        /// <returns>成功/失败</returns>
        public bool SaveFile(FileUpload fu, bool IsImage, string UserDefinedFileName = "")
        {
            bool rBool = false;
            rBool = SaveFile(fu.PostedFile, IsImage, UserDefinedFileName);
            fu.Dispose();
            return rBool;
        }
        #endregion

        #region 方法 -- 创建新的文件名


        /// <summary>
        /// 创建新的文件名


        /// </summary>
        /// <returns></returns>
        public string CreateFileName()
        {
            string guid = System.Guid.NewGuid().ToString().ToLower();
            guid = guid.Replace("-", "");

            return DateTime.Now.ToString("yyyyMMddhhmmss") + guid.Substring(0, 4);
        }
        #endregion

        #region 方法 -- 删除文件
        /// <summary>
        /// 删除文件
        /// </summary>
        /// <param name="filename"></param>
        public static void DeleteFile(string filename)
        {
            string s = HttpContext.Current.Server.MapPath(filename);
            if (File.Exists(s))
            {
                try
                {
                    File.Delete(s);
                }
                catch
                { }
            }
        }
        #endregion

        #region 方法 -- 生成缩略图


        /**/
        /// <summary>
        /// 生成缩略图


        /// </summary>
        /// <param name="originalImagePath">源图路径（物理路径）</param>
        /// <param name="thumbnailPath">缩略图路径（物理路径）</param>
        /// <param name="width">缩略图宽度</param>
        /// <param name="height">缩略图高度</param>
        /// <param name="mode">生成缩略图的方式</param>   
        public static void MakeThumbnail(string originalImagePath, string thumbnailPath, int width, int height, string mode)
        {
            System.Drawing.Image originalImage = System.Drawing.Image.FromFile(originalImagePath);

            int towidth = width;
            int toheight = height;

            int x = 0;
            int y = 0;
            int ow = originalImage.Width;
            int oh = originalImage.Height;

            if (ow < towidth && oh < toheight)
            {
                originalImage.Save(thumbnailPath);
            }
            else
            {

                switch (mode.ToUpper())
                {
                    case "HW"://指定高宽缩放（可能变形）           
                        break;
                    case "W"://指定宽，高按比例             
                        toheight = originalImage.Height * width / originalImage.Width;
                        break;
                    case "H"://指定高，宽按比例
                        towidth = originalImage.Width * height / originalImage.Height;
                        break;
                    case "CUT"://指定高宽裁减（不变形）           
                        if ((double)originalImage.Width / (double)originalImage.Height > (double)towidth / (double)toheight)
                        {
                            oh = originalImage.Height;
                            ow = originalImage.Height * towidth / toheight;
                            y = 0;
                            x = (originalImage.Width - ow) / 2;
                        }
                        else
                        {
                            ow = originalImage.Width;
                            oh = originalImage.Width * height / towidth;
                            x = 0;
                            y = (originalImage.Height - oh) / 2;
                        }
                        break;
                    case "AUTO": //自动适应高度
                        if (ow > oh)
                        {
                            //newwidth = 200;
                            toheight = (int)((double)oh / (double)ow * (double)towidth);
                        }
                        else
                        {
                            //newheight = 200;
                            towidth = (int)((double)ow / (double)oh * (double)toheight);
                        }
                        break;
                    default:
                        break;
                }

                //进行缩图
                Bitmap img = new Bitmap(towidth, toheight);
                img.SetResolution(72f, 72f);
                Graphics gdiobj = Graphics.FromImage(img);
                gdiobj.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
                gdiobj.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                gdiobj.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                gdiobj.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                gdiobj.FillRectangle(new SolidBrush(Color.White), 0, 0,
                                towidth, toheight);
                Rectangle destrect = new Rectangle(0, 0,
                                towidth, toheight);
                gdiobj.DrawImage(originalImage, destrect, 0, 0, ow,
                                oh, GraphicsUnit.Pixel);
                System.Drawing.Imaging.EncoderParameters ep = new System.Drawing.Imaging.EncoderParameters(1);
                ep.Param[0] = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, (long)100);
                System.Drawing.Imaging.ImageCodecInfo ici = GetEncoderInfo("image/jpeg");
                try
                {
                    if (ici != null)
                    {
                        img.Save(thumbnailPath, ici, ep);
                    }
                    else
                    {
                        img.Save(thumbnailPath, System.Drawing.Imaging.ImageFormat.Jpeg);
                    }
                }
                catch (System.Exception e)
                {
                    throw e;
                }
                finally
                {
                    gdiobj.Dispose();
                    img.Dispose();
                }
            }
            originalImage.Dispose();
        }


        private static System.Drawing.Imaging.ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            int j;
            System.Drawing.Imaging.ImageCodecInfo[] encoders;
            encoders = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders();
            for (j = 0; j < encoders.Length; ++j)
            {
                if (encoders[j].MimeType == mimeType)
                    return encoders[j];
            }
            return null;
        }

        #endregion

        #region 方法 -- 在图片上增加文字水印
        /**/
        /// <summary>
        /// 在图片上增加文字水印
        /// </summary>
        /// <param name="Path">原服务器图片路径</param>
        /// <param name="Path_sy">生成的带文字水印的图片路径</param>
        protected void AddShuiYinWord(string Path, string Path_sy)
        {
            System.Drawing.Image image = System.Drawing.Image.FromFile(Path);
            System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(image);
            g.DrawImage(image, 0, 0, image.Width, image.Height);
            System.Drawing.Font f = new System.Drawing.Font("Verdana", 16);
            System.Drawing.Brush b = new System.Drawing.SolidBrush(System.Drawing.Color.Blue);
            g.DrawString(_addText, f, b, 15, 15);
            g.Dispose();
            image.Save(Path_sy);
            image.Dispose();
        }
        #endregion

        #region 方法 -- 在图片上生成图片水印
        /**/
        /// <summary>
        /// 在图片上生成图片水印
        /// </summary>
        /// <param name="Path">原服务器图片路径</param>
        /// <param name="Path_syp">生成的带图片水印的图片路径</param>
        /// <param name="Path_sypf">水印图片路径</param>
        protected void AddShuiYinPic(string Path, string Path_syp, string Path_sypf)
        {
            System.Drawing.Image image = System.Drawing.Image.FromFile(Path);
            System.Drawing.Image copyImage = System.Drawing.Image.FromFile(Path_sypf);
            System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(image);
            g.DrawImage(copyImage, new System.Drawing.Rectangle(image.Width - copyImage.Width, image.Height - copyImage.Height, copyImage.Width, copyImage.Height), 0, 0, copyImage.Width, copyImage.Height, System.Drawing.GraphicsUnit.Pixel);
            g.Dispose();
            image.Save(Path_syp);
            image.Dispose();
        }
        #endregion
        /// <summary>
        /// 取扩展名
        /// </summary>
        /// <param name="FileName"></param>
        /// <returns></returns>
        public static string GetExtName(string FileName)
        {
            string ExtName = "";
            if (FileName != "")
            {
                int l = FileName.LastIndexOf('.');
                ExtName = FileName.Substring(l+1, FileName.Length-l-1);
            }
            return ExtName;
        }
        /// <summary>
        /// 取文件名不带扩展名


        /// </summary>
        /// <param name="FileName"></param>
        /// <returns></returns>
        public static string GetFileName(string FileName)
        {
            string FName = "";
            if (FileName != "")
            {
                int l = FileName.LastIndexOf('.');
                FName = FileName.Substring(0, l);
            }
            return FName;
        }

        /// <summary>
        /// WebClient上传文件至服务器（不带进度条）
        /// </summary>
        /// <param name="fileNameFullPath">要上传的文件（全路径格式）</param>
        /// <param name="strUrlDirPath">Web服务器文件夹路径</param>
        /// <param name="strFileName">新文件名</param>
        /// <returns>True/False是否上传成功</returns>
        public static bool UpLoadFile(string fileNameFullPath, string strUrlDirPath,string strFileName)
        {
            //得到要上传的文件文件名
            string fileName = fileNameFullPath.Substring(fileNameFullPath.LastIndexOf("\\") + 1);
            //新文件名
            string NewFileName = strFileName + fileNameFullPath.Substring(fileNameFullPath.LastIndexOf("."));
            //得到文件扩展名
            string fileNameExt = fileName.Substring(fileName.LastIndexOf(".") + 1);

            if (strUrlDirPath.EndsWith("/") == false) strUrlDirPath = strUrlDirPath + "/";
            if (Directory.Exists(System.Web.HttpContext.Current.Server.MapPath(strUrlDirPath)))
            {
                Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath(strUrlDirPath));
            }
            //保存在服务器上时，将文件改名（示业务需要）
            strUrlDirPath = strUrlDirPath + NewFileName;
            // 创建WebClient实例
            WebClient myWebClient = new WebClient();
            myWebClient.Credentials = CredentialCache.DefaultCredentials;
            // 将要上传的文件打开读进文件流
            FileStream myFileStream = new FileStream(fileNameFullPath, FileMode.Open, FileAccess.Read);
            BinaryReader myBinaryReader = new BinaryReader(myFileStream);
            try
            {
                byte[] postArray = myBinaryReader.ReadBytes((int)myFileStream.Length);
                //打开远程Web地址，将文件流写入
                Stream postStream = myWebClient.OpenWrite(strUrlDirPath, "PUT");
                if (postStream.CanWrite)
                {
                    postStream.Write(postArray, 0, postArray.Length);
                }
                else
                {
                    //MessageBox.Show("Web服务器文件目前不可写入，请检查Web服务器目录权限设置！","系统提示",MessageBoxButtons.OK,MessageBoxIcon.Information);
                }
                postStream.Close();//关闭流
                return true;
            }
            catch (Exception exp)
            {
                //MessageBox.Show("文件上传失败：" + exp.Message, "系统提示", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return false;
            }
        }
    }
}
