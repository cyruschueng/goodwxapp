using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestionScore:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestionScore
	{
		public WX_TestQuestionScore()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _qestiontype;
		private string _grade;
		private int? _score;
        private int? _usertime;
        private int? _issuccess;
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
		public string QestionType
		{
			set{ _qestiontype=value;}
			get{return _qestiontype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Grade
		{
			set{ _grade=value;}
			get{return _grade;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Score
		{
			set{ _score=value;}
			get{return _score;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? UserTime
        {
            set { _usertime = value; }
            get { return _usertime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? IsSuccess
        {
            set { _issuccess = value; }
            get { return _issuccess; }
        }
		#endregion Model

	}
}

