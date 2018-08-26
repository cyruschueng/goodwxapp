using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin
{
    public class Message
    {
        public string KeyWord { get; set; }
        public string MsgType { get; set; }
        public string Content { get; set; }
        public string MediaId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MusicURL { get; set; }
        public string HQMusicUrl { get; set; }
        public string ThumbMediaId { get; set; }
        public string PicUrl { get; set; }
        public string Url { get; set; }
        public string Class { get; set; }
        public string AuthUrl { get; set; }
        public string Tags { get; set; }
        public int? IsReadWeixinService { get;set;}
        public int? Order { get; set; }
    }
}
