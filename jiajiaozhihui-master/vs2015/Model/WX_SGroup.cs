using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_SGroup:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_SGroup
	{
		public WX_SGroup()
		{}
		#region Model
		private int _id;
		private string _group_name;
		private string _introduce;
		private string _img_url;
		private int? _is_act;
		private DateTime? _create_date;
        private string _accounts;
        private string _password;
        private string _remark;
        /// <summary>
        /// 
        /// </summary>
        public int id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string group_name
		{
			set{ _group_name=value;}
			get{return _group_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string introduce
		{
			set{ _introduce=value;}
			get{return _introduce;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string img_url
		{
			set{ _img_url=value;}
			get{return _img_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
        /// <summary>
		/// 
		/// </summary>
		public string Accounts
        {
            set { _accounts = value; }
            get { return _accounts; }
        }
        /// <summary>
		/// 
		/// </summary>
		public string PassWord
        {
            set { _password = value; }
            get { return _password; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Remark
        {
            set { _remark = value; }
            get { return _remark; }
        }
        #endregion Model

    }
}

