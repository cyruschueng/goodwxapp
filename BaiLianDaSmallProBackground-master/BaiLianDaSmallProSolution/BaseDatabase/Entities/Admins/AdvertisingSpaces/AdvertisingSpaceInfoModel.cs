using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.Admins.AdvertisingSpaces
{
    public class AdvertisingSpaceInfoModel
    {
        /// <summary>
        /// 序号
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 标识
        /// </summary>
        public string Sign { get; set; }

        /// <summary>
        /// 广告位标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 广告位类型
        /// </summary>
        public AdvertisingSpaceType TypeId { get; set; }

        /// <summary>
        /// 宽度
        /// </summary>
        public int Width { get; set; }

        /// <summary>
        /// 高度
        /// </summary>
        public int Height { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Intro { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateOn { get; set; }
    }
}
