using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion
	{
		public WX_TestQuestion()
		{}
		#region Model
		private int _id;
		private string _testquestion;
		private string _rightanswer;
		private string _answer1;
		private string _answer2;
		private string _answer3;
		private string _answer4;
		private string _questiontype;
		private string _grade;
		private DateTime? _createdate;
        private int? _isact;

        private string _track_v1;
        private string _track_v2;
        private string _track_v3;
        private int _pid;
        private string _spid;
        private string _classid;
        private string _accessoryUrl;


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
		public string TestQuestion
		{
			set{ _testquestion=value;}
			get{return _testquestion;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string RightAnswer
		{
			set{ _rightanswer=value;}
			get{return _rightanswer;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Answer1
		{
			set{ _answer1=value;}
			get{return _answer1;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Answer2
		{
			set{ _answer2=value;}
			get{return _answer2;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Answer3
		{
			set{ _answer3=value;}
			get{return _answer3;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Answer4
		{
			set{ _answer4=value;}
			get{return _answer4;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string QuestionType
		{
			set{ _questiontype=value;}
			get{return _questiontype;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}

        public int? IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }

        public string Track_V1
        {
            set { _track_v1 = value; }
            get { return _track_v1; }
        }
        public string Track_V2
        {
            set { _track_v2 = value; }
            get { return _track_v2; }
        }
        public string Track_V3
        {
            set { _track_v3 = value; }
            get { return _track_v3; }
        }
        public int PID
        {
            set { _pid = value; }
            get { return _pid; }
        }
        public string SPID
        {
            set { _spid = value; }
            get { return _spid; }
        }
        public string ClassID
        {
            set {  _classid= value; }
            get { return _classid; }
        }
        public string AccessoryUrl
        {
            set { _accessoryUrl = value; }
            get { return _accessoryUrl; }
        }


		#endregion Model

	}
}

