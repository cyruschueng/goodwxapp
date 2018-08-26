using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Section:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Section
	{
		public WX_Course_Section()
		{}
		#region Model
		private int _id;
		private string _classifyid;
		private string _sectionid;
		private string _sectionname;
		private int? _sn;
        private int? _pid;
        private int? _sectiontype;
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
		public string ClassifyId
		{
			set{ _classifyid=value;}
			get{return _classifyid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string SectionId
		{
			set{ _sectionid=value;}
			get{return _sectionid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string SectionName
		{
			set{ _sectionname=value;}
			get{return _sectionname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Sn
		{
			set{ _sn=value;}
			get{return _sn;}
		}
        public int? PId
        {
            set { _pid = value; }
            get { return _pid; }
        }
        public int? SectionType
        {
            set { _sectiontype = value; }
            get { return _sectiontype; }
        }
		#endregion Model
	}
}

