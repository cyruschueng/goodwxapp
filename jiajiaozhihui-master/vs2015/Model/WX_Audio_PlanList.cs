using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Audio_PlanList:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Audio_PlanList
	{
		public WX_Audio_PlanList()
		{}
		#region Model
		private int _planid;
		private int _audioid;
		private int? _plannumber;
		/// <summary>
		/// 
		/// </summary>
		public int PlanId
		{
			set{ _planid=value;}
			get{return _planid;}
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
		public int? PlanNumber
		{
			set{ _plannumber=value;}
			get{return _plannumber;}
		}
		#endregion Model

	}
}

