using System;
namespace SfSoft.Model
{
	/// <summary>
	/// 实体类Pub_Help 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	public class Pub_Help
	{
		public Pub_Help()
		{}
		#region Model
		private int _id;
		private string _modulesid;
		private string _modulesname;
		private string _content;
		private string _noteinfo;
		private string _mpath;
		private string _caseinfo;
		private string _flowinfo;
		private string _appinfo;
		private string _others;
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
		public string ModulesID
		{
			set{ _modulesid=value;}
			get{return _modulesid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ModulesName
		{
			set{ _modulesname=value;}
			get{return _modulesname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Content
		{
			set{ _content=value;}
			get{return _content;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string NoteInfo
		{
			set{ _noteinfo=value;}
			get{return _noteinfo;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Mpath
		{
			set{ _mpath=value;}
			get{return _mpath;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CaseInfo
		{
			set{ _caseinfo=value;}
			get{return _caseinfo;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string FlowInfo
		{
			set{ _flowinfo=value;}
			get{return _flowinfo;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AppInfo
		{
			set{ _appinfo=value;}
			get{return _appinfo;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Others
		{
			set{ _others=value;}
			get{return _others;}
		}
		#endregion Model

	}
}

