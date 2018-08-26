using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Provider:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Provider
	{
		public WX_Course_Provider()
		{}
		#region Model
		private int _id;
		private string _name;
		private string _type;
		private string _linkman;
		private string _mobile;
		private string _weixin;
		private string _qq;
		private int? _isact;
		private DateTime? _colldate;
		private string _accountnumber;
		private string _beneficiaryname;
		private string _receivingbank;
		private string _lasteditman;
		private DateTime? _lasteditdate;
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
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Type
		{
			set{ _type=value;}
			get{return _type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string LinkMan
		{
			set{ _linkman=value;}
			get{return _linkman;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Mobile
		{
			set{ _mobile=value;}
			get{return _mobile;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Weixin
		{
			set{ _weixin=value;}
			get{return _weixin;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string QQ
		{
			set{ _qq=value;}
			get{return _qq;}
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
		public DateTime? CollDate
		{
			set{ _colldate=value;}
			get{return _colldate;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string AccountNumber
		{
			set{ _accountnumber=value;}
			get{return _accountnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string BeneficiaryName
		{
			set{ _beneficiaryname=value;}
			get{return _beneficiaryname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ReceivingBank
		{
			set{ _receivingbank=value;}
			get{return _receivingbank;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string LastEditMan
		{
			set{ _lasteditman=value;}
			get{return _lasteditman;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? LastEditDate
		{
			set{ _lasteditdate=value;}
			get{return _lasteditdate;}
		}
		#endregion Model

	}
}

