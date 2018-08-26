using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Support:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Support
	{
		public WX_Support()
		{}
		#region Model
		private int _id;
		private int? _topicid;
		private string _openid;
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
		public int? TopicID
		{
			set{ _topicid=value;}
			get{return _topicid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		#endregion Model

	}
}

