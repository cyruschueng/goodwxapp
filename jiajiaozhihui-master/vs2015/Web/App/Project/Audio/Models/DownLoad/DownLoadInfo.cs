using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.DownLoad
{
    public class DownLoadInfo
    {
        public int Id { get; set; }
        public string Tag { get; set; }
        public string Title { get; set; }
        public string Intro { get; set; }
        public string Detail { get; set; }
        public string DownLoadUrl { get; set; }
        public string ImgUrl { get; set; }
        public DateTime? CreatDate { get; set; }
    }
}