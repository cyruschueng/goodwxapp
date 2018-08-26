using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Gold_Grade:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Gold_Grade
	{
		public WX_TestQuestion_Gold_Grade()
		{}
		#region Model
		private int _id;
		private int? _grade;
		private int? _score_upper_limit;
		private int? _score_lower_limit;
        private int? _gold;
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
		public int? Grade
		{
			set{ _grade=value;}
			get{return _grade;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Score_Upper_Limit
		{
			set{ _score_upper_limit=value;}
			get{return _score_upper_limit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Score_Lower_Limit
		{
			set{ _score_lower_limit=value;}
			get{return _score_lower_limit;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? Gold
        {
            set { _gold = value; }
            get { return _gold; }
        }
		#endregion Model

	}
}

