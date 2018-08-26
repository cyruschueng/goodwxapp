using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_book_share:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_book_share
	{
		public wx_book_share()
		{}
		#region Model
		private int _id;
		private int _book_id;
		private string _openid;
		private string _nick_name;
		private string _header_img_url;
		private string _province;
		private string _city;
		private int? _subscibe;
		private DateTime? _create_date;
		private int? _is_act=1;
		/// <summary>
		/// 
		/// </summary>
		public int id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int book_id
		{
			set{ _book_id=value;}
			get{return _book_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string nick_name
		{
			set{ _nick_name=value;}
			get{return _nick_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string header_img_url
		{
			set{ _header_img_url=value;}
			get{return _header_img_url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string province
		{
			set{ _province=value;}
			get{return _province;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string city
		{
			set{ _city=value;}
			get{return _city;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? subscibe
		{
			set{ _subscibe=value;}
			get{return _subscibe;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		#endregion Model

	}
}

