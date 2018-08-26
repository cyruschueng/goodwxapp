using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_Apply_Detail:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_Apply_Detail
	{
		public WX_ZXS_Apply_Detail()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _openid;
		private int? _completednumber;
		private int? _failnumber;
		private int? _successnumber;
		private int? _checkingnumber;
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? CompletedNumber
		{
			set{ _completednumber=value;}
			get{return _completednumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? FailNumber
		{
			set{ _failnumber=value;}
			get{return _failnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SuccessNumber
		{
			set{ _successnumber=value;}
			get{return _successnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? CheckingNumber
		{
			set{ _checkingnumber=value;}
			get{return _checkingnumber;}
		}
		#endregion Model

	}
}

