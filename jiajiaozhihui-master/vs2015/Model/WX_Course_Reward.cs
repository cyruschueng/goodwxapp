using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Reward:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Reward
	{
		public WX_Course_Reward()
		{}
		#region Model
		private int _id;
		private string  _class;
		private int? _startnumber;
		private int? _endnumber;
		private decimal? _rate;
		private int? _type;
        private int? _sort;
        private int? _Isact;
		/// <summary>
		/// 
		/// </summary>
		public int Id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
        public string Class
		{
			set{ _class=value;}
            get { return _class; }
		}
		/// <summary>
		/// 
		/// </summary>
		public int? StartNumber
		{
			set{ _startnumber=value;}
			get{return _startnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? EndNumber
		{
			set{ _endnumber=value;}
			get{return _endnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? Rate
		{
			set{ _rate=value;}
			get{return _rate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Type
		{
			set{ _type=value;}
			get{return _type;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? Sort
        {
            set { _sort = value; }
            get { return _sort; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? IsAct
        {
            set { _Isact = value; }
            get { return _Isact; }
        }
		#endregion Model

	}
}

