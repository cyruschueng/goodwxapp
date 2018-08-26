using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_SGroup_Content:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_SGroup_Content
	{
		public WX_SGroup_Content()
		{}
		#region Model
		private int _id;
		private int? _group_type;
		private string _img_url;
		private string _title;
		private string _introduce;
		private int? _is_act;
		private DateTime? _create_date;
        private DateTime? _valid_date;
        private int? _quantity;
        private int? _isdelete;
        private DateTime? _usingdate;
        private string _catalogue;
        private string _class_name;
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
		public int? group_type
		{
			set{ _group_type=value;}
			get{return _group_type;}
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
		public string title
		{
			set{ _title=value;}
			get{return _title;}
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
		public DateTime? valid_date
        {
            set { _valid_date = value; }
            get { return _valid_date; }
        }

        public int? Quantity
        {
            set { _quantity = value; }
            get { return _quantity; }
        }
        public int? IsDelete
        {
            set { _isdelete = value; }
            get { return _isdelete; }
        }
        public DateTime? UsingDate
        {
            set { _usingdate = value; }
            get { return _usingdate; }
        }
        /// <summary>
		/// 
		/// </summary>
		public string catalogue
        {
            set { _catalogue = value; }
            get { return _catalogue; }
        }
        /// <summary>
		/// 
		/// </summary>
		public string class_name
        {
            set { _class_name = value; }
            get { return _class_name; }
        }
        #endregion Model

    }
}

