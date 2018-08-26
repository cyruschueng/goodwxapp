using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_likes:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_likes
	{
		public wx_likes()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _modules;
		private int _relation_id;
		private string _liker;
		private string _liker_nickname;
		private string _liker_headimage;
		private DateTime? _create_date= DateTime.Now;
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
		public string liker
		{
			set{ _liker=value;}
			get{return _liker;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string liker_nickname
		{
			set{ _liker_nickname=value;}
			get{return _liker_nickname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string liker_headimage
		{
			set{ _liker_headimage=value;}
			get{return _liker_headimage;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		#endregion Model

	}
}

