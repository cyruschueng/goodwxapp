using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_source_list:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_source_list
	{
		public wx_source_list()
		{}
		#region Model
		private int _id;
		private int _source_id;
		private string _file_title;
		private string _file_intro;
		private string _file_size;
		private DateTime? _create_date= DateTime.Now;
		private DateTime? _modify_date= DateTime.Now;
		private string _file_link;
		private string _img_src;
		private int? _sn=999999;
		private string _file_type;
		private string _remark;
		private int? _is_act=1;
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
		public int source_id
		{
			set{ _source_id=value;}
			get{return _source_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string file_title
		{
			set{ _file_title=value;}
			get{return _file_title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string file_intro
		{
			set{ _file_intro=value;}
			get{return _file_intro;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string file_size
		{
			set{ _file_size=value;}
			get{return _file_size;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? modify_date
		{
			set{ _modify_date=value;}
			get{return _modify_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string file_link
		{
			set{ _file_link=value;}
			get{return _file_link;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string img_src
		{
			set{ _img_src=value;}
			get{return _img_src;}
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
		public string file_type
		{
			set{ _file_type=value;}
			get{return _file_type;}
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
		#endregion Model

	}
}

