using System;
namespace SfSoft.Model
{
	/// <summary>
	/// Emc_Msg_Interface:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class Emc_Msg_Interface
	{
		public Emc_Msg_Interface()
		{}
		#region Model
        private int _id;
        private int _islist;
        private string _sendurl;
        private string _parmlname;
		private string _parmpwd;
		private string _parmtel;
		private string _parmcontent;
		private string _parmcid;
		private string _backstatus;
		private string _resulmark;
		private string _lname;
		private string _cid;
		private string _pwd;
		private string _remark;
		private string _balanceurl;
		private string _bremark;
		private string _editurl;
		private string _eremark;
		private int? _isdefault;
		private int? _msglength;
		private int? _maxcount;
		/// <summary>
		/// 
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
        public int IsList
        {
            set { _islist = value; }
            get { return _islist; }
        }
		/// <summary>
		/// 
		/// </summary>
        public string sendurl
		{
			set{ _sendurl=value;}
			get{return _sendurl;}
		}
		/// <summary>
		/// 
		/// </summary>
        public string parmlname
		{
			set{ _parmlname=value;}
			get{return _parmlname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string parmpwd
		{
			set{ _parmpwd=value;}
			get{return _parmpwd;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string parmtel
		{
			set{ _parmtel=value;}
			get{return _parmtel;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string parmcontent
		{
			set{ _parmcontent=value;}
			get{return _parmcontent;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string parmcId
		{
			set{ _parmcid=value;}
			get{return _parmcid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string backstatus
		{
			set{ _backstatus=value;}
			get{return _backstatus;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string resulmark
		{
			set{ _resulmark=value;}
			get{return _resulmark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string lname
		{
			set{ _lname=value;}
			get{return _lname;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string cId
		{
			set{ _cid=value;}
			get{return _cid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string pwd
		{
			set{ _pwd=value;}
			get{return _pwd;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string balanceurl
		{
			set{ _balanceurl=value;}
			get{return _balanceurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string bremark
		{
			set{ _bremark=value;}
			get{return _bremark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string editurl
		{
			set{ _editurl=value;}
			get{return _editurl;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string eremark
		{
			set{ _eremark=value;}
			get{return _eremark;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? isdefault
		{
			set{ _isdefault=value;}
			get{return _isdefault;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? msglength
		{
			set{ _msglength=value;}
			get{return _msglength;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? maxcount
		{
			set{ _maxcount=value;}
			get{return _maxcount;}
		}
		#endregion Model

	}
}

