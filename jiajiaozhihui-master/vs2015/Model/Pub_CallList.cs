using System;
namespace SfSoft.Model
{
    /// <summary>
    /// Pub_CallList:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class Pub_CallList
    {
        public Pub_CallList()
        { }
        #region Model
        private int _id;
        private string _appid;
        private string _modulesid;
        private string _docid;
        private int? _calltype;
        private DateTime? _calltypetime;
        private decimal? _price;
        private int? _num;
        private int? _flag;
        private int? _userid;
        private string _cnname;
        private string _usercontact;
        private string _contactids;
        private string _contactnames;
        private int? _status;
        private string _msg;
        private string _flowid;
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
        public string AppID
        {
            set { _appid = value; }
            get { return _appid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ModulesID
        {
            set { _modulesid = value; }
            get { return _modulesid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocID
        {
            set { _docid = value; }
            get { return _docid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? CallType
        {
            set { _calltype = value; }
            get { return _calltype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CallTypeTime
        {
            set { _calltypetime = value; }
            get { return _calltypetime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? Price
        {
            set { _price = value; }
            get { return _price; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? num
        {
            set { _num = value; }
            get { return _num; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Flag
        {
            set { _flag = value; }
            get { return _flag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? UserID
        {
            set { _userid = value; }
            get { return _userid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string CnName
        {
            set { _cnname = value; }
            get { return _cnname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserContact
        {
            set { _usercontact = value; }
            get { return _usercontact; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ContactIDs
        {
            set { _contactids = value; }
            get { return _contactids; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ContactNames
        {
            set { _contactnames = value; }
            get { return _contactnames; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Status
        {
            set { _status = value; }
            get { return _status; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Msg
        {
            set { _msg = value; }
            get { return _msg; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FlowID
        {
            set { _flowid = value; }
            get { return _flowid; }
        }
        #endregion Model

    }
}

