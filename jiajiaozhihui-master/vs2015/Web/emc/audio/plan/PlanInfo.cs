using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.audio.plan
{
    public class PlanInfo
    {
        public int PlanId { get; set; }
        public int AudioId { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string SoundSource { get; set; }
        public int CategoryId { get; set; }
        public string CategoryPath { get; set; }
    }
}