using System;
namespace SfSoft.Model
{
	/// <summary>
	/// wx_gardenia_user:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class wx_gardenia_user
	{
		public wx_gardenia_user()
		{}
		#region Model
		private int _id;
		private string _openid;
		private string _nick_name;
		private string _real_name;
		private string _telephone;
		private string _order_sn;
		private int? _class_id;
		private int? _user_role=0;
		private int? _is_act=1;
		private DateTime? _create_date= DateTime.Now;
		private int? _parent_age=0;
		private string _profession;
		private string _city;
		private string _child_sex;
		private int? _child_age=0;
		private string _child_grade;
		private string _class_no;
		private string _class_name;
		private string _class_type;
		private int? _learn_quantity;
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
		public string openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string nick_name
		{
			set{ _nick_name=value;}
			get{return _nick_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string real_name
		{
			set{ _real_name=value;}
			get{return _real_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string telephone
		{
			set{ _telephone=value;}
			get{return _telephone;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string order_sn
		{
			set{ _order_sn=value;}
			get{return _order_sn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? class_id
		{
			set{ _class_id=value;}
			get{return _class_id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? user_role
		{
			set{ _user_role=value;}
			get{return _user_role;}
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
		public DateTime? create_date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? parent_age
		{
			set{ _parent_age=value;}
			get{return _parent_age;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string profession
		{
			set{ _profession=value;}
			get{return _profession;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string city
		{
			set{ _city=value;}
			get{return _city;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string child_sex
		{
			set{ _child_sex=value;}
			get{return _child_sex;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? child_age
		{
			set{ _child_age=value;}
			get{return _child_age;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string child_grade
		{
			set{ _child_grade=value;}
			get{return _child_grade;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string class_no
		{
			set{ _class_no=value;}
			get{return _class_no;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string class_name
		{
			set{ _class_name=value;}
			get{return _class_name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string class_type
		{
			set{ _class_type=value;}
			get{return _class_type;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? learn_quantity
		{
			set{ _learn_quantity=value;}
			get{return _learn_quantity;}
		}
		#endregion Model

	}
}

