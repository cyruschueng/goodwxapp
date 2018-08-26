using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Msn 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Msn
    {
        public Pub_Msn()
        { }
        #region Model
        private int _id;
        private string _msn;
        private DateTime _sendtime;
        private int? _uid;
        private string _name;
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
        public string Msn
        {
            set { _msn = value; }
            get { return _msn; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime SendTime
        {
            set { _sendtime = value; }
            get { return _sendtime; }
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
        public string Name
        {
            set { _name = value; }
            get { return _name; }
        }
        #endregion Model

    }
}

