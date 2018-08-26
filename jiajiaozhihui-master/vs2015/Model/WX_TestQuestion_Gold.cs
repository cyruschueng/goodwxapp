using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_TestQuestion_Gold:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_TestQuestion_Gold
	{
		public WX_TestQuestion_Gold()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _gold;
        private DateTime? _lastdate;
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
		public string OpenID
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		
		/// <summary>
		/// 
		/// </summary>
		public int? Gold
		{
			set{ _gold=value;}
			get{return _gold;}
		}
		/// <summary>
		/// 
		/// </summary>
        public DateTime? LastDate
		{
            set { _lastdate = value; }
            get { return _lastdate; }
		}
		#endregion Model

	}
}

