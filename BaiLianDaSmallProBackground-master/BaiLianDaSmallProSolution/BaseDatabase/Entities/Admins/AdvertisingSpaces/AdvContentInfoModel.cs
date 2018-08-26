using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.Admins.AdvertisingSpaces
{
    public class AdvContentInfoModel
    {
        /// <summary>
        /// 序号
        /// </summary>
        public int Id { get; set; }

        public string AdvertisingSpaceInfoSign { get; set; }

        public string Title { get; set; }

        /// <summary>
        /// 显示顺序
        /// </summary>
        public int Order { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Intro { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        public AdvContentInfoType Type { get; set; }

        public TargetType TargetType { get; set; }

        public string ContentJsonKeyword { get; set; }

        public string ContentJson { get; set; }

        public decimal Price { get; set; }

        public DateTime BeginDatetime { get; set; }

        public DateTime EndDateTime { get; set; }

        public DateTime CreateOn { get; set; }
    }

    public class AdvContentPicModel
    {
        public string PicUrl { get; set; }

        public string PicImageAlt { get; set; }

        public string PicLink { get; set; }
    }

    public class AdvContentWordModel
    {
        public string WordTitle { get; set; }

        public string WordSize { get; set; }

        public string WordColor { get; set; }

        public string WordLink { get; set; }
    }
}
