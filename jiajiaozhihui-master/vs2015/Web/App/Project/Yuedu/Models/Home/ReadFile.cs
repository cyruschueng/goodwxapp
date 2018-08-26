using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Models.Home
{
    public class ReadFile
    {
        public int FileId { get; set; }
        
        public int? LikeNumber { get; set; }
        public int? CommentNumber { get; set; }
        public string ReleaseTime { get; set; }
        public int? IsTop { get; set; }
        public string Comment { get; set; }
        public bool IsLike { get; set; }
        public bool IsRight { get; set; }
        public bool IsDelete { get; set; }
        public int IntervalDay { get; set; }
        public int FileType { get; set; }
        public List<Models.Home.Media> Medias { get; set; }
        public List<Models.Home.Like> Likes { get; set; }
        public List<Models.Home.Comment> Comments { get; set; }
        public Models.Home.WxUserInfo WxUserInfo { get; set; }
        public Models.Home.Player Player { get; set; }
    }
}