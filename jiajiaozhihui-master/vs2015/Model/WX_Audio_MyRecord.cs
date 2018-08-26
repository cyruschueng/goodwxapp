using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Audio_MyRecord:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Audio_MyRecord
	{
		public WX_Audio_MyRecord()
		{}
		#region Model
		private string _appid;
		private string _openid;
		private int _audioid;
		private int? _iscurr;
		private DateTime? _learndate;
        private int? _planid;
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
		public int? IsCurr
		{
			set{ _iscurr=value;}
			get{return _iscurr;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? LearnDate
		{
			set{ _learndate=value;}
			get{return _learndate;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? PlanId
        {
            set { _planid = value; }
            get { return _planid; }
        }
		#endregion Model
	}
}

