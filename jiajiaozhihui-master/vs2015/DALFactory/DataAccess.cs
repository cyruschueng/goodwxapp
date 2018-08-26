using System;
using System.Reflection;
using System.Configuration;

namespace SfSoft.DALFactory
{
	/// <summary>
    /// Abstract Factory pattern to create the DAL銆?


	/// </summary>
    public sealed class DataAccess
    {
        private static readonly string path = ConfigurationManager.AppSettings["DAL"];
        public DataAccess()
        { }

        #region CreateObject

        //涓嶄娇鐢ㄧ紦瀛?


        private static object CreateObjectNoCache(string path, string CacheKey)
        {
            try
            {
                object objType = Assembly.Load(path).CreateInstance(CacheKey);
                return objType;
            }
            catch//(System.Exception ex)
            {
                //string str=ex.Message;// 璁板綍閿欒鏃ュ織
                return null;
            }

        }
        //浣跨敤缂撳瓨
        private static object CreateObject(string path, string CacheKey)
        {
            object objType = DataCache.GetCache(CacheKey);
            if (objType == null)
            {
                try
                {
                    var x = Assembly.Load(path);
                    objType = Assembly.Load(path).CreateInstance(CacheKey);
                    DataCache.SetCache(CacheKey, objType);// 鍐欏叆缂撳瓨
                }
                catch(System.Exception ex)
                {
                    //string str=ex.Message;// 璁板綍閿欒鏃ュ織
                }
            }
            return objType;
        }


        #endregion

