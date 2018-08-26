using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Home
{
    public class PlayerTask
    {
        public int PlayerTaskId { get; set; }
        public int ThemeId { get; set; }
        public string ThemeName { get; set; }
        public int Week { get; set; }
        public int TaskId { get; set; }
        public int? LikeNumber { get; set; }
        public int? CommentNumber { get; set; }
        public string ReleaseTime { get; set; }
        public int? IsTop { get; set; }
        public string Comment { get; set; }
        public bool IsLike { get; set; }
        public bool IsRight { get; set; }
        public bool IsDelete { get; set; }
        public string TaskContent { get; set; }
        public string TaskIntroduce { get; set; }
        public int TaskSn { get; set; }
        public int IntervalDay { get; set; }
        public List<Models.Home.Media> Medias { get; set; }
        public List<Models.Home.Like> Likes { get; set; }
        public List<Models.Home.Comment> Comments { get; set; }
        public Models.Home.UserInfo UserInfo { get; set; }
        public Models.Home.Player Player { get; set; }
    }
}