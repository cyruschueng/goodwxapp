using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Entities.Admins.AdvertisingSpaces
{
    public class AdvertisingSpaceInfo
    {
        /// <summary>
        /// 序号
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// 标识
        /// </summary>
        [Key]
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

        /// <summary>
        /// 广告内容
        /// </summary>
        public virtual ICollection<AdvContentInfo> AdvContentInfos { get; set; }

    }

    public enum AdvertisingSpaceType
    {
        [Description("固定")]
        Fit = 0,
        [Description("漂浮")]
        Float = 1,
        [Description("弹窗")]
        PopUp = 2
    }
}
