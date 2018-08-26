using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Yuedu_File_Data:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Yuedu_File_Data
	{
		public WX_Yuedu_File_Data()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int? _readfileid;
		private string _temporaryurl;
		private string _cloudurl;
		private int? _urltype;
		private string _mediaid;
		private string _fileid;
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
		public int? ReadFileId
		{
			set{ _readfileid=value;}
			get{return _readfileid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TemporaryUrl
		{
			set{ _temporaryurl=value;}
			get{return _temporaryurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CloudUrl
		{
			set{ _cloudurl=value;}
			get{return _cloudurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? UrlType
		{
			set{ _urltype=value;}
			get{return _urltype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string MediaId
		{
			set{ _mediaid=value;}
			get{return _mediaid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string FileId
		{
			set{ _fileid=value;}
			get{return _fileid;}
		}
		#endregion Model

	}
}

