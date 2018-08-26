using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestionGrade:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestionGrade
	{
		public WX_TestQuestionGrade()
		{}
		#region Model
		private int _id;
		private string _grade;
		private int? _everytime;
		private int? _upperlimit;
		private int? _isacttime;
        private string _questiontype;
        private int? _amount;
        private int? _viewnumber;

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
		public string Grade
		{
			set{ _grade=value;}
			get{return _grade;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? EveryTime
		{
			set{ _everytime=value;}
			get{return _everytime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UpperLimit
		{
			set{ _upperlimit=value;}
			get{return _upperlimit;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsActTime
		{
			set{ _isacttime=value;}
			get{return _isacttime;}
		}
        public string QuestionType
        {
            set { _questiontype = value; }
            get { return _questiontype; }
        }
        public int? Amount
        {
            set { _amount = value; }
            get { return _amount; }
        }
        public int? ViewNumber
        {
            set { _viewnumber = value; }
            get { return _viewnumber; }
        }
		#endregion Model

	}
}

