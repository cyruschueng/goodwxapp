using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_QA_Expert:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_QA_Expert
	{
		public WX_QA_Expert()
		{}
		#region Model
		private int _expertid;
		private int? _sn=0;
		private int? _likenumber=0;
		private int? _initlikenumber=0;
		private int? _isdefault=0;
		private int? _issystem=0;
		/// <summary>
		/// 
		/// </summary>
		public int ExpertId
		{
			set{ _expertid=value;}
			get{return _expertid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Sn
		{
			set{ _sn=value;}
			get{return _sn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? LikeNumber
		{
			set{ _likenumber=value;}
			get{return _likenumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? InitLikeNumber
		{
			set{ _initlikenumber=value;}
			get{return _initlikenumber;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsDefault
		{
			set{ _isdefault=value;}
			get{return _isdefault;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsSystem
		{
			set{ _issystem=value;}
			get{return _issystem;}
		}
		#endregion Model

	}
}

