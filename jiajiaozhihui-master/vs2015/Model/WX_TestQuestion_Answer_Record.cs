using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Answer_Record:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Answer_Record
	{
		public WX_TestQuestion_Answer_Record()
		{}
		#region Model
		private int _id;
		private int? _questionactiveid;
		private string _openid;
		private int? _testquestionid;
        private int _rightorerror;
        private string _selectanswer;
        private int? _score;
        private float? _usingtime;
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
		public int? QuestionActiveID
		{
			set{ _questionactiveid=value;}
			get{return _questionactiveid;}
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
		public int? TestQuestionID
		{
			set{ _testquestionid=value;}
			get{return _testquestionid;}
		}

        /// <summary>
        /// 
        /// </summary>
        public int RightOrError
        {
            set { _rightorerror = value; }
            get { return _rightorerror; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string  SelectAnswer
        {
            set { _selectanswer = value; }
            get { return _selectanswer; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Score
        {
            set { _score = value; }
            get { return _score; }
        }

        /// <summary>
        /// 
        /// </summary>
        public float? UsingTime
        {
            set { _usingtime = value; }
            get { return _usingtime; }
        }

		#endregion Model

	}
}

