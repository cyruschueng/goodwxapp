using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.Audio
{
    public class AudioInfo
    {
        public int AudioId { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string SoundSource { get; set; }
        public string Cover { get; set; }
        public int? PlayNumber { get; set; }
        public string CategoryPath { get; set; }
        public int CategoryId { get; set; }
        public int? Duration { get; set; }
    }
}