        #region 系统管理
        /// <summary>
        /// 鍒涘缓pub_modules鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Modules CreatePub_Modules()
        {

            string CacheKey = path + ".Pub_Modules";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Modules)objType;
        }
        /// <summary>
        /// 鍒涘缓Pub_Modules_Fun鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Modules_Fun CreatePub_Modules_Fun()
        {

            string CacheKey = path + ".Pub_Modules_Fun";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Modules_Fun)objType;
        }


        /// <summary>
        /// 鍒涘缓Pub_Help鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Help CreatePub_Help()
        {

            string CacheKey = path + ".Pub_Help";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Help)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_EmpInfo鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_EmpInfo CreatePub_EmpInfo()
        {

            string CacheKey = path + ".Pub_EmpInfo";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_EmpInfo)objType;
        }
        /// <summary>
        /// 鍒涘缓Pub_Roles_Fun鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Roles_Fun CreatePub_Roles_Fun()
        {

            string CacheKey = path + ".Pub_Roles_Fun";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Roles_Fun)objType;
        }

        /// <summary>
        /// 鍒涘缓aspnet_Roles鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.Iaspnet_Roles Createaspnet_Roles()
        {

            string CacheKey = path + ".aspnet_Roles";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.Iaspnet_Roles)objType;
        }
        /// <summary>
        /// 鍒涘缓Pub_Dept鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Dept CreatePub_Dept()
        {

            string CacheKey = path + ".Pub_Dept";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Dept)objType;
        }


        /// <summary>
        /// 鍒涘缓Pub_Company鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Company CreatePub_Company()
        {

            string CacheKey = path + ".Pub_Company";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Company)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_DeptUsers鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_DeptUsers CreatePub_DeptUsers()
        {

            string CacheKey = path + ".Pub_DeptUsers";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_DeptUsers)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_Roles_Company鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Roles_Company CreatePub_Roles_Company()
        {

            string CacheKey = path + ".Pub_Roles_Company";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Roles_Company)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_BaseData_Classc鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_BaseData_Classc CreatePub_BaseData_Classc()
        {

            string CacheKey = path + ".Pub_BaseData_Classc";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_BaseData_Classc)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_BaseData鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_BaseData CreatePub_BaseData()
        {

            string CacheKey = path + ".Pub_BaseData";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_BaseData)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_FunDef鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_FunDef CreatePub_FunDef()
        {

            string CacheKey = path + ".Pub_FunDef";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_FunDef)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_Data_Acl鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Data_Acl CreatePub_Data_Acl()
        {

            string CacheKey = path + ".Pub_Data_Acl";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Data_Acl)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_Data_Acl_Users鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Data_Acl_Users CreatePub_Data_Acl_Users()
        {

            string CacheKey = path + ".Pub_Data_Acl_Users";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Data_Acl_Users)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_Data_Assign鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Data_Assign CreatePub_Data_Assign()
        {

            string CacheKey = path + ".Pub_Data_Assign";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Data_Assign)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_Data_doc鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Data_doc CreatePub_Data_doc()
        {

            string CacheKey = path + ".Pub_Data_doc";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Data_doc)objType;
        }


        /// <summary>
        /// 鍒涘缓Pub_EmpInfo_Holiday鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_EmpInfo_Holiday CreatePub_EmpInfo_Holiday()
        {

            string CacheKey = path + ".Pub_EmpInfo_Holiday";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_EmpInfo_Holiday)objType;
        }

        public static SfSoft.IDAL.IPub_CallType CreatePub_CallType()
        {

            string CacheKey = path + ".Pub_CallType";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_CallType)objType;
        }


        public static SfSoft.IDAL.IPub_SysParameter CreatePub_SysParameter()
        {

            string CacheKey = path + ".Pub_SysParameter";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_SysParameter)objType;
        }
        public static SfSoft.IDAL.IPub_CallList_Add CreatePub_CallList_Add()
        {

            string CacheKey = path + ".Pub_CallList_Add";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_CallList_Add)objType;
        }

        #endregion
        #region 消息


        /// <summary>
        /// 鍒涘缓Pub_Msn鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Msn CreatePub_Msn()
        {

            string CacheKey = path + ".Pub_Msn";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Msn)objType;
        }
        /// <summary>
        /// 鍒涘缓Pub_Msn_Addressee鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_Msn_Addressee CreatePub_Msn_Addressee()
        {

            string CacheKey = path + ".Pub_Msn_Addressee";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_Msn_Addressee)objType;
        }
        #endregion
        #region 工作流程
        /// <summary>
        /// 鍒涘缓Pub_ACFlow鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_ACFlow CreatePub_ACFlow()
        {

            string CacheKey = path + ".Pub_ACFlow";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_ACFlow)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_AuditFlow鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_AuditFlow CreatePub_AuditFlow()
        {

            string CacheKey = path + ".Pub_AuditFlow";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_AuditFlow)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_AuditRec鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_AuditRec CreatePub_AuditRec()
        {

            string CacheKey = path + ".Pub_AuditRec";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_AuditRec)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_AuditFlow_Dept鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_AuditFlow_Dept CreatePub_AuditFlow_Dept()
        {

            string CacheKey = path + ".Pub_AuditFlow_Dept";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_AuditFlow_Dept)objType;
        }

        /// <summary>
        /// 鍒涘缓Pub_AuditResult鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_AuditResult CreatePub_AuditResult()
        {

            string CacheKey = path + ".Pub_AuditResult";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_AuditResult)objType;
        }
        #endregion

        #region 附件
        /// <summary>
        /// 鍒涘缓Pub_AttFiles鏁版嵁灞傛帴鍙?


        /// </summary>
        public static SfSoft.IDAL.IPub_AttFiles CreatePub_AttFiles()
        {

            string CacheKey = path + ".Pub_AttFiles";
            object objType = CreateObject(path, CacheKey);
            return (SfSoft.IDAL.IPub_AttFiles)objType;
        }
        #endregion


        #region

        public static SfSoft.IDAL.IPub_SignFile CreatePub_SignFile()
        {

            string ClassNamespace = path + ".Pub_SignFile";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IPub_SignFile)objType;
        }
        public static SfSoft.IDAL.IPub_Surrogate CreatePub_Surrogate()
        {

            string ClassNamespace = path + ".Pub_Surrogate";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IPub_Surrogate)objType;
        }
        public static SfSoft.IDAL.IPub_CallList CreatePub_CallList()
        {

            string ClassNamespace = path + ".Pub_CallList";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IPub_CallList)objType;
        }



        /// <summary>
        /// 日志
        /// </summary>
        public static SfSoft.IDAL.IEmc_logs CreateEmc_logs()
        {

            string ClassNamespace = path + ".Emc_logs";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IEmc_logs)objType;
        }
        #endregion



        /// <summary>
        /// 创建Pub_ComputerKey数据层接口
        /// </summary>
        public static SfSoft.IDAL.IPub_ComputerKey CreatePub_ComputerKey()
        {

            string ClassNamespace = path + ".Pub_ComputerKey";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IPub_ComputerKey)objType;
        }






        /// <summary>
        /// 创建Pub_UnSystem数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IPub_UnSystem CreatePub_UnSystem()
        {

            string ClassNamespace = path + ".Pub_UnSystem";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IPub_UnSystem)objType;
        }




        /// <summary>
        /// 创建Emc_Msg_Interface数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IEmc_Msg_Interface CreateEmc_Msg_Interface()
        {

            string ClassNamespace = path + ".Emc_Msg_Interface";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IEmc_Msg_Interface)objType;
        }
        #region 区域
        /// <summary>
        /// 创建Pub_Areas数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IPub_Areas CreatePub_Areas()
        {

            string ClassNamespace = path + ".Pub_Areas";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IPub_Areas)objType;
        }
        #endregion

        #region 微信数据
        /// <summary>
        /// 创建WX_HomeCard数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_HomeCard CreateWX_HomeCard()
        {

            string ClassNamespace = path + ".WX_HomeCard";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_HomeCard)objType;
        }

        /// <summary>
        /// 创建WX_Courses数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Courses CreateWX_Courses()
        {

            string ClassNamespace = path + ".WX_Courses";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Courses)objType;
        }


        /// <summary>
        /// 创建WX_Grade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Grade CreateWX_Grade()
        {

            string ClassNamespace = path + ".WX_Grade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Grade)objType;
        }


        /// <summary>
        /// 创建WX_Integral数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Integral CreateWX_Integral()
        {

            string ClassNamespace = path + ".WX_Integral";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Integral)objType;
        }


        /// <summary>
        /// 创建WX_Integral_Basic数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Integral_Basic CreateWX_Integral_Basic()
        {

            string ClassNamespace = path + ".WX_Integral_Basic";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Integral_Basic)objType;
        }


        /// <summary>
        /// 创建WX_Integral_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Integral_Detail CreateWX_Integral_Detail()
        {

            string ClassNamespace = path + ".WX_Integral_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Integral_Detail)objType;
        }


        /// <summary>
        /// 创建WX_Signin数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Signin CreateWX_Signin()
        {

            string ClassNamespace = path + ".WX_Signin";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Signin)objType;
        }
        /// <summary>
        /// 创建WX_WaitingList数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_WaitingList CreateWX_WaitingList()
        {

            string ClassNamespace = path + ".WX_WaitingList";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_WaitingList)objType;
        }
        /// <summary>
        /// 创建WX_MessageReply数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_MessageReply CreateWX_MessageReply()
        {

            string ClassNamespace = path + ".WX_MessageReply";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_MessageReply)objType;
        }

        /// <summary>
        /// 创建WX_PublicGood数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_PublicGood CreateWX_PublicGood()
        {

            string ClassNamespace = path + ".WX_PublicGood";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_PublicGood)objType;
        }

        /// <summary>
        /// 创建WX_PublicOrder数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_PublicOrder CreateWX_PublicOrder()
        {

            string ClassNamespace = path + ".WX_PublicOrder";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_PublicOrder)objType;
        }
        /// <summary>
        /// 创建WX_CoursOrder数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_CoursOrder CreateWX_CoursOrder()
        {

            string ClassNamespace = path + ".WX_CoursOrder";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_CoursOrder)objType;
        }
        /// <summary>
        /// 创建WX_ActivitySignin数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ActivitySignin CreateWX_ActivitySignin()
        {

            string ClassNamespace = path + ".WX_ActivitySignin";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ActivitySignin)objType;
        }
        /// <summary>
        /// 创建WX_ActivityAttention数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ActivityAttention CreateWX_ActivityAttention()
        {

            string ClassNamespace = path + ".WX_ActivityAttention";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ActivityAttention)objType;
        }

        /// <summary>
        /// 创建WX_DataBase数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_DataBase CreateWX_DataBase()
        {

            string ClassNamespace = path + ".WX_DataBase";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_DataBase)objType;
        }
        /// <summary>
        /// 创建WX_Share数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Share CreateWX_Share()
        {

            string ClassNamespace = path + ".WX_Share";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Share)objType;
        }
        /// <summary>
        /// 创建WX_SubscribeActivity数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_SubscribeActivity CreateWX_SubscribeActivity()
        {

            string ClassNamespace = path + ".WX_SubscribeActivity";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_SubscribeActivity)objType;
        }
        /// <summary>
        /// 创建WX_SubscribeResult数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_SubscribeResult CreateWX_SubscribeResult()
        {

            string ClassNamespace = path + ".WX_SubscribeResult";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_SubscribeResult)objType;
        }
        /// <summary>
        /// 创建WX_PublicOrder_Temp数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_PublicOrder_Temp CreateWX_PublicOrder_Temp()
        {
            string ClassNamespace = path + ".WX_PublicOrder_Temp";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_PublicOrder_Temp)objType;
        }
        /// <summary>
        /// 创建WX_JingHua数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_JingHua CreateWX_JingHua()
        {

            string ClassNamespace = path + ".WX_JingHua";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_JingHua)objType;
        }
        /// <summary>
        /// 创建WX_ParticipatorList数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ParticipatorList CreateWX_ParticipatorList()
        {

            string ClassNamespace = path + ".WX_ParticipatorList";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ParticipatorList)objType;
        }

        /// <summary>
        /// 创建WX_Topic数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Topic CreateWX_Topic()
        {

            string ClassNamespace = path + ".WX_Topic";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Topic)objType;
        }


        /// <summary>
        /// 创建WX_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Comment CreateWX_Comment()
        {

            string ClassNamespace = path + ".WX_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Comment)objType;
        }

        /// <summary>
        /// 创建WX_Support数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Support CreateWX_Support()
        {

            string ClassNamespace = path + ".WX_Support";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Support)objType;
        }

        /// <summary>
        /// 创建WX_TestQuestion数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion CreateWX_TestQuestion()
        {

            string ClassNamespace = path + ".WX_TestQuestion";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion)objType;
        }


        /// <summary>
        /// 创建WX_TestQuestionGrade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestionGrade CreateWX_TestQuestionGrade()
        {

            string ClassNamespace = path + ".WX_TestQuestionGrade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestionGrade)objType;
        }
        #endregion
        /// <summary>
        /// 创建WX_TestQuestionScore数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestionScore CreateWX_TestQuestionScore()
        {

            string ClassNamespace = path + ".WX_TestQuestionScore";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestionScore)objType;
        }

        /// <summary>
        /// 创建WX_Wish数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Wish CreateWX_Wish()
        {

            string ClassNamespace = path + ".WX_Wish";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Wish)objType;
        }


        /// <summary>
        /// 创建WX_LikeWish数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_LikeWish CreateWX_LikeWish()
        {

            string ClassNamespace = path + ".WX_LikeWish";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_LikeWish)objType;
        }

        /// <summary>
        /// 创建WX_Vote数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Vote CreateWX_Vote()
        {

            string ClassNamespace = path + ".WX_Vote";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Vote)objType;
        }


        /// <summary>
        /// 创建WX_ShowPhoto数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ShowPhoto CreateWX_ShowPhoto()
        {

            string ClassNamespace = path + ".WX_ShowPhoto";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ShowPhoto)objType;
        }


        /// <summary>
        /// 创建WX_ActivityManage数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ActivityManage CreateWX_ActivityManage()
        {

            string ClassNamespace = path + ".WX_ActivityManage";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ActivityManage)objType;
        }
        /// <summary>
        /// 创建WX_TestQuestion_Activity数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Activity CreateWX_TestQuestion_Activity()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Activity";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Activity)objType;
        }
        /// <summary>
        /// 创建WX_TestQuestion_Activity_Class数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Activity_Class CreateWX_TestQuestion_Activity_Class()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Activity_Class";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Activity_Class)objType;
        }


        /// <summary>
        /// 创建WX_TestQuestion_Player数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Player CreateWX_TestQuestion_Player()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Player";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Player)objType;
        }


        /// <summary>
        /// 创建WX_TestQuestion_Score数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Score CreateWX_TestQuestion_Score()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Score";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Score)objType;
        }
        /// <summary>
        /// 创建WX_TestQuestion_Grade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Grade CreateWX_TestQuestion_Grade()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Grade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Grade)objType;
        }
        /// <summary>
        /// 创建WX_TestQuestion_Activity_PlayerNumber数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Activity_PlayerNumber CreateWX_TestQuestion_Activity_PlayerNumber()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Activity_PlayerNumber";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Activity_PlayerNumber)objType;
        }
        /// <summary>
        /// 创建WX_TestQuestion_Answer_Record数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Answer_Record CreateWX_TestQuestion_Answer_Record()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Answer_Record";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Answer_Record)objType;
        }


        /// <summary>
        /// 创建WX_TestQuestion_Gold数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Gold CreateWX_TestQuestion_Gold()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Gold";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Gold)objType;
        }
        /// <summary>
        /// 创建WX_TestQuestion_Gold_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Gold_Detail CreateWX_TestQuestion_Gold_Detail()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Gold_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Gold_Detail)objType;
        }
        /// <summary>
        /// 创建WX_WeiXinAccounts数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_WeiXinAccounts CreateWX_WeiXinAccounts()
        {

            string ClassNamespace = path + ".WX_WeiXinAccounts";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_WeiXinAccounts)objType;
        }
        /// <summary>
        /// 创建WX_TestQuestion_Gold_Grade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Gold_Grade CreateWX_TestQuestion_Gold_Grade()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Gold_Grade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Gold_Grade)objType;
        }

        /// <summary>
        /// 创建WX_TestQuestion_Winner_Rule数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Winner_Rule CreateWX_TestQuestion_Winner_Rule()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Winner_Rule";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Winner_Rule)objType;
        }
        /// <summary>
        /// 创建WX_Libao_Set_Class数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Libao_Set_Class CreateWX_Libao_Set_Class()
        {

            string ClassNamespace = path + ".WX_Libao_Set_Class";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Libao_Set_Class)objType;
        }

        /// <summary>
        /// 创建WX_Libao_Bag数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Libao_Bag CreateWX_Libao_Bag()
        {

            string ClassNamespace = path + ".WX_Libao_Bag";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Libao_Bag)objType;
        }


        /// <summary>
        /// 创建WX_Libao_Bag_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Libao_Bag_Detail CreateWX_Libao_Bag_Detail()
        {

            string ClassNamespace = path + ".WX_Libao_Bag_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Libao_Bag_Detail)objType;
        }
        /// <summary>
        /// 创建WX_Doublenovember_File数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_File CreateWX_Doublenovember_File()
        {

            string ClassNamespace = path + ".WX_Doublenovember_File";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_File)objType;
        }


        /// <summary>
        /// 创建WX_Doublenovember_Like数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Like CreateWX_Doublenovember_Like()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Like";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Like)objType;
        }

        /// <summary>
        /// 创建WX_Advertisement数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Advertisement CreateWX_Advertisement()
        {

            string ClassNamespace = path + ".WX_Advertisement";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Advertisement)objType;
        }


        /// <summary>
        /// 创建WX_Advertisement_Statistics数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Advertisement_Statistics CreateWX_Advertisement_Statistics()
        {

            string ClassNamespace = path + ".WX_Advertisement_Statistics";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Advertisement_Statistics)objType;
        }
        /// <summary>
        /// 创建WX_Doublenovember_Children数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Children CreateWX_Doublenovember_Children()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Children";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Children)objType;
        }

        /// <summary>
        /// 创建WX_Doublenovember_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Comment CreateWX_Doublenovember_Comment()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Comment)objType;
        }

        /// <summary>
        /// 创建WX_Doublenovember_Invite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Invite CreateWX_Doublenovember_Invite()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Invite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Invite)objType;
        }
        /// <summary>
        /// 创建WX_Doublenovember_File_unscramble数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_File_unscramble CreateWX_Doublenovember_File_unscramble()
        {

            string ClassNamespace = path + ".WX_Doublenovember_File_unscramble";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_File_unscramble)objType;
        }
        /// <summary>
        /// 创建WX_Doublenovember_Grade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Grade CreateWX_Doublenovember_Grade()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Grade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Grade)objType;
        }
        /// <summary>
        /// 创建WX_Doublenovember_Award数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Award CreateWX_Doublenovember_Award()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Award";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Award)objType;
        }


        /// <summary>
        /// 创建WX_Doublenovember_Award_Basic数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Award_Basic CreateWX_Doublenovember_Award_Basic()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Award_Basic";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Award_Basic)objType;
        }


        /// <summary>
        /// 创建WX_Doublenovember_Award_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Award_Detail CreateWX_Doublenovember_Award_Detail()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Award_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Award_Detail)objType;
        }
        /// <summary>
        /// 创建WX_UserLocation数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_UserLocation CreateWX_UserLocation()
        {

            string ClassNamespace = path + ".WX_UserLocation";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_UserLocation)objType;
        }
        /// <summary>
        /// 创建WX_Items_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Items_User CreateWX_Items_User()
        {

            string ClassNamespace = path + ".WX_Items_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Items_User)objType;
        }
        /// <summary>
        /// 创建WX_Items数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Items CreateWX_Items()
        {

            string ClassNamespace = path + ".WX_Items";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Items)objType;
        }
        /// <summary>
        /// 创建WX_Product_Exchange数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Product_Exchange CreateWX_Product_Exchange()
        {

            string ClassNamespace = path + ".WX_Product_Exchange";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Product_Exchange)objType;
        }
        /// <summary>
        /// 创建WX_Item_Help数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Item_Help CreateWX_Item_Help()
        {

            string ClassNamespace = path + ".WX_Item_Help";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Item_Help)objType;
        }

        /// <summary>
        /// 创建WX_UserAddress数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_UserAddress CreateWX_UserAddress()
        {

            string ClassNamespace = path + ".WX_UserAddress";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_UserAddress)objType;
        }

        /// <summary>
        /// 创建WX_Course数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course CreateWX_Course()
        {

            string ClassNamespace = path + ".WX_Course";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course)objType;
        }


        /// <summary>
        /// 创建WX_Course_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Comment CreateWX_Course_Comment()
        {

            string ClassNamespace = path + ".WX_Course_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Comment)objType;
        }


        /// <summary>
        /// 创建WX_Course_Content数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Content CreateWX_Course_Content()
        {

            string ClassNamespace = path + ".WX_Course_Content";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Content)objType;
        }


        /// <summary>
        /// 创建WX_Course_Order数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Order CreateWX_Course_Order()
        {

            string ClassNamespace = path + ".WX_Course_Order";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Order)objType;
        }


        /// <summary>
        /// 创建WX_Course_Personal数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Personal CreateWX_Course_Personal()
        {

            string ClassNamespace = path + ".WX_Course_Personal";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Personal)objType;
        }


        /// <summary>
        /// 创建WX_Course_Provider数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Provider CreateWX_Course_Provider()
        {

            string ClassNamespace = path + ".WX_Course_Provider";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Provider)objType;
        }


        /// <summary>
        /// 创建WX_Course_Reward数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Reward CreateWX_Course_Reward()
        {

            string ClassNamespace = path + ".WX_Course_Reward";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Reward)objType;
        }


        /// <summary>
        /// 创建WX_Course_Timer数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Timer CreateWX_Course_Timer()
        {

            string ClassNamespace = path + ".WX_Course_Timer";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Timer)objType;
        }

        /// <summary>
        /// 创建WX_Course_Favorite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Favorite CreateWX_Course_Favorite()
        {

            string ClassNamespace = path + ".WX_Course_Favorite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Favorite)objType;
        }

        /// <summary>
        /// 创建WX_Course_Lecturer数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Lecturer CreateWX_Course_Lecturer()
        {

            string ClassNamespace = path + ".WX_Course_Lecturer";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Lecturer)objType;
        }

        /// <summary>
        /// 创建WX_Article_Release数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Article_Release CreateWX_Article_Release()
        {

            string ClassNamespace = path + ".WX_Article_Release";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Article_Release)objType;
        }

        /// <summary>
        /// 创建WX_TestQuestion_Item_Score数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_Item_Score CreateWX_TestQuestion_Item_Score()
        {

            string ClassNamespace = path + ".WX_TestQuestion_Item_Score";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_Item_Score)objType;
        }
        /// <summary>
        /// 创建WX_Group_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Comment CreateWX_Group_Comment()
        {

            string ClassNamespace = path + ".WX_Group_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Comment)objType;
        }


        /// <summary>
        /// 创建WX_Group_Content数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Content CreateWX_Group_Content()
        {

            string ClassNamespace = path + ".WX_Group_Content";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Content)objType;
        }


        /// <summary>
        /// 创建WX_Group_Info数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Info CreateWX_Group_Info()
        {

            string ClassNamespace = path + ".WX_Group_Info";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Info)objType;
        }


        /// <summary>
        /// 创建WX_Group_Invite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Invite CreateWX_Group_Invite()
        {

            string ClassNamespace = path + ".WX_Group_Invite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Invite)objType;
        }


        /// <summary>
        /// 创建WX_Group_Like数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Like CreateWX_Group_Like()
        {

            string ClassNamespace = path + ".WX_Group_Like";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Like)objType;
        }


        /// <summary>
        /// 创建WX_Group_Member数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Member CreateWX_Group_Member()
        {

            string ClassNamespace = path + ".WX_Group_Member";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Member)objType;
        }
        /// <summary>
        /// 创建WX_UserInfo数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_UserInfo CreateWX_UserInfo()
        {

            string ClassNamespace = path + ".WX_UserInfo";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_UserInfo)objType;
        }
        /// <summary>
        /// 创建WX_Group_Role数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Role CreateWX_Group_Role()
        {

            string ClassNamespace = path + ".WX_Group_Role";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Role)objType;
        }

        /// <summary>
        /// 创建WX_Group_Role_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Group_Role_User CreateWX_Group_Role_User()
        {

            string ClassNamespace = path + ".WX_Group_Role_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Group_Role_User)objType;
        }

        /// <summary>
        /// 创建WX_ZXS_Apply数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Apply CreateWX_ZXS_Apply()
        {

            string ClassNamespace = path + ".WX_ZXS_Apply";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Apply)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Comment CreateWX_ZXS_Comment()
        {

            string ClassNamespace = path + ".WX_ZXS_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Comment)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_Info数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Info CreateWX_ZXS_Info()
        {

            string ClassNamespace = path + ".WX_ZXS_Info";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Info)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_Like数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Like CreateWX_ZXS_Like()
        {

            string ClassNamespace = path + ".WX_ZXS_Like";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Like)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_MediaData数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_MediaData CreateWX_ZXS_MediaData()
        {

            string ClassNamespace = path + ".WX_ZXS_MediaData";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_MediaData)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_Order数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Order CreateWX_ZXS_Order()
        {

            string ClassNamespace = path + ".WX_ZXS_Order";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Order)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_Players数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Players CreateWX_ZXS_Players()
        {

            string ClassNamespace = path + ".WX_ZXS_Players";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Players)objType;
        }
        /// <summary>
        /// 创建WX_ZXS_Apply_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Apply_Detail CreateWX_ZXS_Apply_Detail()
        {

            string ClassNamespace = path + ".WX_ZXS_Apply_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Apply_Detail)objType;
        }

        /// <summary>
        /// 创建WX_ZXS_PlayerTask数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_PlayerTask CreateWX_ZXS_PlayerTask()
        {

            string ClassNamespace = path + ".WX_ZXS_PlayerTask";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_PlayerTask)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_Task数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Task CreateWX_ZXS_Task()
        {

            string ClassNamespace = path + ".WX_ZXS_Task";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Task)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_Theme数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Theme CreateWX_ZXS_Theme()
        {

            string ClassNamespace = path + ".WX_ZXS_Theme";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Theme)objType;
        }


        /// <summary>
        /// 创建WX_ZXS_WeekTask数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_WeekTask CreateWX_ZXS_WeekTask()
        {

            string ClassNamespace = path + ".WX_ZXS_WeekTask";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_WeekTask)objType;
        }
        /// <summary>
        /// 创建WX_ZXS_Witness数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Witness CreateWX_ZXS_Witness()
        {

            string ClassNamespace = path + ".WX_ZXS_Witness";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Witness)objType;
        }
        /// <summary>
        /// 创建WX_ZXS_Signin数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_Signin CreateWX_ZXS_Signin()
        {

            string ClassNamespace = path + ".WX_ZXS_Signin";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_Signin)objType;
        }
        /// <summary>
        /// 创建WX_ZXS_ApplyRecite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_ZXS_ApplyRecite CreateWX_ZXS_ApplyRecite()
        {

            string ClassNamespace = path + ".WX_ZXS_ApplyRecite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_ZXS_ApplyRecite)objType;
        }
        /// <summary>
        /// 创建WX_Doublenovember_Agreement数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Doublenovember_Agreement CreateWX_Doublenovember_Agreement()
        {

            string ClassNamespace = path + ".WX_Doublenovember_Agreement";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Doublenovember_Agreement)objType;
        }

        /// <summary>
        /// 创建WX_Read_Award数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Award CreateWX_Read_Award()
        {

            string ClassNamespace = path + ".WX_Read_Award";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Award)objType;
        }


        /// <summary>
        /// 创建WX_Read_Award_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Award_Detail CreateWX_Read_Award_Detail()
        {

            string ClassNamespace = path + ".WX_Read_Award_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Award_Detail)objType;
        }


        /// <summary>
        /// 创建WX_Read_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Comment CreateWX_Read_Comment()
        {

            string ClassNamespace = path + ".WX_Read_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Comment)objType;
        }


        /// <summary>
        /// 创建WX_Read_File数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_File CreateWX_Read_File()
        {

            string ClassNamespace = path + ".WX_Read_File";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_File)objType;
        }


        /// <summary>
        /// 创建WX_Read_File_Data数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_File_Data CreateWX_Read_File_Data()
        {

            string ClassNamespace = path + ".WX_Read_File_Data";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_File_Data)objType;
        }


        /// <summary>
        /// 创建WX_Read_Grade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Grade CreateWX_Read_Grade()
        {

            string ClassNamespace = path + ".WX_Read_Grade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Grade)objType;
        }


        /// <summary>
        /// 创建WX_Read_Info数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Info CreateWX_Read_Info()
        {

            string ClassNamespace = path + ".WX_Read_Info";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Info)objType;
        }


        /// <summary>
        /// 创建WX_Read_Invite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Invite CreateWX_Read_Invite()
        {

            string ClassNamespace = path + ".WX_Read_Invite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Invite)objType;
        }


        /// <summary>
        /// 创建WX_Read_Like数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Like CreateWX_Read_Like()
        {

            string ClassNamespace = path + ".WX_Read_Like";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Like)objType;
        }


        /// <summary>
        /// 创建WX_Read_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_User CreateWX_Read_User()
        {

            string ClassNamespace = path + ".WX_Read_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_User)objType;
        }
        /// <summary>
        /// 创建WX_Yuedu_Award数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_Award CreateWX_Yuedu_Award()
        {

            string ClassNamespace = path + ".WX_Yuedu_Award";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_Award)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_Award_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_Award_Detail CreateWX_Yuedu_Award_Detail()
        {

            string ClassNamespace = path + ".WX_Yuedu_Award_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_Award_Detail)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_Comment CreateWX_Yuedu_Comment()
        {

            string ClassNamespace = path + ".WX_Yuedu_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_Comment)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_File数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_File CreateWX_Yuedu_File()
        {

            string ClassNamespace = path + ".WX_Yuedu_File";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_File)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_File_Data数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_File_Data CreateWX_Yuedu_File_Data()
        {

            string ClassNamespace = path + ".WX_Yuedu_File_Data";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_File_Data)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_Grade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_Grade CreateWX_Yuedu_Grade()
        {

            string ClassNamespace = path + ".WX_Yuedu_Grade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_Grade)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_Info数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_Info CreateWX_Yuedu_Info()
        {

            string ClassNamespace = path + ".WX_Yuedu_Info";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_Info)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_Invite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_Invite CreateWX_Yuedu_Invite()
        {

            string ClassNamespace = path + ".WX_Yuedu_Invite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_Invite)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_Like数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_Like CreateWX_Yuedu_Like()
        {

            string ClassNamespace = path + ".WX_Yuedu_Like";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_Like)objType;
        }


        /// <summary>
        /// 创建WX_Yuedu_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Yuedu_User CreateWX_Yuedu_User()
        {

            string ClassNamespace = path + ".WX_Yuedu_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Yuedu_User)objType;
        }
        /// <summary>
        /// 创建WX_Read_Plan数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Read_Plan CreateWX_Read_Plan()
        {

            string ClassNamespace = path + ".WX_Read_Plan";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Read_Plan)objType;
        }

        /// <summary>
        /// 创建WX_Parents_Plan数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Parents_Plan CreateWX_Parents_Plan()
        {

            string ClassNamespace = path + ".WX_Parents_Plan";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Parents_Plan)objType;
        }


        /// <summary>
        /// 创建WX_Parents_Test数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Parents_Test CreateWX_Parents_Test()
        {

            string ClassNamespace = path + ".WX_Parents_Test";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Parents_Test)objType;
        }


        /// <summary>
        /// 创建WX_Parents_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Parents_User CreateWX_Parents_User()
        {

            string ClassNamespace = path + ".WX_Parents_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Parents_User)objType;
        }

        /// <summary>
        /// 创建WX_TestQuestion_TestRecord数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_TestQuestion_TestRecord CreateWX_TestQuestion_TestRecord()
        {

            string ClassNamespace = path + ".WX_TestQuestion_TestRecord";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_TestQuestion_TestRecord)objType;
        }
        /// <summary>
        /// 创建WX_Course_Section数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Section CreateWX_Course_Section()
        {

            string ClassNamespace = path + ".WX_Course_Section";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Section)objType;
        }
        /// <summary>
        /// 创建WX_Course_Bag数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Bag CreateWX_Course_Bag()
        {

            string ClassNamespace = path + ".WX_Course_Bag";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Bag)objType;
        }
        /// <summary>
        /// 创建WX_Course_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_User CreateWX_Course_User()
        {

            string ClassNamespace = path + ".WX_Course_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_User)objType;
        }
        /// <summary>
        /// 创建Wx_JJZH_GuWenStatistics数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWx_JJZH_GuWenStatistics CreateWx_JJZH_GuWenStatistics()
        {

            string ClassNamespace = path + ".Wx_JJZH_GuWenStatistics";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWx_JJZH_GuWenStatistics)objType;
        }
        /// <summary>
        /// 创建WX_QA_Award数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Award CreateWX_QA_Award()
        {

            string ClassNamespace = path + ".WX_QA_Award";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Award)objType;
        }


        /// <summary>
        /// 创建WX_QA_Award_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Award_Detail CreateWX_QA_Award_Detail()
        {

            string ClassNamespace = path + ".WX_QA_Award_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Award_Detail)objType;
        }


        /// <summary>
        /// 创建WX_QA_Comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Comment CreateWX_QA_Comment()
        {

            string ClassNamespace = path + ".WX_QA_Comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Comment)objType;
        }


        /// <summary>
        /// 创建WX_QA_File数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_File CreateWX_QA_File()
        {

            string ClassNamespace = path + ".WX_QA_File";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_File)objType;
        }


        /// <summary>
        /// 创建WX_QA_File_Data数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_File_Data CreateWX_QA_File_Data()
        {

            string ClassNamespace = path + ".WX_QA_File_Data";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_File_Data)objType;
        }


        /// <summary>
        /// 创建WX_QA_Grade数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Grade CreateWX_QA_Grade()
        {

            string ClassNamespace = path + ".WX_QA_Grade";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Grade)objType;
        }


        /// <summary>
        /// 创建WX_QA_Info数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Info CreateWX_QA_Info()
        {

            string ClassNamespace = path + ".WX_QA_Info";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Info)objType;
        }


        /// <summary>
        /// 创建WX_QA_Invite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Invite CreateWX_QA_Invite()
        {

            string ClassNamespace = path + ".WX_QA_Invite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Invite)objType;
        }


        /// <summary>
        /// 创建WX_QA_Like数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Like CreateWX_QA_Like()
        {

            string ClassNamespace = path + ".WX_QA_Like";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Like)objType;
        }


        /// <summary>
        /// 创建WX_QA_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_User CreateWX_QA_User()
        {

            string ClassNamespace = path + ".WX_QA_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_User)objType;
        }
        /// <summary>
        /// 创建WX_JJZH_Expert数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_JJZH_Expert CreateWX_JJZH_Expert()
        {

            string ClassNamespace = path + ".WX_JJZH_Expert";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_JJZH_Expert)objType;
        }
        /// <summary>
        /// 创建WX_QA_Expert数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_Expert CreateWX_QA_Expert()
        {

            string ClassNamespace = path + ".WX_QA_Expert";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_Expert)objType;
        }
        /// <summary>
        /// 创建WX_QA_ExpertLike数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_ExpertLike CreateWX_QA_ExpertLike()
        {

            string ClassNamespace = path + ".WX_QA_ExpertLike";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_ExpertLike)objType;
        }
        /// <summary>
        /// 创建WX_QA_ExpertApplication数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_QA_ExpertApplication CreateWX_QA_ExpertApplication()
        {

            string ClassNamespace = path + ".WX_QA_ExpertApplication";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_QA_ExpertApplication)objType;
        }
        /// <summary>
        /// 创建WX_Course_SetBag数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_SetBag CreateWX_Course_SetBag()
        {

            string ClassNamespace = path + ".WX_Course_SetBag";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_SetBag)objType;
        }
        /// <summary>
        /// 创建WX_Audio数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio CreateWX_Audio()
        {

            string ClassNamespace = path + ".WX_Audio";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio)objType;
        }


        /// <summary>
        /// 创建WX_Audio_DownLoad数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio_DownLoad CreateWX_Audio_DownLoad()
        {

            string ClassNamespace = path + ".WX_Audio_DownLoad";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio_DownLoad)objType;
        }


        /// <summary>
        /// 创建WX_Audio_Favorite数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio_Favorite CreateWX_Audio_Favorite()
        {

            string ClassNamespace = path + ".WX_Audio_Favorite";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio_Favorite)objType;
        }


        /// <summary>
        /// 创建WX_Audio_MyRecord数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio_MyRecord CreateWX_Audio_MyRecord()
        {

            string ClassNamespace = path + ".WX_Audio_MyRecord";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio_MyRecord)objType;
        }

        /// <summary>
        /// 创建WX_Audio_User数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio_User CreateWX_Audio_User()
        {

            string ClassNamespace = path + ".WX_Audio_User";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio_User)objType;
        }
        /// <summary>
        /// 创建WX_Audio_Plan数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio_Plan CreateWX_Audio_Plan()
        {

            string ClassNamespace = path + ".WX_Audio_Plan";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio_Plan)objType;
        }


        /// <summary>
        /// 创建WX_Audio_PlanList数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio_PlanList CreateWX_Audio_PlanList()
        {

            string ClassNamespace = path + ".WX_Audio_PlanList";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio_PlanList)objType;
        }
        /// <summary>
        /// 创建WX_Audio_Category数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Audio_Category CreateWX_Audio_Category()
        {

            string ClassNamespace = path + ".WX_Audio_Category";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Audio_Category)objType;
        }

        /// <summary>
        /// 创建WX_Course_Card数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Card CreateWX_Course_Card()
        {

            string ClassNamespace = path + ".WX_Course_Card";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Card)objType;
        }


        /// <summary>
        /// 创建WX_Course_Card_Detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Card_Detail CreateWX_Course_Card_Detail()
        {

            string ClassNamespace = path + ".WX_Course_Card_Detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Card_Detail)objType;
        }

        /// <summary>
        /// 创建WX_Template_Msg数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Template_Msg CreateWX_Template_Msg()
        {

            string ClassNamespace = path + ".WX_Template_Msg";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Template_Msg)objType;
        }
        /// <summary>
        /// 创建WX_NativePay数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_NativePay CreateWX_NativePay()
        {
            string ClassNamespace = path + ".WX_NativePay";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_NativePay)objType;
        }

        /// <summary>
        /// 创建WX_Course_RuleDoc数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_RuleDoc CreateWX_Course_RuleDoc()
        {

            string ClassNamespace = path + ".WX_Course_RuleDoc";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_RuleDoc)objType;
        }


        /// <summary>
        /// 创建WX_Course_RuleSet数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_RuleSet CreateWX_Course_RuleSet()
        {

            string ClassNamespace = path + ".WX_Course_RuleSet";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_RuleSet)objType;
        }
        /// <summary>
        /// 创建WX_Course_Config数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Config CreateWX_Course_Config()
        {

            string ClassNamespace = path + ".WX_Course_Config";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Config)objType;
        }
        /// <summary>
        /// 创建WX_Course_Card_Detail_Error数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Card_Detail_Error CreateWX_Course_Card_Detail_Error()
        {

            string ClassNamespace = path + ".WX_Course_Card_Detail_Error";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Card_Detail_Error)objType;
        }
        /// <summary>
        /// 创建Wx_TestQuestion_Item_Ranking数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWx_TestQuestion_Item_Ranking CreateWx_TestQuestion_Item_Ranking()
        {

            string ClassNamespace = path + ".Wx_TestQuestion_Item_Ranking";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWx_TestQuestion_Item_Ranking)objType;
        }
        /// <summary>
        /// 创建WX_Course_Prize_Order数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Course_Prize_Order CreateWX_Course_Prize_Order()
        {

            string ClassNamespace = path + ".WX_Course_Prize_Order";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Course_Prize_Order)objType;
        }
        /// <summary>
        /// 创建WX_WarrantyCard数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_WarrantyCard CreateWX_WarrantyCard()
        {

            string ClassNamespace = path + ".WX_WarrantyCard";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_WarrantyCard)objType;
        }

        /// <summary>
        /// 创建WX_PayOrder数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_PayOrder CreateWX_PayOrder()
        {

            string ClassNamespace = path + ".WX_PayOrder";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_PayOrder)objType;
        }
        /// <summary>
        /// 创建WX_Product_Attach数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_Product_Attach CreateWX_Product_Attach()
        {

            string ClassNamespace = path + ".WX_Product_Attach";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Product_Attach)objType;
        }
        /// <summary>
        /// 创建wxrrd_guider数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwxrrd_guider Createwxrrd_guider()
        {

            string ClassNamespace = path + ".wxrrd_guider";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwxrrd_guider)objType;
        }
        /// <summary>
        /// 创建WX_SGroup数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_SGroup CreateWX_SGroup()
        {

            string ClassNamespace = path + ".WX_SGroup";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_SGroup)objType;
        }


        /// <summary>
        /// 创建WX_SGroup_Content数据层接口。
        /// </summary>
        public static SfSoft.IDAL.IWX_SGroup_Content CreateWX_SGroup_Content()
        {

            string ClassNamespace = path + ".WX_SGroup_Content";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_SGroup_Content)objType;
        }

        /// <summary>
		/// 创建WX_Bill数据层接口。
		/// </summary>
		public static SfSoft.IDAL.IWX_Bill CreateWX_Bill()
        {

            string ClassNamespace = path + ".WX_Bill";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Bill)objType;
        }
        /// <summary>
		/// 创建WX_Bills数据层接口。
		/// </summary>
		public static SfSoft.IDAL.IWX_Bills CreateWX_Bills()
        {

            string ClassNamespace = path + ".WX_Bills";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_Bills)objType;
        }
        /// <summary>
		/// 创建wx_book数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_book Createwx_book()
        {

            string ClassNamespace = path + ".wx_book";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_book)objType;
        }


        /// <summary>
        /// 创建wx_book_order数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_book_order Createwx_book_order()
        {

            string ClassNamespace = path + ".wx_book_order";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_book_order)objType;
        }


        /// <summary>
        /// 创建wx_book_share数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_book_share Createwx_book_share()
        {

            string ClassNamespace = path + ".wx_book_share";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_book_share)objType;
        }

        /// <summary>
		/// 创建wx_habit数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_habit Createwx_habit()
        {

            string ClassNamespace = path + ".wx_habit";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit)objType;
        }


        /// <summary>
        /// 创建wx_habit_black_list数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_habit_black_list Createwx_habit_black_list()
        {

            string ClassNamespace = path + ".wx_habit_black_list";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_black_list)objType;
        }


        /// <summary>
        /// 创建wx_habit_classify数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_habit_classify Createwx_habit_classify()
        {

            string ClassNamespace = path + ".wx_habit_classify";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_classify)objType;
        }


        /// <summary>
        /// 创建wx_habit_comment数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_habit_comment Createwx_habit_comment()
        {

            string ClassNamespace = path + ".wx_habit_comment";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_comment)objType;
        }


        /// <summary>
        /// 创建wx_habit_like数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_habit_like Createwx_habit_like()
        {

            string ClassNamespace = path + ".wx_habit_like";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_like)objType;
        }


        /// <summary>
        /// 创建wx_habit_my数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_habit_my Createwx_habit_my()
        {

            string ClassNamespace = path + ".wx_habit_my";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_my)objType;
        }


        /// <summary>
        /// 创建wx_habit_my_attention数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_habit_my_attention Createwx_habit_my_attention()
        {

            string ClassNamespace = path + ".wx_habit_my_attention";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_my_attention)objType;
        }


        /// <summary>
        /// 创建wx_habit_my_detail数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_habit_my_detail Createwx_habit_my_detail()
        {

            string ClassNamespace = path + ".wx_habit_my_detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_my_detail)objType;
        }
        /// <summary>
		/// 创建wx_habit_my_punch_card数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_habit_my_punch_card Createwx_habit_my_punch_card()
        {

            string ClassNamespace = path + ".wx_habit_my_punch_card";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_my_punch_card)objType;
        }
        /// <summary>
		/// 创建wx_habit_group数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_habit_group Createwx_habit_group()
        {

            string ClassNamespace = path + ".wx_habit_group";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_group)objType;
        }
        /// <summary>
		/// 创建wx_online数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_online Createwx_online()
        {

            string ClassNamespace = path + ".wx_online";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_online)objType;
        }
        /// <summary>
		/// 创建wx_gardenia数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_gardenia Createwx_gardenia()
        {

            string ClassNamespace = path + ".wx_gardenia";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_gardenia)objType;
        }


        /// <summary>
        /// 创建wx_gardenia_role数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_gardenia_role Createwx_gardenia_role()
        {

            string ClassNamespace = path + ".wx_gardenia_role";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_gardenia_role)objType;
        }


        /// <summary>
        /// 创建wx_gardenia_user数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_gardenia_user Createwx_gardenia_user()
        {

            string ClassNamespace = path + ".wx_gardenia_user";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_gardenia_user)objType;
        }
        /// <summary>
		/// 创建wx_gardenia_task数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_gardenia_task Createwx_gardenia_task()
        {

            string ClassNamespace = path + ".wx_gardenia_task";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_gardenia_task)objType;
        }
        /// <summary>
		/// 创建wx_gardenia_user_detail数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_gardenia_user_detail Createwx_gardenia_user_detail()
        {

            string ClassNamespace = path + ".wx_gardenia_user_detail";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_gardenia_user_detail)objType;
        }
        /// <summary>
		/// 创建wx_gardenia_test数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_gardenia_test Createwx_gardenia_test()
        {

            string ClassNamespace = path + ".wx_gardenia_test";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_gardenia_test)objType;
        }
        /// <summary>
		/// 创建WX_SGroup_Tpl数据层接口。
		/// </summary>
		public static SfSoft.IDAL.IWX_SGroup_Tpl CreateWX_SGroup_Tpl()
        {

            string ClassNamespace = path + ".WX_SGroup_Tpl";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.IWX_SGroup_Tpl)objType;
        }

        /// <summary>
		/// 创建wx_habit_group_member数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_habit_group_member Createwx_habit_group_member()
        {

            string ClassNamespace = path + ".wx_habit_group_member";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_habit_group_member)objType;
        }
        /// <summary>
		/// 创建wx_source数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_source Createwx_source()
        {

            string ClassNamespace = path + ".wx_source";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_source)objType;
        }


        /// <summary>
        /// 创建wx_source_list数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_source_list Createwx_source_list()
        {

            string ClassNamespace = path + ".wx_source_list";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_source_list)objType;
        }

        /// <summary>
		/// 创建wx_class数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_class Createwx_class()
        {

            string ClassNamespace = path + ".wx_class";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_class)objType;
        }


        /// <summary>
        /// 创建wx_class_courses数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_class_courses Createwx_class_courses()
        {

            string ClassNamespace = path + ".wx_class_courses";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_class_courses)objType;
        }

        /// <summary>
		/// 创建wx_comments数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_comments Createwx_comments()
        {

            string ClassNamespace = path + ".wx_comments";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_comments)objType;
        }


        /// <summary>
        /// 创建wx_likes数据层接口。
        /// </summary>
        public static SfSoft.IDAL.Iwx_likes Createwx_likes()
        {

            string ClassNamespace = path + ".wx_likes";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_likes)objType;
        }
        /// <summary>
		/// 创建wx_gardenia_learn_recoder数据层接口。
		/// </summary>
		public static SfSoft.IDAL.Iwx_gardenia_learn_recoder Createwx_gardenia_learn_recoder()
        {

            string ClassNamespace = path + ".wx_gardenia_learn_recoder";
            object objType = CreateObject(path, ClassNamespace);
            return (SfSoft.IDAL.Iwx_gardenia_learn_recoder)objType;
        }
    }
}
