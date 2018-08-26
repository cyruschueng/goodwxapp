using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Company 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Company
    {
        public Pub_Company()
        { }
        #region Model
        private string _companyname;
        private string _companyname_e;
        private string _logo;
        private string _email;
        private string _addr;
        private string _phone;
        private string _fax;
        private string _id;
        /// <summary>
        /// 
        /// </summary>
        public string CompanyName
        {
            set { _companyname = value; }
            get { return _companyname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string CompanyName_e
        {
            set { _companyname_e = value; }
            get { return _companyname_e; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Logo
        {
            set { _logo = value; }
            get { return _logo; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Email
        {
            set { _email = value; }
            get { return _email; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Addr
        {
            set { _addr = value; }
            get { return _addr; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Phone
        {
            set { _phone = value; }
            get { return _phone; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Fax
        {
            set { _fax = value; }
            get { return _fax; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ID
        {
            set { _id = value; }
            get { return _id; }
        }
        #endregion Model

    }
}

