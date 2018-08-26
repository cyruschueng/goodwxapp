using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Audio_Favorite:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Audio_Favorite
	{
		public WX_Audio_Favorite()
		{}
		#region Model
		private string _appid;
		private string _openid;
		private int _audioid;
		private DateTime? _createdate;
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
		public int AudioId
		{
			set{ _audioid=value;}
			get{return _audioid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		#endregion Model

	}
}

