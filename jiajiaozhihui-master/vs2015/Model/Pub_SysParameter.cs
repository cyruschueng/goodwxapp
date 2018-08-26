using System;
namespace SfSoft.Model
{
    /// <summary>
    /// Pub_SysParameter:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class Pub_SysParameter
    {
        public Pub_SysParameter()
        { }
        #region Model
        private int _id;
        private string _sysstarttimeam;
        private string _sysendtimeam;
        private string _sysstarttimepm;
        private decimal? _sysdaysiesta;
        private decimal? _systotalhours;
        private string _sysendtimepm;
        private DateTime? _setdate;
        private string _sysweekrest0;
        private string _sysweekrest6;
        private string _filialeid;
        private string _email;
        private string _emailpassword;
        private string _pop3server;
        private string _pop3port;
        private string _smsserver;
        private string _smsusername;
        private string _smspassword;
        private decimal? _smsprice;
        private decimal? _faxprice;
        private int? _checkinendday;
        /// <summary>
        /// 
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysStartTimeAm
        {
            set { _sysstarttimeam = value; }
            get { return _sysstarttimeam; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysEndTimeAm
        {
            set { _sysendtimeam = value; }
            get { return _sysendtimeam; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysStartTimePm
        {
            set { _sysstarttimepm = value; }
            get { return _sysstarttimepm; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? SysDaySiesta
        {
            set { _sysdaysiesta = value; }
            get { return _sysdaysiesta; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? SysTotalHours
        {
            set { _systotalhours = value; }
            get { return _systotalhours; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysEndTimePm
        {
            set { _sysendtimepm = value; }
            get { return _sysendtimepm; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? SetDate
        {
            set { _setdate = value; }
            get { return _setdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysWeekRest0
        {
            set { _sysweekrest0 = value; }
            get { return _sysweekrest0; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SysWeekRest6
        {
            set { _sysweekrest6 = value; }
            get { return _sysweekrest6; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FilialeID
        {
            set { _filialeid = value; }
            get { return _filialeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string EMail
        {
            set { _email = value; }
            get { return _email; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string EmailPassword
        {
            set { _emailpassword = value; }
            get { return _emailpassword; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Pop3Server
        {
            set { _pop3server = value; }
            get { return _pop3server; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Pop3Port
        {
            set { _pop3port = value; }
            get { return _pop3port; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SMSServer
        {
            set { _smsserver = value; }
            get { return _smsserver; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SMSUserName
        {
            set { _smsusername = value; }
            get { return _smsusername; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SMSPassword
        {
            set { _smspassword = value; }
            get { return _smspassword; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? SMSPrice
        {
            set { _smsprice = value; }
            get { return _smsprice; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? FAXPrice
        {
            set { _faxprice = value; }
            get { return _faxprice; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? CheckInEndDay
        {
            set { _checkinendday = value; }
            get { return _checkinendday; }
        }
        #endregion Model

    }
}

