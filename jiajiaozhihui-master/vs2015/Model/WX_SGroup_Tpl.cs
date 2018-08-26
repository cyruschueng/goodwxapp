using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_SGroup_Tpl:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_SGroup_Tpl
	{
		public WX_SGroup_Tpl()
		{}
		#region Model
		private int _id;
		private string _title;
		private string _src;
		private string _tag;
		private decimal? _tagx=0M;
		private decimal? _tagy=0M;
		private decimal? _qrcodex=0M;
		private decimal? _qrcodey=0M;
		private string _remark;
		private int? _is_act;
		private int? _sn=9999;
		private decimal? _qrcodew=0M;
		private decimal? _qrcodeh=0M;
		private int? _catalogue=1;
		/// <summary>
		/// 
		/// </summary>
		public int id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string src
		{
			set{ _src=value;}
			get{return _src;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string tag
		{
			set{ _tag=value;}
			get{return _tag;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? tagx
		{
			set{ _tagx=value;}
			get{return _tagx;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? tagy
		{
			set{ _tagy=value;}
			get{return _tagy;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? qrcodex
		{
			set{ _qrcodex=value;}
			get{return _qrcodex;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? qrcodey
		{
			set{ _qrcodey=value;}
			get{return _qrcodey;}
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
		public int? is_act
		{
			set{ _is_act=value;}
			get{return _is_act;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? sn
		{
			set{ _sn=value;}
			get{return _sn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? qrcodew
		{
			set{ _qrcodew=value;}
			get{return _qrcodew;}
		}
		/// <summary>
		/// 
		/// </summary>
		public decimal? qrcodeh
		{
			set{ _qrcodeh=value;}
			get{return _qrcodeh;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? catalogue
		{
			set{ _catalogue=value;}
			get{return _catalogue;}
		}
		#endregion Model

	}
}

