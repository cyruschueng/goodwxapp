using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Parents_Plan:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Parents_Plan
	{
		public WX_Parents_Plan()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _planname;
		private int? _score;
		private string _contents;
		private string _intro;
		private string  _testlibraryid;
		private string _medalname;
		private DateTime? _createdate;
		private int? _isact;
		private int? _sn;
        private int? _quantity;
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
		public string AppId
		{
			set{ _appid=value;}
			get{return _appid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string PlanName
		{
			set{ _planname=value;}
			get{return _planname;}
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
		public string Contents
		{
			set{ _contents=value;}
			get{return _contents;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Intro
		{
			set{ _intro=value;}
			get{return _intro;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string  TestLibraryId
		{
			set{ _testlibraryid=value;}
			get{return _testlibraryid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MedalName
		{
			set{ _medalname=value;}
			get{return _medalname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Sn
		{
			set{ _sn=value;}
			get{return _sn;}
		}
        public int? Quantity
        {
            set { _quantity = value; }
            get { return _quantity; }
        }
		#endregion Model

	}
}

