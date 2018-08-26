using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_Children:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_Children
	{
		public WX_Doublenovember_Children()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _sex;
		private int? _year;
		private int? _month;
		private int? _day;
        private DateTime? _firstworksdatetime;
        private string _alias;
        private int? _isalias;
		/// <summary>
		/// 
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string OpenID
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Sex
		{
			set{ _sex=value;}
			get{return _sex;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Year
		{
			set{ _year=value;}
			get{return _year;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Month
		{
			set{ _month=value;}
			get{return _month;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Day
		{
			set{ _day=value;}
			get{return _day;}
		}

        public DateTime? FirstWorksDateTime
        {
            set { _firstworksdatetime = value; }
            get { return _firstworksdatetime; }
        }
        /// <summary>
        /// 别名
        /// </summary>
        public string Alias
        {
            set { _alias = value; }
            get { return _alias; }
        }
        /// <summary>
        /// 是否启用别名
        /// </summary>
        public int? IsAlias
        {
            set { _isalias = value; }
            get { return _isalias; }
        }
		#endregion Model

	}
}

