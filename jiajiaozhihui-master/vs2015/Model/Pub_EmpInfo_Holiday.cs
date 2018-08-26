using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_EmpInfo_Holiday 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_EmpInfo_Holiday
    {
        public Pub_EmpInfo_Holiday()
        { }
        #region Model
        private int _id;
        private int? _uid;
        private string _itemno;
        private decimal? _days;
        private decimal? _hours;
        private int? _years;
        private string _itemname;
        /// <summary>
        /// 
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? UID
        {
            set { _uid = value; }
            get { return _uid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ItemNo
        {
            set { _itemno = value; }
            get { return _itemno; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? Days
        {
            set { _days = value; }
            get { return _days; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? Hours
        {
            set { _hours = value; }
            get { return _hours; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Years
        {
            set { _years = value; }
            get { return _years; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ItemName
        {
            set { _itemname = value; }
            get { return _itemname; }
        }
        #endregion Model

    }
}

