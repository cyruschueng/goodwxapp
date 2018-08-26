using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Msn_Addressee 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Msn_Addressee
    {
        public Pub_Msn_Addressee()
        { }
        #region Model
        private int _id;
        private int _msnid;
        private int? _addresseeid;
        private string _addressee;
        private int? _isread;
        private DateTime? _readtime;
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
        public int MsnID
        {
            set { _msnid = value; }
            get { return _msnid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? AddresseeID
        {
            set { _addresseeid = value; }
            get { return _addresseeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Addressee
        {
            set { _addressee = value; }
            get { return _addressee; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? isRead
        {
            set { _isread = value; }
            get { return _isread; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? ReadTime
        {
            set { _readtime = value; }
            get { return _readtime; }
        }
        #endregion Model

    }
}

