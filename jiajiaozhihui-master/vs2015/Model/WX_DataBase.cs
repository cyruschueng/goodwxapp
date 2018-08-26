using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_DataBase:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_DataBase
	{
		public WX_DataBase()
		{}
		#region Model
		private int _id;
		private string _code;
		private string _value;
		private int? _isact;
        private string _appid;
		/// <summary>
		/// 
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Code
		{
			set{ _code=value;}
			get{return _code;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Value
		{
			set{ _value=value;}
			get{return _value;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
        public string AppId
        {
            set { _appid = value; }
            get { return _appid; }
        }
		#endregion Model

	}
}

