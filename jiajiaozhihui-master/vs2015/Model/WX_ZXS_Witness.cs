﻿using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_ZXS_Witness:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_ZXS_Witness
	{
		public WX_ZXS_Witness()
		{}
		#region Model
		private int _id;
		private string _appid;
		private string _openid;
		private int? _themeid;
		private string _witness;
		private string _nickname;
		private string _headimgurl;
		private DateTime? _createdate;
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
		public int? ThemeId
		{
			set{ _themeid=value;}
			get{return _themeid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Witness
		{
			set{ _witness=value;}
			get{return _witness;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string NickName
		{
			set{ _nickname=value;}
			get{return _nickname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string HeadImgUrl
		{
			set{ _headimgurl=value;}
			get{return _headimgurl;}
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
