using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.Admins.AdvertisingSpaces
{
    public class AdvContentInfo
    {
        public AdvContentInfo()
        {
            CreateOn = DateTime.Now;
            BeginDatetime = DateTime.Now;
            EndDateTime = DateTime.Now;
        }
        /// <summary>
        /// 序号
        /// </summary>
        public int Id { get; set; }

        public string AdvertisingSpaceInfoSign { get; set; }

        public virtual AdvertisingSpaceInfo AdvertisingSpaceInfo { get; set; }

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

    public enum AdvContentInfoType
    {
        [Description("文字")]
        Word = 0,
        [Description("图片")]
        Pic = 1
    }

    public enum TargetType
    {
        [Description("新窗口")]
        Blank = 0,
        [Description("原窗口")]
        Self = 1
    }
}
