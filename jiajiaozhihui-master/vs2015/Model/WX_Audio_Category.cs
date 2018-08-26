using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Audio_Category:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Audio_Category
	{
		public WX_Audio_Category()
		{}
		#region Model
		private int _id;
		private string _appid;
		private int? _pid;
		private string _fullname;
		private string _shortname;
		private int? _isact;
        private string _miniimgurl;
        private string _maximgurl;
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
		public int? Pid
		{
			set{ _pid=value;}
			get{return _pid;}
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
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string MiniImgUrl
        {
            set { _miniimgurl = value; }
            get { return _miniimgurl; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string MaxImgUrl
        {
            set { _maximgurl = value; }
            get { return _maximgurl; }
        }
		#endregion Model

	}
}

