using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zyUpload
{
    public class Constant
    {
        public static string IMAGES_UP_PATH = System.Configuration.ConfigurationManager.AppSettings["UploadFilesPath"].ToString().Trim();
    }
}