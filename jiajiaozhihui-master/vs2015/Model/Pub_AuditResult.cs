using System;
namespace SfSoft.Model
{
	/// <summary>
	/// 实体类Pub_AuditResult 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	public class Pub_AuditResult
	{
		public Pub_AuditResult()
		{}
		#region Model
		private int _arsid;
		private string _mid;
		private int? _arid;
		private DateTime? _auditdate;
		private string _auditsign;
		private int? _audituserid;
		private string _auditname;
		private string _auditorcmnt;
		private string _contral;
		private int? _auditclass;
		private string _audittypename;
		/// <summary>
		/// 
		/// </summary>
		public int ARSID
		{
			set{ _arsid=value;}
			get{return _arsid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MID
		{
			set{ _mid=value;}
			get{return _mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ARID
		{
			set{ _arid=value;}
			get{return _arid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? Auditdate
		{
			set{ _auditdate=value;}
			get{return _auditdate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AuditSign
		{
			set{ _auditsign=value;}
			get{return _auditsign;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? AuditUserID
		{
			set{ _audituserid=value;}
			get{return _audituserid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AuditName
		{
			set{ _auditname=value;}
			get{return _auditname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AuditorCmnt
		{
			set{ _auditorcmnt=value;}
			get{return _auditorcmnt;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Contral
		{
			set{ _contral=value;}
			get{return _contral;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? AuditClass
		{
			set{ _auditclass=value;}
			get{return _auditclass;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AuditTypeName
		{
			set{ _audittypename=value;}
			get{return _audittypename;}
		}
		#endregion Model

	}
}

