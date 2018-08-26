using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_File_unscramble:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_File_unscramble
	{
		public WX_Doublenovember_File_unscramble()
		{}
		#region Model
		private int _id;
		private string _bookname;
		private int? _pageindex;
		private string _mainwords;
		private string _original;
		private string _translation;
		private DateTime? _createdate;
        private int? _isact;
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
		public string BookName
		{
			set{ _bookname=value;}
			get{return _bookname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? PageIndex
		{
			set{ _pageindex=value;}
			get{return _pageindex;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MainWords
		{
			set{ _mainwords=value;}
			get{return _mainwords;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Original
		{
			set{ _original=value;}
			get{return _original;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Translation
		{
			set{ _translation=value;}
			get{return _translation;}
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
            set { _isact = value; }
            get { return _isact; }
        }
		#endregion Model

	}
}

