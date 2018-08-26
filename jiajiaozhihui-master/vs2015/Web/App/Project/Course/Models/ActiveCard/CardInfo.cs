using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.ActiveCard
{
    public class CardInfo
    {
        public int CardId { get; set; }
        public string Remark { get; set; }
        public string Details { get; set; }
        public string ImgUrl { get; set; }
        /// <summary>
        /// 有没有过期
        /// </summary>
        public bool IsValide { get; set; }
        public string Title { get; set; }
        /// <summary>
        /// 卡的创建日期
        /// </summary>
        public DateTime? CreateDate { get; set; }
        /// <summary>
        /// 有没有注销
        /// </summary>
        public bool IsAct{get;set;}
        /// <summary>
        /// 有没有激活过
        /// </summary>
        public bool IsActive { get; set; }
        /// <summary>
        /// 这张卡的激活人
        /// </summary>
        public string OpenId { get; set; }
        /// <summary>
        /// 激活日期
        /// </summary>
        public DateTime? RegistDate { get; set; }
        /// <summary>
        /// 二维码存储路径
        /// </summary>
        public string Qpath { get; set; }
        /// <summary>
        /// 学习卡编号
        /// </summary>
        public string CardNo{get;set;}
        /// <summary>
        /// 
        /// </summary>
        public List<Models.ActiveCard.AllegeInfo> AllegeList { get; set; }
        /// <summary>
        /// 注册15天后不能再申诉
        /// </summary>
        public bool IsPast { get; set; }
    }
}