using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_comments:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_comments
	{
		public wx_comments()
		{}
		#region Model
		private int _id;
		private int? _pid=0;
		private string _appid;
		private string _modules;
		private int _relation_id;
		private string _message;
		private string _sender;
		private string _sender_nickname;
		private string _sender_headimage;
		private string _replier;
		private string _replier_nickname;
		private string _replier_headimage;
		private string _imgs;
		private DateTime? _create_date= DateTime.Now;
		private int? _like_quantity=0;
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
		public int? pid
		{
			set{ _pid=value;}
			get{return _pid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string appid
		{
			set{ _appid=value;}
			get{return _appid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string modules
		{
			set{ _modules=value;}
			get{return _modules;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int relation_id
		{
			set{ _relation_id=value;}
			get{return _relation_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string message
		{
			set{ _message=value;}
			get{return _message;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sender
		{
			set{ _sender=value;}
			get{return _sender;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sender_nickname
		{
			set{ _sender_nickname=value;}
			get{return _sender_nickname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string sender_headimage
		{
			set{ _sender_headimage=value;}
			get{return _sender_headimage;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string replier
		{
			set{ _replier=value;}
			get{return _replier;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string replier_nickname
		{
			set{ _replier_nickname=value;}
			get{return _replier_nickname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string replier_headimage
		{
			set{ _replier_headimage=value;}
			get{return _replier_headimage;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string imgs
		{
			set{ _imgs=value;}
			get{return _imgs;}
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
		public int? like_quantity
		{
			set{ _like_quantity=value;}
			get{return _like_quantity;}
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

