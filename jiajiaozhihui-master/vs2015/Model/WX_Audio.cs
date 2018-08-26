using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Audio:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Audio
	{
		public WX_Audio()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int? _categoryid;
		private string _fullname;
		private string _shortname;
		private string _soundsource;
		private string _cover;
		private int? _playnumber;
		private int? _shenersn;
		private string _singer;
		private string _lyric;
		private int? _isact;
        private string _categorypath;
		private DateTime? _createdate;
        private int? _duration;
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
		public int? CategoryId
		{
			set{ _categoryid=value;}
			get{return _categoryid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string FullName
		{
			set{ _fullname=value;}
			get{return _fullname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ShortName
		{
			set{ _shortname=value;}
			get{return _shortname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string SoundSource
		{
			set{ _soundsource=value;}
			get{return _soundsource;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Cover
		{
			set{ _cover=value;}
			get{return _cover;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? PlayNumber
		{
			set{ _playnumber=value;}
			get{return _playnumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ShenerSn
		{
			set{ _shenersn=value;}
			get{return _shenersn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Singer
		{
			set{ _singer=value;}
			get{return _singer;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Lyric
		{
			set{ _lyric=value;}
			get{return _lyric;}
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
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
        public string CategoryPath
        {
            set { _categorypath = value; }
            get { return _categorypath; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? Duration
        {
            set { _duration = value; }
            get { return _duration; }
        }
		#endregion Model

	}
}

