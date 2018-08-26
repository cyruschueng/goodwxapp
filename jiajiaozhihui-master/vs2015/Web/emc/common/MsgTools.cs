using System;
using System.Collections.Generic;
using System.Configuration;
using System.Collections;
using System.Data;
using System.Linq;
using System.Web;
using SfSoft.DBUtility;
using SfSoft.SfEmc;
using log4net;
namespace SfSoft.web.emc.common
{
    public class MsgTools
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(MsgTools));
        SfSoft.web.WinicSmsService1.Service1 ws = null;
        string SMSUserName = "";
        string SMSPassword = "";
 

        public MsgTools()
        {
            try
            {
                ws = new SfSoft.web.WinicSmsService1.Service1();
            }
            catch (Exception ee)
            {
                log.Debug(ee.Message);
            }
            string sql = "select DeptID from Pub_Dept where IsFiliale =0";
            DataSet ds = DBTools.GetList(sql);
            string FilialeID = "";
            if (ds.Tables[0].Rows.Count > 0)
            {
                FilialeID = ds.Tables[0].Rows[0]["DeptID"].ToString();
            }

            DataSet ds1 = DBTools.GetList("select * from Pub_SysParameter where FilialeID='" + FilialeID + "'");

 
            if (ds1.Tables[0].Rows.Count > 0)
            {
                SMSUserName = ds1.Tables[0].Rows[0]["SMSUserName"].ToString();
                SMSPassword = ds1.Tables[0].Rows[0]["SMSPassword"].ToString();
            }

 
            if ((SMSPassword != null) && (SMSPassword != ""))
            {
               SMSPassword = DESEncrypt.Decrypt(SMSPassword);
            }
        }
        public Hashtable SMS_GetUserInfo(string FilialeID)
        {
            Hashtable hash = new Hashtable();
            string result = "";
            if (SMSUserName == "" || SMSPassword == "")
            {
                result = "-02";
            }
 
            result = ws.GetUserInfo(SMSUserName, SMSPassword);
            string[] arrR = result.Split('/');
            for (int i = 0; i < arrR.Length; i++)
            {
                hash.Add(i.ToString(), arrR[i]);
            }
            return hash;
        }
        public Hashtable GetSMSUserInfoMeanging()
        {
            // 000/用户名/余额   /单价   /短信字符数/签名   /语音短信单价/传真单价/彩信单价/所属经销商
            Hashtable hash = new Hashtable();
            hash.Add("0", "状态");
            hash.Add("1", "用户名");
            hash.Add("2", "余额");
            hash.Add("3", "单价");
            hash.Add("4", "短信字符数");
            hash.Add("5", "签名");
            hash.Add("6", "语音短信单价");
            hash.Add("7", "传真单价");
            hash.Add("8", "彩信单价");
            hash.Add("9", "所属经销商");
            return hash;
        }
        public Hashtable SetSMSERRORINFO()
        {
            Hashtable hash = new Hashtable();
            hash.Add("000", "成功！");
            hash.Add("808191630319344", "成功！");
            hash.Add("-01", "当前账号余额不足！");
            hash.Add("-02", "当前用户ID错误！");
            hash.Add("-03", "当前密码错误！");
            hash.Add("-04", "参数不够或参数内容的类型错误！");
            hash.Add("-05", "手机号码格式不对！（目前还未实现）");
            hash.Add("-06", "短信内容编码不对！（目前还未实现）");
            hash.Add("-07", "短信内容含有敏感字符！（目前还未实现）");
            hash.Add("-08", "无接收数据（目前还未实现）");
            hash.Add("-09", "系统维护中.. （目前还未实现）");
            hash.Add("-10", "手机号码数量超长！ （目前还未实现）");
            hash.Add("-11", "短信内容超长！（70个字符）");
            hash.Add("-12", "其它错误！");
            hash.Add("-13", "文件传输错误");
            return hash;

        }
        public string GetSmsConn(string flag)
        {
            Hashtable hash = SetSMSERRORINFO();
            return hash[flag].ToString();
        }

        public string SendSms(string strMobile, string strContent, string otime)
        {
            try
            {
                return   ws.SendMessages(SMSUserName, SMSPassword, strMobile, strContent, otime);
            }
            catch (Exception e)
            {
                log.Debug(e.Message);
                return "";
            }

        }

        public string SendFax(string faxnos, string Title,Byte [] bytes,string FileName)
        {
            try
            {
                string faxno = "";
                string ToMan = "";
                string msg = "";
                if (faxnos != "")
                {
                    string[] arrFax = faxnos.Split(',');
                    if (arrFax.Length > 0)
                    {
                        for (int i = 0; i < arrFax.Length; i++)
                        {
                            if (arrFax[i].Length > 0)
                            {
                                string[] arrF = arrFax[i].Split('|');
                                if (arrF.Length == 1)
                                {
                                    faxno = arrF[0].ToString();
                                    ToMan = faxno;
                                }
                                else if (arrF.Length == 2)
                                {
                                    ToMan = arrF[0].ToString();
                                    faxno = arrF[1].ToString();
                                }
                                if (faxno != "")
                                {
 
                                    msg +=  ws.SendFax(SMSUserName, SMSPassword, faxno, ToMan, Title, bytes, FileName) + ";";
                                }
                            }

                        }
                    }
                }
                return msg;

            
          
            }
            catch (Exception e)
            {
                log.Debug(e.Message);
                return e.Message;
            }

        }
    }
}
