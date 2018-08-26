using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_source:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_source
	{
		public wx_source()
		{}
		#region Model
		private int _id;
		private string _title;
		private string _intro;
		private string _detail;
		private DateTime? _create_date= DateTime.Now;
		private DateTime? _modify_date= DateTime.Now;
		private string _expert_id;
		private string _img_src;
		private string _small_img_src;
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
		public string title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string intro
		{
			set{ _intro=value;}
			get{return _intro;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string detail
		{
			set{ _detail=value;}
			get{return _detail;}
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
		public string expert_id
		{
			set{ _expert_id=value;}
			get{return _expert_id;}
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
		public string small_img_src
		{
			set{ _small_img_src=value;}
			get{return _small_img_src;}
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

