using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_CoursOrder:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_CoursOrder
	{
		public WX_CoursOrder()
		{}
		#region Model
		private int _id;
		private int? _coursid;
		private string _openid;
		private string _name;
		private DateTime? _createdate;
        private string _telephone;
        private string _entrant;
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
		public int? CoursID
		{
			set{ _coursid=value;}
			get{return _coursid;}
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
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
        /// <summary>
        /// 
        /// </summary>
        public string Telephone
        {
            set { _telephone = value; }
            get { return _telephone; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Entrant
        {
            set { _entrant = value; }
            get { return _entrant; }
        }
		#endregion Model

	}
}

