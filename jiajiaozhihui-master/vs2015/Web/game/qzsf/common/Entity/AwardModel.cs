using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.qzsf
{
    /// <summary>
    /// 奖赏
    /// </summary>
    public  struct  AwardModel
    {
        /// <summary>
        /// 每天每次获取多少奖赏
        /// </summary>
        public  int Min { get; set; }
        /// <summary>
        /// 每天最多可以获得奖赏
        /// </summary>
        public  int Max { get; set; }
    }
}