using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Course_Card_Detail:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Course_Card_Detail
	{
		public WX_Course_Card_Detail()
		{}
		#region Model
		private int _id;
		private int? _cardid;
		private string _cardno;
		private string _url;
        private int? _isusing;
        private string _openid;
        private DateTime? _registdate;
        private string _qrpath;
        private int? _downnumber;
        private DateTime? _createdate;
        private int? _scale;
        private string _checkcode;
        private string _ipaddress;

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
		public int? CardId
		{
			set{ _cardid=value;}
			get{return _cardid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string CardNo
		{
			set{ _cardno=value;}
			get{return _cardno;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Url
		{
			set{ _url=value;}
			get{return _url;}
		}
        public int? IsUsing
        {
            set { _isusing = value; }
            get { return _isusing; }
        }
        public string OpenId
        {
            set { _openid = value; }
            get { return _openid; }
        }
        public DateTime? RegistDate
        {
            set { _registdate = value; }
            get { return _registdate; }
        }
        public string QRPath
        {
            set { _qrpath = value; }
            get { return _qrpath; }
        }

        public int? DownNumber
        {
            set { _downnumber = value; }
            get { return _downnumber; }
        }

        public DateTime? CreateDate
        {
            set { _createdate = value; }
            get { return _createdate; }
        }

        public int? Scale
        {
            set { _scale = value; }
            get { return _scale; }
        }

        public string CheckCode
        {
            set { _checkcode = value; }
            get { return _checkcode; }
        }
        public string IpAddress
        {
            set { _ipaddress = value; }
            get { return _ipaddress; }
        }
		#endregion Model

	}
}

