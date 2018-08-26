using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_Award:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_Award
	{
		public WX_Doublenovember_Award()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _integralearn;
		private int? _integralwasting;
		private int? _goldearn;
		private int? _goldwasting;
        private int? _isinit;
        private int? _diamondearn; //钻石
        private int? _diamondwasting; //钻石消耗
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
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IntegralEarn
		{
			set{ _integralearn=value;}
			get{return _integralearn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IntegralWasting
		{
			set{ _integralwasting=value;}
			get{return _integralwasting;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? GoldEarn
		{
			set{ _goldearn=value;}
			get{return _goldearn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? GoldWasting
		{
			set{ _goldwasting=value;}
			get{return _goldwasting;}
		}
        /// <summary>
        /// 
        /// </summary>
        public int? IsInit
        {
            set { _isinit = value; }
            get { return _isinit; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DiamondEarn
        {
            set { _diamondearn = value; }
            get { return _diamondearn; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DiamondWasting
        {
            set { _diamondwasting = value; }
            get { return _diamondwasting; }
        }
        #endregion Model 

    }
}

