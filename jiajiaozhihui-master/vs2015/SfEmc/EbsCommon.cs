﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using SfSoft.BLL;
using System.Web;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Web.Mail;
using System.Net;
using SfSoft.DBUtility;
using SfSoft.Common;
using SfSoft.SfEmc;
using YYControls;
using System.Threading;
using System.IO;

using System.Text.RegularExpressions;

namespace SfSoft.SfEmc
{
    public static class EbsCommon
    {

//        /// <summary>
//        /// 根据MID取的模块名称
//        /// </summary>
//        /// <param name="MID"></param>
//        /// <returns></returns>
//        public static string GetModulsNameByMID(string MID)
//        {
//            string ModulesName = "";
//            SfSoft.BLL.Pub_Modules bll = new SfSoft.BLL.Pub_Modules();
//            SfSoft.Model.Pub_Modules model = new SfSoft.Model.Pub_Modules();
//            model = bll.GetModel(MID);
//            if (model != null)
//            {
//                ModulesName = model.ModulesName;
//            }
//            else
//            {
//                ModulesName = null;
//            }
//            return ModulesName;

//        }

//        /// <summary>
//        /// 取的网站是否可以Copy
//        /// </summary>
//        /// <param name="MID"></param>
//        /// <returns></returns>
//        public static string GetIsSiteCopy()
//        {
//            string IsSiteCopy = "";
//            SfSoft.BLL.Ebs_BaseInfo bll = new SfSoft.BLL.Ebs_BaseInfo();
//            DataSet ds = bll.GetList("");
//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                IsSiteCopy = ds.Tables[0].Rows[0]["IsSiteCopy"].ToString();
//            }
//            return IsSiteCopy;

//        }
//        /// <summary>
//        /// 取的产品分类名称根据分类ID
//        /// </summary>
//        /// <param name="CatID"></param>
//        /// <returns></returns>
//        public static string GetProCatNameByCatID(string CatID)
//        {
//            if (CatID == "")
//            {
//                return "";
//            }
//            string ProCatName = "";
//            SfSoft.BLL.Ebs_ProductCat bll = new SfSoft.BLL.Ebs_ProductCat();
//            SfSoft.Model.Ebs_ProductCat model = new SfSoft.Model.Ebs_ProductCat();
//            model = bll.GetModel(int.Parse(CatID));
//            if (model != null)
//            {
//                ProCatName = model.ProCatName;
//            }
//            else
//            {
//                ProCatName = "";
//            }
//            return ProCatName;

//        }


        /// <summary>
        /// 根据MID取的会员中心模块名称
        /// </summary>
        /// <param name="MID"></param>
        /// <returns></returns>
        public static string GetMemberModulsNameByMID(string MID)
        {
            string ModulesName = "";
            DataSet ds = DBTools.GetList("select * from Ebs_MbMenu where ModulesID='" + MID + "'");
            if (ds.Tables[0].Rows.Count > 0)
            {

                ModulesName = ds.Tables[0].Rows[0]["ModulesName"].ToString();
            }
            else
            {
                ModulesName = null;
            }
            return ModulesName;

        }

        public static string GetDropDownListValue(DropDownList ddl)
        {
            string dv = "";
            if (ddl.SelectedItem != null && ddl.SelectedItem.Value != "--")
            {
                dv = ddl.SelectedItem.Value;
            }

            return dv;
        }

        public static string GetDropDownListText(DropDownList ddl)
        {
            string dv = "";
            if (ddl.SelectedItem != null && ddl.SelectedItem.Text != "--未选择--")
            {
                dv = ddl.SelectedItem.Text;
            }

            return dv;
        }
        public static string GetRadioButtonListValue(RadioButtonList rbl)
        {
            string dv = "";
            if (rbl.SelectedItem != null && rbl.SelectedItem.Value != "")
            {
                dv = rbl.SelectedItem.Value;
            }

            return dv;
        }

        public static string GetRadioButtonListText(RadioButtonList rbl)
        {
            string dv = "";
            if (rbl.SelectedItem != null && rbl.SelectedItem.Text != "")
            {
                dv = rbl.SelectedItem.Text;
            }

            return dv;
        }
        /// <summary>
        /// 取的flv 格式播放器
        /// </summary>
        /// <param name="flvpath"></param>
        /// <param name="flvpath">是否需要加水印</param>
        /// <returns></returns>
        public static string GetFlvShow(string flvpath, bool IsSy, string w, string h)
        {
            if (flvpath == "")
            {
                return "";
            }
            return GetFlvShow(flvpath, IsSy, w, h, "", "");

        }

        /// <summary>
        /// 取的flv 格式播放器
        /// </summary>
        /// <param name="flvpath"></param>
        /// <param name="flvpath">是否需要加水印</param>
        /// <returns></returns>
        public static string GetFlvShow(string flvpath, bool IsSy, string w, string h, string flvimg, string strUrl)
        {
            if (flvpath == "")
            {
                return "";
            }

            StringBuilder sb = new StringBuilder();
            if (w == "")
            {
                w = "400";
            }
            if (h == "")
            {
                h = "300";
            }
            //取的扩展名

            string ExtName = SfSoft.Common.FileUpLoadCommon.GetExtName(flvpath).ToLower();
            if (ExtName == "swf")
            {
                if (strUrl != "")
                {
                    sb.Append("<button style=\"width:" + w + "px;height:" + h + "px;background:transparent;border:0;padding:0;cursor:hand\" onclick=\"window.open('" + strUrl + "','','')\">");
                }
                sb.Append("  <object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='" + w + "' height='" + h + "'>  ");
                sb.Append("<param name='movie' value='" + flvpath + "' />  ");
                sb.Append("<param name='quality' value='high' />  ");
                sb.Append(" <param name='FlashVars' />  ");
                sb.Append("  <param name='wmode' value='transparent' />  ");
                sb.Append("</object>  ");
                if (strUrl != "")
                {
                    sb.Append("</button>");
                }
            }
            else if (ExtName == "flv")
            {

                //string sy1 = "";
                //string sy2 = "";
                //if (IsSy)
                //{
                //    sy2 = GetSyPic();
                //    if (sy2 != "")
                //    {
                //        sy1 = "  wmurl=" + sy2;
                //    }
                //}
                string no = Guid.NewGuid().ToString();
                //sb.Append("<div   id='player" + no + "-parent'>");
                //sb.Append("<div    ><script src='/fckeditor/editor/plugins/flvPlayer/swfobject.js' type='text/javascript'></script>");
                //sb.Append("<div  id='player" + no + "'><a href='http://www.macromedia.com/go/getflashplayer' target=_blank>下载Flash播放器</a> ");
                //sb.Append("<div  style='width: 0px; display: none; height: 0px; visibility: hidden; overflow: hidden' id='player" + no + "-config'>url=" + flvpath + "   " + sy1 + " width=" + w + " height=" + h + " loop=false play=false downloadable=false fullscreen=true displayNavigation=true displayDigits=true playlistThumbs=false</div>");
                //sb.Append("</div>");
                //sb.Append("<script type='text/javascript'>");
                //sb.Append("	var s1 = new SWFObject('/fckeditor/editor/plugins/flvPlayer/mediaplayer.swf','single','" + w + "','" + h + "','7');");
                //sb.Append("	s1.addVariable('width','" + w + "');");
                //sb.Append("	s1.addVariable('height','" + h + "');");
                //sb.Append("	s1.addVariable('autostart','false');");
                //sb.Append("	s1.addVariable('file','" + flvpath + "');");
                //sb.Append("	s1.addVariable('repeat','false');");
                //sb.Append("	s1.addVariable('image','');");
                //sb.Append("	s1.addVariable('showdownload','false');");
                //sb.Append("	s1.addVariable('link','" + flvpath + "');");
                //sb.Append("	s1.addParam('allowfullscreen','true');");
                //sb.Append("	s1.addVariable('showdigits','true');");
                //sb.Append("	s1.addVariable('shownavigation','true');");
                //sb.Append("	s1.addVariable('logo','" + sy2 + "');");
                //sb.Append("	s1.write('player" + no + "');");
                //sb.Append("</script></div>");
                //sb.Append("</div>");
                sb.Append("<object id='flvplayer" + no + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' name='flvplayer" + no + "' width='" + w + "' height='" + h + "' > ");
                sb.Append("<param name='movie' value='/images/flvplayer.swf'  /> ");
                sb.Append("<param name='allowfullscreen' value='true' /> ");
                sb.Append("<param name='allowscriptaccess' value='always' /> ");
                sb.Append("<param name='flashvars' width='" + w + "' height='" + h + "' value='file=" + flvpath + "&image=" + flvimg + "' autostart=false /> ");
                sb.Append("</object>");

            }
            return sb.ToString();

        }


        /// <summary>
        /// 取的水印
        /// </summary>
        /// <returns></returns>
        public static string GetSyPic()
        {
            DataSet ds = DBTools.GetList("select top 1 * from Ebs_BaseInfo ");
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["SyPic"].ToString();

            }
            return "";

        }

//        /// <summary>
//        /// 初始化服务类型下拉框
//        /// </summary>
//        /// <param name="ddlList">DropDownList</param>
//        public static void GetSrvTypeDropDownList(DropDownList ddl)
//        {
//            SfSoft.BLL.Ebs_OnlineSrvType bll = new Ebs_OnlineSrvType();
//            string strWhere = "    ";
//            DataTable dtNodeSets = bll.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            foreach (DataRow dr in dtNodeSets.Rows)
//            {
//                li = new ListItem();
//                li.Text = dr["SrvTypeName"].ToString();
//                li.Value = dr["SrvType"].ToString();
//                ddl.Items.Add(li);
//            }
//        }
//        /// <summary>
//        /// 初始化送货方式下拉框
//        /// </summary>
//        /// <param name="ddlList">DropDownList</param>
//        public static void GetSendModeDropDownList(DropDownList ddl)
//        {
//            SfSoft.BLL.Ebs_SendMode bllsm = new Ebs_SendMode();
//            string strWhere = "   IsAct='1'";
//            DataTable dtNodeSets = bllsm.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            li.Text = "--未选择--";
//            li.Value = "--";
//            ddl.Items.Add(li);
//            foreach (DataRow dr in dtNodeSets.Rows)
//            {
//                li = new ListItem();
//                li.Text = dr["SendModeName"].ToString();
//                li.Value = dr["ID"].ToString();
//                ddl.Items.Add(li);
//            }
//        }

//        /// <summary>
//        /// 初始化客户级别下拉
//        /// </summary>
//        /// <param name="ddlList">DropDownList</param>
//        public static void GetLevleDropDownList(DropDownList ddl)
//        {
//            SfSoft.BLL.Ebs_Customer_Level bllsm = new Ebs_Customer_Level();
//            string strWhere = " 1=1  order by LevelID";
//            DataTable dtNodeSets = bllsm.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            li.Text = "--未选择--";
//            li.Value = "--";
//            ddl.Items.Add(li);
//            foreach (DataRow dr in dtNodeSets.Rows)
//            {
//                li = new ListItem();
//                li.Text = dr["LevelName"].ToString();
//                li.Value = dr["LevelID"].ToString();
//                ddl.Items.Add(li);
//            }
//        }
//        /// <summary>
//        /// 初始化付款方式下拉框
//        /// </summary>
//        /// <param name="ddlList">DropDownList</param>
//        public static void GetPaymentModeDropDownList(DropDownList ddl)
//        {
//            SfSoft.BLL.Ebs_PaymentMode bllpm = new Ebs_PaymentMode();
//            string strWhere = "   IsAct='1'";
//            DataTable dtNodeSets = bllpm.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            li.Text = "--未选择--";
//            li.Value = "--";
//            ddl.Items.Add(li);
//            foreach (DataRow dr in dtNodeSets.Rows)
//            {
//                li = new ListItem();
//                li.Text = dr["PaymentModeName"].ToString();
//                li.Value = dr["ID"].ToString();
//                ddl.Items.Add(li);
//            }
//        }
//        /// <summary>
//        /// 初始化付款方式选择框
//        /// </summary>
//        /// <param name="rbllist">RadioButtonList</param>
//        public static void GetPaymentModeDropDownList(RadioButtonList rbllist)
//        {
//            SfSoft.BLL.Ebs_PaymentMode bllpm = new Ebs_PaymentMode();
//            string strWhere = "   IsAct='1' order by OrderID";
//            DataTable dtNodeSets = bllpm.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            int i = 0;
//            if (dtNodeSets.Rows.Count > 0)
//            {
//                foreach (DataRow dr in dtNodeSets.Rows)
//                {
//                    li = new ListItem();
//                    if (i == 0)
//                    {
//                        li.Selected = true;
//                    }
//                    li.Text = dr["PaymentModeName"].ToString() + "(" + dr["PaymentModeDesc"].ToString() + ")";
//                    li.Value = dr["ID"].ToString();
//                    rbllist.Items.Add(li);
//                    i += 1;
//                }
//            }
//        }
//        /// <summary>
//        /// 初始化付款接口选择框
//        /// </summary>
//        /// <param name="ddllist">DropDownList</param>
//        public static void GetPaySrvDropDownList(DropDownList ddllist)
//        {
//            SfSoft.BLL.Ebs_PaySrv bllpm = new Ebs_PaySrv();
//            string strWhere = "  1=1 ";
//            DataTable dtNodeSets = bllpm.GetList(strWhere).Tables[0];

//            ListItem li = new ListItem();
//            li.Text = "--未选择--";
//            li.Value = "--";
//            ddllist.Items.Add(li);
//            if (dtNodeSets.Rows.Count > 0)
//            {
//                foreach (DataRow dr in dtNodeSets.Rows)
//                {
//                    li = new ListItem();

//                    li.Text = dr["PaySrvName"].ToString();
//                    li.Value = dr["ID"].ToString();
//                    ddllist.Items.Add(li);

//                }
//            }
//        }
//        /// <summary>
//        /// 初始化送货方式选择框
//        /// </summary>
//        /// <param name="rbllist">RadioButtonList</param>
//        public static void GetSendModeDropDownList(RadioButtonList rbllist)
//        {
//            SfSoft.BLL.Ebs_SendMode bllpm = new Ebs_SendMode();
//            string strWhere = "   IsAct='1' order by OrderID";
//            DataTable dtNodeSets = bllpm.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            int i = 0;
//            if (dtNodeSets.Rows.Count > 0)
//            {
//                foreach (DataRow dr in dtNodeSets.Rows)
//                {
//                    li = new ListItem();
//                    if (i == 0)
//                    {
//                        li.Selected = true;
//                    }
//                    li.Text = dr["SendModeName"].ToString() + "(" + dr["SendModeDesc"].ToString() + ")";
//                    li.Value = dr["ID"].ToString();
//                    rbllist.Items.Add(li);
//                    i += 1;
//                }
//            }
//        }

//        /// <summary>
//        /// 根据送货方式ID，货款总金额，取的运费
//        /// </summary>
//        /// <param name="ID">送货方式ID</param>
//        /// <param name="TotalAmt">货款总金额</param>
//        /// <returns></returns>
//        public static decimal GetSendModePrice(string ID, decimal TotalAmt)
//        {
//            if (ID == "")
//            {
//                return 0;
//            }
//            decimal price = 0;

//            SfSoft.BLL.Ebs_SendMode bll = new Ebs_SendMode();
//            SfSoft.Model.Ebs_SendMode model = bll.GetModel(int.Parse(ID));
//            if (model != null)
//            {
//                if (model.Price == null)
//                {
//                    model.Price = 0;
//                }
//                if (model.FreePrice == null)
//                {
//                    model.FreePrice = 0;
//                }
//                decimal Price = (decimal)model.Price;
//                decimal FreePrice = (decimal)model.FreePrice;
//                if (TotalAmt >= FreePrice)
//                {
//                    price = 0;
//                }
//                else
//                {
//                    price = Price;
//                }
//            }
//            return price;

//        }
//        /// <summary>
//        /// 根据付款方式ID，货款总金额，取的付款手续费
//        /// </summary>
//        /// <param name="ID">送货方式ID</param>
//        /// <param name="TotalAmt">货款总金额</param>
//        /// <returns></returns>
//        public static decimal GetPaymentModePrice(string ID, decimal TotalAmt)
//        {
//            if (ID == "")
//            {
//                return 0;
//            }
//            decimal price = 0;

//            SfSoft.BLL.Ebs_PaymentMode bll = new Ebs_PaymentMode();
//            SfSoft.Model.Ebs_PaymentMode model = bll.GetModel(int.Parse(ID));
//            if (model != null)
//            {
//                if (model.Price == null)
//                {
//                    model.Price = 0;
//                }
//                if (model.FreePrice == null)
//                {
//                    model.FreePrice = 0;
//                }
//                decimal Price = (decimal)model.Price;
//                decimal FreePrice = (decimal)model.FreePrice;
//                if (TotalAmt >= FreePrice)
//                {
//                    price = 0;
//                }
//                else
//                {
//                    price = TotalAmt * (Price / 100);
//                }
//            }
//            return price;

//        }
//        /// <summary>
//        /// 初始化银行帐号下拉框
//        /// </summary>
//        /// <param name="ddlList">DropDownList</param>
//        public static void GetBankAccountDropDownList(DropDownList ddl)
//        {
//            SfSoft.BLL.Ebs_Bank_Account bllpm = new Ebs_Bank_Account();
//            string strWhere = "   IsAct='1'";
//            DataTable dtNodeSets = bllpm.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            li.Text = "--未选择--";
//            li.Value = "--";
//            ddl.Items.Add(li);
//            foreach (DataRow dr in dtNodeSets.Rows)
//            {
//                li = new ListItem();
//                li.Text = dr["BankName"].ToString();
//                li.Value = dr["AccountID"].ToString();
//                ddl.Items.Add(li);
//            }
//        }
//        /// <summary>
//        /// 初始化银行帐号+卡号下拉框
//        /// </summary>
//        /// <param name="ddlList">DropDownList</param>
//        public static void GetBankAccountIDDropDownList(DropDownList ddl)
//        {
//            SfSoft.BLL.Ebs_Bank_Account bllpm = new Ebs_Bank_Account();
//            string strWhere = "   IsAct='1'";
//            DataTable dtNodeSets = bllpm.GetList(strWhere).Tables[0];
//            ListItem li = new ListItem();
//            li.Text = "--未选择--";
//            li.Value = "--";
//            ddl.Items.Add(li);
//            foreach (DataRow dr in dtNodeSets.Rows)
//            {
//                li = new ListItem();
//                li.Text = dr["BankName"].ToString() + "|" + dr["AccountID"].ToString();
//                li.Value = dr["AccountID"].ToString();
//                ddl.Items.Add(li);
//            }
//        }
//        /// <summary>
//        /// 初始化快递公司下拉框
//        /// </summary>
//        /// <param name="ddlList">DropDownList</param>
//        public static void GetExpressCompanyDropDownList(DropDownList ddl)
//        {

//            DataTable dtNodeSets = GetExpressComListData("");
//            ListItem li = new ListItem();
//            li.Text = "--未选择--";
//            li.Value = "--";
//            ddl.Items.Add(li);
//            foreach (DataRow dr in dtNodeSets.Rows)
//            {
//                li = new ListItem();
//                li.Text = dr["MCompanyName"].ToString();
//                li.Value = dr["ID"].ToString();
//                ddl.Items.Add(li);
//            }
//        }

//        public static DataTable GetCustomerListData(string text)
//        {
//            SfSoft.BLL.Ebs_Customer bll = new SfSoft.BLL.Ebs_Customer();
//            string strWhere = "  CustomerType ='0'  ";
//            if (text != "")
//            {
//                strWhere += " and ( MUserName LIKE '" + text + "%' or Consignee  LIKE '" + text + "%' or MCompanyName LIKE '" + text + "%' or   NamePinyin LIKE '" + text + "%'  ) ";
//            }
//            strWhere += " order by Consignee";
//            DataSet ds = bll.GetList(strWhere);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }
//        public static DataTable GetSupplierListData(string text)
//        {
//            SfSoft.BLL.Ebs_Customer bll = new SfSoft.BLL.Ebs_Customer();
//            string strWhere = "  CustomerType ='1'  ";
//            if (text != "")
//            {
//                strWhere += " and ( MUserName LIKE '" + text + "%' or Consignee  LIKE '" + text + "%' or MCompanyName LIKE '" + text + "%' or   NamePinyin LIKE '" + text + "%' ) ";
//            }
//            strWhere += " order by Consignee";
//            DataSet ds = bll.GetList(strWhere);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }
//        public static DataTable GetExpressComListData(string text)
//        {
//            SfSoft.BLL.Ebs_Customer bll = new SfSoft.BLL.Ebs_Customer();
//            string strWhere = "  CustomerType ='5'  ";
//            if (text != "")
//            {
//                strWhere += " and ( MCompanyName LIKE '" + text + "%' or   NamePinyin LIKE '" + text + "%' ) ";
//            }
//            strWhere += " order by MCompanyName";
//            DataSet ds = bll.GetList(strWhere);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }

//        public static DataTable GetProductListData(string text)
//        {
//            SfSoft.BLL.Ebs_Product bll = new SfSoft.BLL.Ebs_Product();
//            string strWhere = "  1=1  ";
//            if (text != "")
//            {
//                strWhere += " and ( ProNo LIKE '" + text + "%' or ProName  LIKE '" + text + "%'  ) ";
//            }
//            strWhere += " order by ProName";
//            DataSet ds = bll.GetList(strWhere);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }
//        public static DataTable GetBaseProductListData(string text)
//        {
//            SfSoft.BLL.IOStock_BaseProduct bll = new SfSoft.BLL.IOStock_BaseProduct();
//            string strWhere = "  Status='1'  ";
//            if (text != "")
//            {
//                strWhere += " and ( ProNo LIKE '" + text + "%' or ProName  LIKE '" + text + "%'  or NamePinyin  LIKE '" + text + "%'  or BarCode  LIKE '" + text + "%') ";
//            }
//            strWhere += " order by ProName";
//            DataSet ds = bll.GetList(strWhere);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }

//        public static DataTable GetProductListDataFromStock(string text, string whid)
//        {

//            string sql = " select a.Qty,a.CostPrice,b.* from IOStock_Stock as a   left join IOStock_BaseProduct as b on a.ProID=b.ID  where   a. WarehouseID ='" + whid + "' ";
//            if (text != "")
//            {
//                sql += " and ( b.ProNo LIKE '" + text + "%' or b.ProName  LIKE '" + text + "%'  or b. NamePinyin  LIKE '" + text + "%'  or b.BarCode  LIKE '" + text + "%') ";
//            }
//            sql += " order by b.ProName";
//            DataSet ds = DBTools.GetList(sql);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }

//        public static DataTable GetPhOrderListData(string text, string strWhere)
//        {
//            SfSoft.BLL.IOStock_PhOrder bll = new SfSoft.BLL.IOStock_PhOrder();
//            string sql = "select  *  from IOStock_PhOrder   ";
//            string strWhere1 = " where 1=1  ";
//            if (strWhere != "")
//            {
//                strWhere1 += strWhere;
//            }
//            if (text != "")
//            {
//                strWhere1 += " and (  PhNo LIKE '" + text + "%' ) ";
//            }
//            strWhere += " order by  PhNo";
//            DataSet ds = DBTools.GetList(sql + strWhere1);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }
//        public static DataTable GetOrderListData(string text, string strWhere)
//        {
//            SfSoft.BLL.Ebs_Orders bll = new SfSoft.BLL.Ebs_Orders();
//            string sql = "select a.*,b.MUserName from Ebs_Orders as a left join Ebs_Customer as b on a.CustomerID=b.ID ";
//            string strWhere1 = " where 1=1  ";
//            if (strWhere != "")
//            {
//                strWhere1 += strWhere;
//            }
//            if (text != "")
//            {
//                strWhere1 += " and ( a.OrderNo LIKE '" + text + "%' ) ";
//            }
//            strWhere += " order by a.OrderNo";
//            DataSet ds = DBTools.GetList(sql + strWhere1);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }

//        public static DataTable GetOrderProListData(string text, string strWhere)
//        {
//            SfSoft.BLL.Ebs_Orders bll = new SfSoft.BLL.Ebs_Orders();
//            string sql = @"select a.*,b.RefValue as OutStatusName from Ebs_Orders_List as a left join 
//(select RefValueCode,RefValue from Pub_BaseData where RefObj='ebs.OutStatus') as b on a.OutStatus=b.RefValueCode ";
//            string strWhere1 = " where 1=1  ";
//            if (strWhere != "")
//            {
//                strWhere1 += strWhere;
//            }
//            if (text != "")
//            {
//                strWhere1 += " and ( a.ProNo LIKE '" + text + "%' or a.ProName  LIKE '" + text + "%'  ) ";
//            }
//            strWhere += " order by a.ID ";
//            DataSet ds = DBTools.GetList(sql + strWhere1);
//            DataTable dtNodeSets = ds.Tables[0];
//            return dtNodeSets;
//        }
//        /// <summary>
//        /// 更新客户积分或级别
//        /// </summary>
//        /// <param name="points">增加的积分</param>
//        /// <param name="TradingType">交易类型</param>
//        /// <param name="OperateType">操作类型</param>
//        /// <param name="customerid">客户ID</param>
//        /// <param name="IsAndLevel">是否同时更新级别</param>
//        public static void UpdateCustomerPoints(string points, string customerid, string TradingType, string OperateType, bool IsAndLevel)
//        {
//            if (customerid == "" || points == "")
//            {
//                return;
//            }
//            int points1 = int.Parse(points);
//            if (TradingType == "2" || OperateType == "cancel")
//            {
//                points1 = -points1;
//            }
//            SfSoft.BLL.Ebs_Customer bllC = new Ebs_Customer();
//            SfSoft.Model.Ebs_Customer modelC = bllC.GetModel(int.Parse(customerid));
//            if (modelC != null)
//            {
//                modelC.Points += points1;
//                if (IsAndLevel)
//                {
//                    Hashtable hash = GetCustomerLevel(modelC.Level.ToString(), (int)modelC.Points);
//                    if (hash != null)
//                    {
//                        modelC.Level = PageValidate.StringToInt(hash["LevelID"].ToString());
//                        modelC.LevelName = hash["LevelName"].ToString();
//                    }
//                }
//                bllC.Update(modelC);
//            }
//        }

//        /// <summary>
//        /// 更新用户级别
//        /// </summary>
//        /// <param name="points">客户总积分</param>
//        /// <param name="customerid"></param>
//        public static void UpdateCustomerLevel(string points, string customerid)
//        {
//            if (points == "")
//            {
//                points = "0";
//            }

//            SfSoft.BLL.Ebs_Customer bllC = new Ebs_Customer();
//            SfSoft.Model.Ebs_Customer modelC = bllC.GetModel(int.Parse(customerid));
//            if (modelC != null)
//            {

//                Hashtable hash = GetCustomerLevel(modelC.Level.ToString(), (int)modelC.Points);
//                if (hash != null)
//                {
//                    modelC.Level = PageValidate.StringToInt(hash["LevelID"].ToString());
//                    modelC.LevelName = hash["LevelName"].ToString();
//                }
//                bllC.Update(modelC);
//            }
//        }

//        public static Hashtable GetCustomerLevel(string LevelID, int Points)
//        {
//            Hashtable hash = new Hashtable();
//            if (LevelID == "")
//            {
//                LevelID = "0";
//            }
//            DataSet ds = DBTools.GetList("select * from Ebs_Customer_Level order by LevelID");
//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                //判断用户当前级别是否还可以升级
//                DataRow[] arrDr = ds.Tables[0].Select("LevelID=" + LevelID);
//                if (arrDr.Length > 0)
//                {
//                    if (arrDr[0]["IsUpGrade"].ToString() == "0") //客户当前级，不能升级
//                    {
//                        return null;
//                    }
//                }

//                //可以升级

//                DataRow[] arrDr1 = ds.Tables[0].Select("LevelID>" + LevelID);
//                if (arrDr1.Length > 0) //还有更高级别
//                {
//                    DataRow[] arrDr2 = ds.Tables[0].Select("LowerLimit <=" + Points.ToString() + " and LevelID>" + LevelID);
//                    if (arrDr2.Length > 0)
//                    {
//                        hash.Add("LevelID", arrDr2[0]["LevelID"].ToString());
//                        hash.Add("LevelName", arrDr2[0]["LevelName"].ToString());
//                        return hash;
//                    }
//                    else
//                    {
//                        return null;
//                    }
//                }
//                else
//                {
//                    return null;
//                }

//            }
//            else
//            {
//                return null;
//            }
//        }
//        /// <summary>
//        /// 修改采购订单状态
//        /// </summary>
//        /// <param name="OrderNo">订单号</param>
//        /// <param name="RemitAmt">交易金额</param>

//        /// <param name="OperateType">操作类型，confirm确认，cancel取消</param> 
//        /// <param name="IsUpdateRecStatus">是否更新订单状态</param>
//        public static void UpdatePhOrderPayedAmtOrRecStatus(string OrderNo, decimal RemitAmt, string OperateType, bool IsUpdateRecStatus)
//        {
//            if (OrderNo == "")
//            {
//                return;
//            }
//            if (OperateType.ToLower() == "cancel")
//            {
//                RemitAmt = -RemitAmt;
//            }
//            SfSoft.BLL.IOStock_PhOrder bllO = new SfSoft.BLL.IOStock_PhOrder();
//            SfSoft.Model.IOStock_PhOrder modelO = bllO.GetModelByPhNo(OrderNo);
//            if (modelO != null)
//            {

//                modelO.PayedAmt = modelO.PayedAmt + RemitAmt;//订单已付款增加

//                if (IsUpdateRecStatus)
//                {
//                    if (modelO.PayedAmt >= modelO.TotalAmt)
//                    {
//                        modelO.RecStatus = "3";//已结清
//                    }
//                    else
//                    {
//                        modelO.RecStatus = "5";//未结清
//                    }

//                    bllO.Update(modelO);
//                }
//            }
//        }



//        /// <summary>
//        /// 修改订单状态
//        /// </summary>
//        /// <param name="OrderNo">订单号</param>
//        /// <param name="RemitAmt">交易金额</param>
//        /// <param name="TradingType">业务类型</param>
//        /// <param name="OperateType">操作类型，confirm确认，cancel取消</param> 
//        /// <param name="IsUpdateRecStatus">是否更新订单状态</param>
//        public static void UpdateOrderPayedAmtOrRecStatus(string OrderNo, decimal RemitAmt, string TradingType, string OperateType, bool IsUpdateRecStatus)
//        {
//            if (OrderNo == "")
//            {
//                return;
//            }
//            if (OperateType.ToLower() == "cancel")
//            {
//                RemitAmt = -RemitAmt;
//            }
//            SfSoft.BLL.Ebs_Orders bllO = new SfSoft.BLL.Ebs_Orders();
//            SfSoft.Model.Ebs_Orders modelO = bllO.GetModelByNo(OrderNo);
//            if (modelO != null)
//            {
//                if (TradingType == "1") //收款
//                {
//                    modelO.PayedAmt = modelO.PayedAmt + RemitAmt;//订单已付款增加
//                }
//                else if (TradingType == "2") //退款
//                {
//                    modelO.PayedAmt = modelO.PayedAmt - RemitAmt;//订单已付款减少
//                }
//                if (IsUpdateRecStatus)
//                {
//                    if (modelO.PayedAmt >= modelO.TotalAmt)
//                    {
//                        modelO.RecStatus = "3";//已结清
//                    }
//                    else
//                    {
//                        modelO.RecStatus = "5";//未结清
//                    }

//                    bllO.Update(modelO);
//                }
//            }
//        }

//        /// <summary>
//        /// 更新订单发送明细数量或明细状态，或订单状态，或物流状态 ,返回值如果为空没有意外，如果为-1不处理，如果为其它则提示信息
//        /// </summary>
//        /// <param name="OrderID">订单ID</param>
//        /// <param name="SendID">发货单ID</param>
//        /// <param name="SendTypeID">类型，S 发货，R 退货 </param>
//        /// <param name="OperateType">操作类型，confirm 签收，cancel 取消</param>
//        /// <param name="IsUpdateOrderStatus">是否更新订单状态和物流状态</param>
//        /// <param name="IsUpdateOrderListStatus">更新订单明细状态</param>
//        public static string UpdateOrderSendInfo(string OrderID, string SendID, string SendTypeID, string OperateType, bool IsUpdateOrderStatus, bool IsUpdateOrderListStatus)
//        {
//            string msg = "";
//            if (OrderID == "" || SendID == "")
//            {
//                return "数据出错！";
//            }
//            SfSoft.BLL.Ebs_Orders bllO = new Ebs_Orders();
//            SfSoft.BLL.Ebs_Orders_List bllOL = new Ebs_Orders_List();
//            SfSoft.Model.Ebs_Orders modelO = bllO.GetModel(int.Parse(OrderID));
//            string strWhereO = " ";
//            if (SendTypeID == "S" && OperateType != "cancel") //发货
//            {
//                strWhereO = " and (OutStatus='1' or OutStatus='3') ";
//            }
//            else if (SendTypeID == "R" && OperateType != "cancel")
//            {
//                strWhereO = " and (OutStatus='3' or OutStatus='5') ";
//            }
//            DataSet dsol = bllOL.GetList(" OrderID='" + OrderID + "'" + strWhereO);//订单明细
//            SfSoft.BLL.Ebs_SendGoods_List bllSGL = new Ebs_SendGoods_List();
//            DataSet dssgl = bllSGL.GetList(" SendID='" + SendID + "'");//送货明细
//            int ck = 1; //判断是加还是减
//            if (OperateType == "cancel") //取消
//            {
//                ck = -1;
//            }
//            if (SendTypeID == "S")
//            {
//                #region 1.处理发货
//                //如果是发货，需要验证订单明细产品数量能不能满足发货要求
//                foreach (DataRow dr in dssgl.Tables[0].Rows)
//                {
//                    string OrderListID = "";//订单明细ID
//                    decimal OutNum = decimal.Parse(dr["Num"].ToString()) * ck;
//                    string ProNo = dr["ProNo"].ToString();
//                    DataRow[] arrDr = dsol.Tables[0].Select(" ProNo='" + ProNo + "'");
//                    if (arrDr.Length > 0) //订单中存当前产品
//                    {
//                        decimal LeaveNum = decimal.Parse(arrDr[0]["LeaveNum"].ToString());//订单未发货数量
//                        if (OutNum > LeaveNum && OperateType == "confirm") //只有在签收时才需要判断
//                        {
//                            msg = "产品：" + dr["ProNo"].ToString() + "[" + ProNo + "]，在订单中剩余数量：" + LeaveNum.ToString() + "，不能满足发货数量：" + OutNum.ToString() + "！";
//                            return msg;
//                        }
//                        else //修改订单明细剩余数量
//                        {
//                            OrderListID = arrDr[0]["ID"].ToString();
//                            SfSoft.Model.Ebs_Orders_List modelOL = bllOL.GetModel(int.Parse(OrderListID));
//                            if (modelOL != null)
//                            {
//                                modelOL.SendNum = modelOL.SendNum + OutNum;
//                                modelOL.LeaveNum = modelOL.LeaveNum - OutNum;
//                                if (IsUpdateOrderListStatus)
//                                {
//                                    if (modelOL.LeaveNum <= 0)
//                                    {
//                                        modelOL.OutStatus = "5";
//                                    }
//                                    else
//                                    {
//                                        modelOL.OutStatus = "3";
//                                    }
//                                }
//                                bllOL.Update(modelOL);
//                            }
//                        }
//                    }
//                    else
//                    {
//                        msg = "产品：" + dr["ProNo"].ToString() + "[" + ProNo + "]，在订单中已发货完成或撤消！";
//                        return msg;
//                    }
//                }

//                #endregion
//            }
//            else if (SendTypeID == "R")
//            {
//                #region 2.退货处理
//                foreach (DataRow dr in dssgl.Tables[0].Rows)
//                {
//                    string OrderListID = "";//订单明细ID
//                    decimal OutNum = decimal.Parse(dr["Num"].ToString()) * ck;
//                    string ProNo = dr["ProNo"].ToString();
//                    DataRow[] arrDr = dsol.Tables[0].Select(" ProNo='" + ProNo + "'");
//                    if (arrDr.Length > 0) //订单中存当前产品
//                    {
//                        decimal SendNum = decimal.Parse(arrDr[0]["SendNum"].ToString());//订单未发货数量
//                        if (OutNum > SendNum && OperateType == "confirm")
//                        {
//                            msg = "产品：" + dr["ProNo"].ToString() + "[" + ProNo + "]，在订单中出货数量：" + SendNum.ToString() + "，小于退货数量：" + OutNum.ToString() + "！";
//                            return msg;
//                        }
//                        else //修改订单明细剩余数量
//                        {
//                            OrderListID = arrDr[0]["ID"].ToString();
//                            SfSoft.Model.Ebs_Orders_List modelOL = bllOL.GetModel(int.Parse(OrderListID));
//                            if (modelOL != null)
//                            {
//                                modelOL.SendNum = modelOL.SendNum - OutNum;
//                                modelOL.LeaveNum = modelOL.LeaveNum + OutNum;

//                                if (IsUpdateOrderListStatus)
//                                {
//                                    if (modelOL.SendNum <= 0)
//                                    {
//                                        modelOL.OutStatus = "1";
//                                    }
//                                    else
//                                    {
//                                        modelOL.OutStatus = "3";
//                                    }
//                                }
//                                bllOL.Update(modelOL);
//                            }
//                        }
//                    }
//                    else
//                    {
//                        msg = "产品：" + dr["ProNo"].ToString() + "[" + ProNo + "]，在订单中不存在或撤消！";
//                        return msg;
//                    }
//                }

//                #endregion
//            }

//            if (IsUpdateOrderStatus) //更新订单主状态及物流状态
//            {
//                string OrderStatus = "";
//                string SendStatus = "";
//                DataSet ds = DBTools.GetList("select * from Ebs_Orders_List where OrderID='" + OrderID + "'  ");
//                DataRow[] arrDr1 = ds.Tables[0].Select(" (OutStatus='1' or OutStatus='3' )");

//                if (arrDr1.Length == 0) //明细已执行完成，付款完成，那么订单完成
//                {
//                    if (modelO.RecStatus == "3")
//                    {
//                        OrderStatus = "9";
//                    }
//                    SendStatus = "3";
//                }
//                else
//                {
//                    DataRow[] arrDr2 = ds.Tables[0].Select(" (OutStatus='3' or OutStatus='5' )");//明细部份执行完成
//                    if (arrDr2.Length > 0)
//                    {
//                        SendStatus = "5";
//                    }

//                }

//                if (OrderStatus != "")
//                {
//                    modelO.Status = OrderStatus;
//                }
//                if (SendStatus != "")
//                {
//                    modelO.SendStatus = SendStatus;
//                }
//                if (OrderStatus != "" || SendStatus != "")
//                {
//                    bllO.Update(modelO);
//                }
//            }

//            return msg;
//        }


//        /// <summary>
//        /// 取的系统编码
//        /// </summary>
//        /// <param name="Flag"></param>
//        /// <returns></returns>
//        public static string GetDocNoByFlag(string Flag)
//        {
//            return DbHelperSQL.GetMaxIdByRuleId(Flag);
//        }

//        /// <summary>
//        /// 页面显示字符串的截取
//        /// </summary>
//        /// <param name="o"></param>
//        /// <returns></returns>
//        public static string BindSubstring(object o)
//        {
//            string str = "";
//            if (o == null)
//            {
//                return "";
//            }
//            if (o.ToString().Length > 30)
//            {
//                str = o.ToString().Trim();
//                str = str.Substring(0, 30) + "...";
//            }
//            else
//            {
//                str = o.ToString();
//            }
//            return str;
//        }
//        public static string GetStatusMessage(int offset, int total)
//        {
//            if (total <= 0)
//                return "没有数据";

//            return String.Format("选项： <b>1</b>-<b>{0}</b> 共计：<b>{1}</b>个", offset, total);
//        }


//        /// <summary>
//        /// 根据信息ID 取的一条信息
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns></returns>
//        public static SfSoft.Model.Ebs_Info GetInfoModelByID(string ID)
//        {
//            SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//            SfSoft.Model.Ebs_Info model = bll.GetModel(int.Parse(ID));
//            return model;
//        }

//        /// <summary>
//        /// 获得信息前几行数据
//        /// </summary>
//        public static DataSet GetInfoList(int Top, string strWhere, string filedOrder)
//        {
//            SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//            return bll.GetList(Top, strWhere, filedOrder);
//        }
//        /// <summary>
//        ///  根据ID 取的一个栏目名称,不取标题名
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns></returns>
//        public static string GetInfoCatNameByCatID(string ID)
//        {
//            SfSoft.Model.Ebs_InfoCat model = GetCatModelByID(ID);
//            if (model != null)
//            {

//                return model.InfoCatName;

//            }
//            else
//            {
//                return "";
//            }
//        }
//        /// <summary>
//        ///  根据ID 取的一个栏目名称
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns></returns>
//        public static string GetCatNameByCatID(string ID)
//        {
//            SfSoft.Model.Ebs_InfoCat model = GetCatModelByID(ID);
//            if (model != null)
//            {
//                string Topic = model.InfoCatTopic;
//                if (Topic == "")
//                {
//                    return model.InfoCatName;
//                }
//                else
//                {
//                    return Topic;
//                }
//            }
//            else
//            {
//                return "";
//            }
//        }
//        /// <summary>
//        ///  根据ID及字段名 取的一个信息分类任意字段值
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns></returns>
//        public static string GetCatFieldValueByCatID(string ID, string FiledName)
//        {
//            DataSet ds = DBTools.GetList("select * from Ebs_InfoCat where ID='" + ID + "'");
//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                return ds.Tables[0].Rows[0][FiledName].ToString();
//            }
//            else
//            {
//                return "";
//            }
//        }

//        /// <summary>
//        ///  根据ID 取的一个栏目名称
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns></returns>
//        public static string GetPathCatNameByCatID(string ID)
//        {
//            SfSoft.Model.Ebs_InfoCat model = GetCatModelByID(ID);

//            string CatName = "";
//            string PCatName = "";
//            if (model != null)
//            {
//                SfSoft.BLL.Ebs_InfoCat bllic = new SfSoft.BLL.Ebs_InfoCat();
//                if (model.PID != 0)
//                {
//                    DataSet ds = bllic.GetList(1, "ID=" + model.PID.ToString(), " OrderID");
//                    if (ds.Tables[0].Rows.Count > 0)
//                    {
//                        PCatName = ds.Tables[0].Rows[0]["InfoCatName"].ToString();
//                        CatName = PCatName + " >> ";
//                    }

//                }
//                CatName += model.InfoCatName;
//                return CatName;
//            }
//            else
//            {
//                return "";
//            }
//        }

//        /// <summary>
//        /// 根据栏目ID 取的一条目
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns></returns>
//        public static SfSoft.Model.Ebs_InfoCat GetCatModelByID(string ID)
//        {
//            SfSoft.BLL.Ebs_InfoCat bll = new SfSoft.BLL.Ebs_InfoCat();
//            SfSoft.Model.Ebs_InfoCat model = bll.GetModel(int.Parse(ID));
//            return model;
//        }


//        /// <summary>
//        /// 根据信息ID 取的一个标题和内容
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns>hash Topic 主题， Details 内容， ctime 发布时间 ，FilePath 图片路径</returns>
//        public static Hashtable GetInfoByID(string ID)
//        {
//            SfSoft.Model.Ebs_Info model = GetInfoModelByID(ID);
//            Hashtable hash = new Hashtable();
//            if (model != null)
//            {
//                hash.Add("ID", model.ID);
//                hash.Add("MID", model.MID);
//                hash.Add("Topic", model.Topic);
//                hash.Add("InfoDetail", model.InfoDetail);
//                hash.Add("InfoDesc", model.InfoDesc);
//                hash.Add("InfoBigPic", model.InfoBigPic);
//                hash.Add("InfoSmallPic", model.InfoSmallPic);
//                hash.Add("mtime", model.mtime.ToString());
//                hash.Add("VideoType", model.VideoType);
//                hash.Add("ProVideo", model.ProVideo);
//                hash.Add("IsInfoFb", model.IsInfoFb);
//                hash.Add("DescShowType", model.DescShowType);


//            }
//            else
//            {
//                hash.Add("ID", "");
//                hash.Add("MID", "");
//                hash.Add("Topic", "");
//                hash.Add("InfoDetail", "");
//                hash.Add("InfoDesc", "");
//                hash.Add("InfoBigPic", "");
//                hash.Add("InfoSmallPic", "");
//                hash.Add("mtime", "");
//                hash.Add("VideoType", "");
//                hash.Add("ProVideo", "");
//                hash.Add("IsInfoFb", "");
//                hash.Add("DescShowType", "");
//                hash.Add("InfoCatBtDesc", "");
//            }
//            return hash;
//        }
//        /// <summary>
//        /// 新加的重载方法  由于信息管理表中同时有会员信息和栏目信息，单InfoID无法区分
//        /// </summary>
//        /// <param name="CatID"></param>
//        /// <param name="MID"></param>
//        /// <returns></returns>
//        public static Hashtable GetInfoByCatID(string CatID,string MID)
//        {
//            SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//            DataSet ds = bll.GetList(1, "InfoID='" + CatID + "' and MID='"+MID+"'", "  id desc");
//            Hashtable hash = new Hashtable();

//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                hash.Add("ID", ds.Tables[0].Rows[0]["ID"].ToString());
//                hash.Add("MID", ds.Tables[0].Rows[0]["MID"].ToString());
//                hash.Add("Topic", ds.Tables[0].Rows[0]["Topic"].ToString());
//                hash.Add("InfoDetail", ds.Tables[0].Rows[0]["InfoDetail"].ToString());
//                hash.Add("InfoDesc", ds.Tables[0].Rows[0]["InfoDesc"].ToString());
//                hash.Add("InfoSmallPic", ds.Tables[0].Rows[0]["InfoSmallPic"].ToString());
//                hash.Add("InfoBigPic", ds.Tables[0].Rows[0]["InfoBigPic"].ToString());
//                hash.Add("mtime", ds.Tables[0].Rows[0]["mtime"].ToString());
//                hash.Add("VideoType", ds.Tables[0].Rows[0]["VideoType"].ToString());
//                hash.Add("ProVideo", ds.Tables[0].Rows[0]["ProVideo"].ToString());
//                hash.Add("IsInfoFb", ds.Tables[0].Rows[0]["IsInfoFb"].ToString());
//                hash.Add("DescShowType", ds.Tables[0].Rows[0]["DescShowType"].ToString());


//            }
//            else
//            {
//                hash.Add("ID", "");
//                hash.Add("MID", "");
//                hash.Add("Topic", "");
//                hash.Add("InfoDetail", "");
//                hash.Add("InfoDesc", "");
//                hash.Add("InfoBigPic", "");
//                hash.Add("InfoSmallPic", "");
//                hash.Add("mtime", "");
//                hash.Add("VideoType", "");
//                hash.Add("ProVideo", "");
//                hash.Add("IsInfoFb", "");
//                hash.Add("DescShowType", "");

//            }
//            return hash;
//        }

//        /// <summary>
//        /// 根据栏目ID 取的一个标题和内容
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns>hash Topic 主题， Details 内容， mtime 发布时间，FilePath 图片路径</returns>
//        public static Hashtable GetInfoByCatID(string CatID)
//        {
//            SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//            DataSet ds = bll.GetList(1, "InfoID='" + CatID + "'", "  id desc");
//            Hashtable hash = new Hashtable();

//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                hash.Add("ID", ds.Tables[0].Rows[0]["ID"].ToString());
//                hash.Add("MID", ds.Tables[0].Rows[0]["MID"].ToString());
//                hash.Add("Topic", ds.Tables[0].Rows[0]["Topic"].ToString());
//                hash.Add("InfoDetail", ds.Tables[0].Rows[0]["InfoDetail"].ToString());
//                hash.Add("InfoDesc", ds.Tables[0].Rows[0]["InfoDesc"].ToString());
//                hash.Add("InfoSmallPic", ds.Tables[0].Rows[0]["InfoSmallPic"].ToString());
//                hash.Add("InfoBigPic", ds.Tables[0].Rows[0]["InfoBigPic"].ToString());
//                hash.Add("mtime", ds.Tables[0].Rows[0]["mtime"].ToString());
//                hash.Add("VideoType", ds.Tables[0].Rows[0]["VideoType"].ToString());
//                hash.Add("ProVideo", ds.Tables[0].Rows[0]["ProVideo"].ToString());
//                hash.Add("IsInfoFb", ds.Tables[0].Rows[0]["IsInfoFb"].ToString());
//                hash.Add("DescShowType", ds.Tables[0].Rows[0]["DescShowType"].ToString());


//            }
//            else
//            {
//                hash.Add("ID", "");
//                hash.Add("MID", "");
//                hash.Add("Topic", "");
//                hash.Add("InfoDetail", "");
//                hash.Add("InfoDesc", "");
//                hash.Add("InfoBigPic", "");
//                hash.Add("InfoSmallPic", "");
//                hash.Add("mtime", "");
//                hash.Add("VideoType", "");
//                hash.Add("ProVideo", "");
//                hash.Add("IsInfoFb", "");
//                hash.Add("DescShowType", "");

//            }
//            return hash;
//        }

//        /// <summary>
//        /// 根据当前栏目ID 取的主题,如果当前栏目没有主题取第一级主题 
//        /// </summary>
//        /// <param name="InfoMID">第一级ID</param>
//        /// <param name="InfoCatID">当前栏目ID</param>
//        /// <returns>  </returns>
//        public static string GetInfoTitleByCatID(string InfoMID, string InfoCatID, string w, string h, string style)
//        {
//            if (InfoCatID == "" && InfoMID != "")
//            {
//                InfoCatID = InfoMID;
//            }
//            SfSoft.BLL.Ebs_InfoCat bll = new SfSoft.BLL.Ebs_InfoCat();
//            DataSet ds = bll.GetList("ID='" + InfoCatID + "'");
//            string strTitle = "";
//            string strTitle1 = "";
//            string DescShowType = "";
//            string DocID = "";
//            string DescShowType1 = "";
//            string DocID1 = "";
//            string MID1 = "ebs.info.cat";

//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                strTitle = ds.Tables[0].Rows[0]["InfoCatDesc"].ToString();
//                DescShowType = ds.Tables[0].Rows[0]["DescShowType"].ToString();
//                DocID = ds.Tables[0].Rows[0]["ID"].ToString();
//                if (strTitle.Trim() == "" && InfoMID != InfoCatID)
//                {
//                    DataSet ds1 = bll.GetList("ID='" + InfoMID + "'");
//                    if (ds1.Tables[0].Rows.Count > 0)
//                    {
//                        strTitle1 = ds1.Tables[0].Rows[0]["InfoCatDesc"].ToString();
//                        DescShowType1 = ds1.Tables[0].Rows[0]["DescShowType"].ToString();
//                        DocID1 = ds1.Tables[0].Rows[0]["ID"].ToString();
//                    }
//                }
//            }

//            if (DescShowType == "detail") //详细
//            {
//                if (strTitle == "")
//                {
//                    strTitle = strTitle1;
//                }
//            }

//            else
//            {
//                strTitle = GetPicList(DescShowType, MID1, DocID, w, h, style, "");
//                if (strTitle == "")
//                {
//                    strTitle = GetPicList(DescShowType1, MID1, DocID1, w, h, style, "");
//                }
//            }
//            return strTitle;
//        }

//        public static string GetPicList(string DescShowType, string MID, string DocID, string w, string h, string styleslide, string stylealbum)
//        {
//            string picList = "";
//            DataSet dsPic = DBTools.GetList("select * from  Pub_AttFiles where MID='" + MID + "' and DocID='" + DocID + "' order by OrderID,ID");
//            StringBuilder strPic = new StringBuilder();
//            string filepath = "";
//            string filename = "";
//            string filedesc = "";

//            //取的图片
//            if (DescShowType == "slide") //幻灯片模式
//            {
//                int i = 1;
//                if (dsPic.Tables[0].Rows.Count > 0)
//                {
//                    strPic.Append("[");

//                    foreach (DataRow dr in dsPic.Tables[0].Rows)
//                    {
//                        filepath = dr["FilePath"].ToString();
//                        filedesc = dr["Remark"].ToString();
//                        strPic.Append("{title:\"" + filedesc + "\",img:\"" + filepath + "\",url:\"\"}");
//                        if (i < dsPic.Tables[0].Rows.Count)
//                        {
//                            strPic.Append(",");
//                        }
//                        i += 1;
//                        // strPic.Append("  <img src='" + filepath + "' width='" + w + "' height='" + h + "' alt='' title='" + filedesc + "'   />");
//                    }
//                    strPic.Append("]");
//                    picList = GetSlideInfo(strPic.ToString(), w, h);
//                }
//                //[{title:'',img:'',url:''},{title:'成都杜甫草堂，再现唐代茶韵',img:'/Files/Image/2009113010440129.jpg',url:'showtopic-28.aspx'},{title:'成都杜甫草堂，再现唐代茶韵',img:'/Files/Image/2009113010440129.jpg',url:'showtopic-28.aspx'},{title:'成都杜甫草堂，再现唐代茶韵',img:'/Files/Image/2009113010440129.jpg',url:'showtopic-28.aspx'},{title:'成都杜甫草堂，再现唐代茶韵',img:'/Files/Image/2009113010440129.jpg',url:'showtopic-28.aspx'}]


//            }
//            else if (DescShowType == "detail") //详细
//            {
//                SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//                SfSoft.Model.Ebs_Info model = bll.GetModel(int.Parse(DocID));
//                if (model != null)
//                {
//                    picList = model.InfoDetail;
//                }
//            }
//            else //像册模式
//            {
//                int i = 1;
//                foreach (DataRow dr in dsPic.Tables[0].Rows)
//                {
//                    filepath = dr["FilePath"].ToString();
//                    //filename = dr["FileName"].ToString();
//                    filedesc = dr["Remark"].ToString();
//                    strPic.Append(" <li>");
//                    strPic.Append(" <a href='" + filepath + "'>");
//                    strPic.Append("  <img src='" + filepath + "' width='75px' height='60px' title='" + filename + "' alt='" + filedesc + "' class='image" + i.ToString() + "'>");
//                    strPic.Append(" </a>");
//                    strPic.Append(" </li>");
//                    i += 1;
//                }

//                picList = GetAlbumInfo(strPic.ToString(), stylealbum);

//            }
//            return picList;
//        }

//        /// <summary>
//        /// 根据当前产品栏目ID 取的主题,如果当前栏目没有主题取第一级主题 
//        /// </summary>
//        /// <param name="ProMID">第一级ID</param>
//        /// <param name="ProCatID">当前栏目ID</param>
//        /// <returns>  </returns>
//        public static string GetProTitleByCatID(string ProMID, string ProCatID)
//        {
//            if (ProCatID == "" && ProMID != "")
//            {
//                ProCatID = ProMID;
//            }
//            SfSoft.BLL.Ebs_ProductCat bll = new SfSoft.BLL.Ebs_ProductCat();
//            DataSet ds = bll.GetList("ID='" + ProCatID + "'");
//            string strTitle = "";
//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                strTitle = ds.Tables[0].Rows[0]["ProCatDesc"].ToString();
//                if (strTitle.Trim() == "" && ProMID != ProCatID)
//                {
//                    DataSet ds1 = bll.GetList("ID='" + ProMID + "'");
//                    if (ds1.Tables[0].Rows.Count > 0)
//                    {
//                        strTitle = ds1.Tables[0].Rows[0]["ProCatDesc"].ToString();
//                    }
//                }
//            }
//            if (strTitle == "")
//            {
//                strTitle = SanbaoEbs.EbsCommon.GetInfoDetailByMID("ebs.ebase.ProPageDesc");
//            }
//            return strTitle;
//        }


//        /// <summary>
//        /// 根据当前栏目ID 取的页头,如果当前栏目没有页头取第一级页头，如果没有第一级，取默认页头。 
//        /// </summary>
//        /// <param name="InfoMID">第一级ID</param>
//        /// <param name="InfoCatID">当前栏目ID</param>
//        /// <param name="ProMID">第一级产品ID</param>
//        /// <param name="ProCatID">当前产品ID</param>
//        /// <param name="ProCatID">默认ID</param>
//        /// <returns>  </returns>
//        public static string GetPageHeadByCatID(string InfoMID, string InfoCatID, string ProMID, string ProCatID, string MID)
//        {
//            string strHead = "";
//            if (InfoCatID == "" && InfoMID != "")
//            {
//                InfoCatID = InfoMID;
//            }
//            if (InfoMID == "" && InfoCatID == "" && ProCatID == "" && ProMID == "")
//            {
//                return SanbaoEbs.EbsCommon.GetInfoDetailByMID("ebs.ebase.PageHead");
//            }
//            if (InfoMID != "") //信息栏目
//            {
//                SfSoft.BLL.Ebs_InfoCat bll = new SfSoft.BLL.Ebs_InfoCat();
//                DataSet ds = bll.GetList("ID='" + InfoCatID + "'");

//                if (ds.Tables[0].Rows.Count > 0)
//                {
//                    strHead = ds.Tables[0].Rows[0]["ProCatHead"].ToString();
//                    if (strHead.Trim() == "" && InfoMID != InfoCatID)
//                    {
//                        DataSet ds1 = bll.GetList("ID='" + InfoMID + "'");
//                        if (ds1.Tables[0].Rows.Count > 0)
//                        {
//                            strHead = ds1.Tables[0].Rows[0]["ProCatHead"].ToString();
//                        }
//                    }
//                }
//            }
//            else //如果信息为空，那么取商品
//            {
//                if (ProCatID == "" && ProMID != "")
//                {
//                    ProCatID = ProMID;
//                }

//                SfSoft.BLL.Ebs_ProductCat bll = new SfSoft.BLL.Ebs_ProductCat();
//                DataSet ds = bll.GetList("ID='" + ProCatID + "'");

//                if (ds.Tables[0].Rows.Count > 0)
//                {
//                    strHead = ds.Tables[0].Rows[0]["ProCatHead"].ToString();
//                    if (strHead.Trim() == "" && InfoMID != InfoCatID)
//                    {
//                        DataSet ds1 = bll.GetList("ID='" + InfoMID + "'");
//                        if (ds1.Tables[0].Rows.Count > 0)
//                        {
//                            strHead = ds1.Tables[0].Rows[0]["ProCatHead"].ToString();
//                        }
//                    }
//                }
//                if (strHead.Trim() == "")
//                {
//                    strHead = SanbaoEbs.EbsCommon.GetInfoDetailByMID("ebs.ebase.ProPageHead");
//                }
//            }

//            if (strHead.Trim() == "")
//            {
//                strHead = SanbaoEbs.EbsCommon.GetInfoDetailByMID("ebs.ebase.PageHead");
//            }

//            return strHead;
//        }

//        /// <summary>
//        /// 根据当前栏目ID 取的侧方广告,如果当前栏目没有取第一级，如果没有第一级，为空。 
//        /// </summary>
//        /// <param name="InfoCatID">当前栏目ID</param>
//        /// <returns>  </returns>
//        public static string GetPageInfoAdByCatID(string InfoCatID)
//        {
//            string strInfoCatAd = "";


//            if (InfoCatID != "") //信息栏目
//            {
//                SfSoft.BLL.Ebs_InfoCat bll = new SfSoft.BLL.Ebs_InfoCat();
//                DataSet ds = bll.GetList("ID='" + InfoCatID + "' and IsAct='1' ");

//                if (ds.Tables[0].Rows.Count > 0) //当前级
//                {
//                    strInfoCatAd = ds.Tables[0].Rows[0]["InfoCatAd"].ToString();
//                    string PID = ds.Tables[0].Rows[0]["PID"].ToString();
//                    if (strInfoCatAd.Trim() == "" && PID != "0") //当前级没有数据
//                    {
//                        DataSet ds1 = bll.GetList("ID='" + PID + "'");
//                        if (ds1.Tables[0].Rows.Count > 0) //上一级
//                        {
//                            strInfoCatAd = ds1.Tables[0].Rows[0]["InfoCatAd"].ToString();
//                            PID = ds1.Tables[0].Rows[0]["PID"].ToString();
//                            if (strInfoCatAd.Trim() == "" && PID != "0")//上一级没有数据
//                            {
//                                DataSet ds2 = bll.GetList("ID='" + PID + "'");
//                                if (ds2.Tables[0].Rows.Count > 0)  //再上一级 ,信息分类不会超过三级
//                                {
//                                    strInfoCatAd = ds2.Tables[0].Rows[0]["InfoCatAd"].ToString();
//                                }
//                            }
//                        }
//                    }
//                }
//            }


//            return strInfoCatAd;
//        }

//        /// <summary>
//        /// 根据当前产品栏目ID 取的侧方广告,如果当前栏目没有取第一级，如果没有第一级，为空。 
//        /// </summary>
//        /// <param name="ProCatID">当前产品ID</param>
//        /// <returns>  </returns>
//        public static string GetPageProAdByCatID(string ProCatID)
//        {
//            string strInfoCatAd = "";


//            if (ProCatID != "") //信息栏目
//            {
//                SfSoft.BLL.Ebs_ProductCat bll = new SfSoft.BLL.Ebs_ProductCat();
//                DataSet ds = bll.GetList("ID='" + ProCatID + "' and IsAct='1' ");

//                if (ds.Tables[0].Rows.Count > 0) //当前级
//                {
//                    strInfoCatAd = ds.Tables[0].Rows[0]["ProCatAd"].ToString();
//                    string PID = ds.Tables[0].Rows[0]["PID"].ToString();
//                    if (strInfoCatAd.Trim() == "" && PID != "0") //当前级没有数据
//                    {
//                        DataSet ds1 = bll.GetList("ID='" + PID + "'");
//                        if (ds1.Tables[0].Rows.Count > 0) //上一级
//                        {
//                            strInfoCatAd = ds1.Tables[0].Rows[0]["ProCatAd"].ToString();
//                            PID = ds1.Tables[0].Rows[0]["PID"].ToString();
//                            if (strInfoCatAd.Trim() == "" && PID != "0")//上一级没有数据
//                            {
//                                DataSet ds2 = bll.GetList("ID='" + PID + "'");
//                                if (ds2.Tables[0].Rows.Count > 0)  //再上一级 , 分类不会超过三级
//                                {
//                                    strInfoCatAd = ds2.Tables[0].Rows[0]["ProCatAd"].ToString();
//                                }
//                            }
//                        }
//                    }
//                }
//            }


//            return strInfoCatAd;
//        }
//        /// <summary>
//        /// 根据栏目ID 取的内容
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns> Details 内容</returns>
//        //public static string GetInfoDetailByMID(string MID)
//        //{
//        //    SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//        //    DataSet ds = bll.GetList(1, "MID='" + MID + "'", "  id desc");


//        //    if (ds.Tables[0].Rows.Count > 0)
//        //    {
//        //        return ds.Tables[0].Rows[0]["InfoDetail"].ToString();

//        //    }
//        //    else
//        //    {
//        //        return "";
//        //    }

//        //}

//        /// <summary>
//        /// 获得栏目前几行数据
//        /// </summary>
//        public static DataSet GetCatList(int Top, string strWhere, string filedOrder)
//        {
//            SfSoft.BLL.Ebs_InfoCat bll = new SfSoft.BLL.Ebs_InfoCat();
//            return bll.GetList(Top, strWhere, filedOrder);
//        }

//        /// <summary>
//        /// 根据栏目MID 取的子栏目
//        /// </summary>
//        /// <param name="MID"></param>
//        /// <returns></returns>
//        public static DataSet GetCatListByFlag(string MID)
//        {

//            return GetCatList(0, " MID='" + MID + "'", " OrderID");
//        }

//        /// <summary>
//        /////根据上级栏目ID 取的子栏目列表
//        /// </summary>
//        /// <param name="flag"></param>
//        /// <returns></returns>
//        public static DataSet GetCatListByParentID(string PID)
//        {

//            return GetCatList(0, " PID='" + PID + "'", " OrderID");
//        }

//        /// <summary>
//        /// 根据栏目MID 取的第一个栏目
//        /// </summary>
//        /// <param name="MID"></param>
//        /// <returns></returns>
//        public static Hashtable GetFirstCatByFlag(string MID)
//        {

//            DataSet ds = GetCatList(1, " MID='" + MID + "'", " OrderID");
//            Hashtable hash = new Hashtable();

//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                DataSet ds1 = GetCatList(1, " PID='" + ds.Tables[0].Rows[0]["ID"].ToString() + "'", " OrderID");
//                if (ds1.Tables[0].Rows.Count > 0)
//                {
//                    hash.Add("CatID", ds1.Tables[0].Rows[0]["ID"].ToString());
//                    hash.Add("InfoCatName", ds1.Tables[0].Rows[0]["InfoCatName"].ToString());
//                    hash.Add("InfoCatType", ds1.Tables[0].Rows[0]["InfoCatType"].ToString());
//                }
//                else
//                {
//                    hash.Add("CatID", ds.Tables[0].Rows[0]["ID"].ToString());
//                    hash.Add("InfoCatName", ds.Tables[0].Rows[0]["InfoCatName"].ToString());
//                    hash.Add("InfoCatType", ds.Tables[0].Rows[0]["InfoCatType"].ToString());
//                }

//            }
//            else
//            {
//                hash.Add("CatID", "");
//                hash.Add("InfoCatName", "");
//                hash.Add("InfoCatType", "");
//            }
//            return hash;
//        }






//        //取主页热点新闻
//        public static string GetHomeHotNews(int num)
//        {
//            SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//            StringBuilder strHtml = new StringBuilder();
//            string strWhere = " IsHomeShow='1' and (MID='')";
//            string filedOrder = "";
//            DataSet ds = bll.GetList(num, strWhere, filedOrder);
//            strHtml.Append("");
//            return "";

//        }


//        /// <summary>
//        /// 根据栏目ID 取的第一条信息 标题和内容
//        /// </summary>
//        /// <param name="ID"></param>
//        /// <returns>hash Topic 主题， Details 内容， ctime 发布时间 ，FilePath 图片路径</returns>
//        public static Hashtable GetFirstInfoByCatID(string CatID, bool IsHomeShow)
//        {
//            SfSoft.BLL.Ebs_Info bll = new SfSoft.BLL.Ebs_Info();
//            string strWhere = "InfoID='" + CatID + "'";
//            if (IsHomeShow)
//            {
//                strWhere += " and IsHomeShow='1'";
//            }
//            DataSet ds = bll.GetList(1, strWhere, "  mtime desc, id desc");
//            Hashtable hash = new Hashtable();

//            if (ds.Tables[0].Rows.Count > 0)
//            {
//                hash.Add("Topic", ds.Tables[0].Rows[0]["Topic"].ToString());
//                hash.Add("InfoDetail", ds.Tables[0].Rows[0]["Details"].ToString());
//                hash.Add("InfoDesc", ds.Tables[0].Rows[0]["FilePath"].ToString());
//                hash.Add("InfoSmallPic", ds.Tables[0].Rows[0]["InfoSmallPic"].ToString());
//                hash.Add("InfoBigPic", ds.Tables[0].Rows[0]["InfoBigPic"].ToString());
//                hash.Add("mtime", ds.Tables[0].Rows[0]["mtime"].ToString());

//            }
//            else
//            {
//                hash.Add("Topic", "");
//                hash.Add("InfoDetail", "");
//                hash.Add("InfoDesc", "");
//                hash.Add("InfoBigPic", "");
//                hash.Add("InfoSmallPic", "");
//                hash.Add("mtime", "");
//            }
//            return hash;
//        }
//        /// <summary>
//        /// 取的子站主页信息列表
//        /// </summary>
//        /// <param name="dt"></param>
//        /// <param name="topiclen"></param>
//        /// <param name="isShowDate"></param>
//        /// <param name="styleName"></param>
//        /// <returns></returns>
//        public static string GetListInfo(DataTable dt, int topiclen, bool isShowDate, string styleName)
//        {
//            StringBuilder strHtml = new StringBuilder();
//            strHtml.Append("<ul>");
//            if (dt.Rows.Count > 0)
//            {
//                string Topic = "";
//                string strDate = "";
//                foreach (DataRow dr in dt.Rows)
//                {
//                    Topic = dr["Topic"].ToString();
//                    if (topiclen > 0 && Topic.Length > topiclen)
//                    {
//                        Topic = Topic.Substring(0, topiclen) + "...";
//                    }
//                    if (isShowDate)
//                    {

//                        strDate = "&nbsp;&nbsp;[" + PageValidate.FormatSmallDate(dr["mtime"].ToString()) + "]";
//                    }
//                    strHtml.Append("<li><span class='" + styleName + "'></span><a href='infodetail.aspx?MID=" + dr["MID"].ToString() + "&CatID=" + dr["InfoID"].ToString() + "&InfoID=" + dr["ID"].ToString() + "' title='" + dr["topic"].ToString() + "' target='_blank'>" + Topic + "</a>" + strDate + "</li>");
//                }
//            }
//            strHtml.Append("</ul>");
//            return strHtml.ToString();
//        }

//        /// <summary>
//        /// 取的子站主页信息列表
//        /// </summary>
//        /// <param name="dt"></param>
//        /// <param name="topiclen"></param>
//        /// <param name="isShowDate"></param>
//        /// <param name="styleName"></param>
//        /// <returns></returns>
//        public static string GetHomeListInfo(DataTable dt, int topiclen, bool isShowDate, string styleName)
//        {
//            StringBuilder strHtml = new StringBuilder();
//            strHtml.Append("<ul>");
//            if (dt.Rows.Count > 0)
//            {
//                string Topic = "";
//                string strDate = "";
//                string MID = "";
//                string filepath = "";
//                foreach (DataRow dr in dt.Rows)
//                {
//                    MID = dr["MID"].ToString();

//                    Topic = dr["Topic"].ToString();
//                    if (topiclen > 0 && Topic.Length > topiclen)
//                    {
//                        Topic = Topic.Substring(0, topiclen) + "...";
//                    }
//                    if (isShowDate)
//                    {
//                        strDate = "&nbsp;&nbsp;[" + PageValidate.FormatSmallDate(dr["mtime"].ToString()) + "]";
//                    }
//                    strHtml.Append("<li><span class='" + styleName + "'></span><a href='" + filepath + "infodetail.aspx?MID=" + dr["MID"].ToString() + "&CatID=" + dr["InfoID"].ToString() + "&InfoID=" + dr["ID"].ToString() + "' title='" + dr["topic"].ToString() + "' target='_blank'>" + Topic + "</a>" + strDate + "</li>");
//                }
//            }
//            strHtml.Append("</ul>");
//            return strHtml.ToString();
//        }

//        /// <summary>
//        /// 取的子站主页信息列表
//        /// </summary>
//        /// <param name="dt"></param>
//        /// <param name="InfoMID">第一级模栏目ID</param>
//        /// <param name="topiclen">主题长度</param>
//        /// <param name="isShowDate">是否显示日期</param>
//        /// <param name="styleName">样式名</param>
//        /// <param name="isbr">日期和主题间是否需要换行</param>
//        /// <returns></returns>
//        public static string GetListInfo(DataTable dt, string InfoMID, int topiclen, bool isShowDate, string styleName, bool isbr)
//        {
//            StringBuilder strHtml = new StringBuilder();
//            strHtml.Append("<ul>");
//            if (dt.Rows.Count > 0)
//            {
//                string Topic = "";
//                string strDate = "";
//                foreach (DataRow dr in dt.Rows)
//                {
//                    Topic = dr["Topic"].ToString();
//                    if (topiclen > 0 && Topic.Length > topiclen)
//                    {
//                        Topic = Topic.Substring(0, topiclen) + "...";
//                    }
//                    if (isShowDate)
//                    {

//                        if (isbr)
//                        {
//                            strDate = "<br>";
//                        }

//                        strDate = "&nbsp;&nbsp;[" + PageValidate.FormatSmallDate(dr["mtime"].ToString()) + "]";
//                    }
//                    strHtml.Append("<li><span class='" + styleName + "'>&nbsp;</span><a href='infodetail.aspx?InfoMID=" + InfoMID + "&InfoCatID=" + dr["InfoID"].ToString() + "&InfoID=" + dr["ID"].ToString() + "' title='" + dr["topic"].ToString() + "' target='_blank'>" + Topic + "</a>" + strDate + "</li>");
//                }
//            }
//            strHtml.Append("</ul>");
//            return strHtml.ToString();
//        }

//        /// <summary>
//        /// 取的图文信息
//        /// </summary>
//        /// <param name="dr">行信息</param>
//        ///  <param name="InfoMID">第一级模栏目ID</param>
//        /// <param name="topiclen">主题长度</param>
//        /// <param name="contentlen">内容长度</param>
//        /// <param name="picarr">图片大小</param>
//        /// <returns></returns>
//        public static string GetSubHomeTopicInfo(DataRow dr, string InfoMID, int topiclen, int contentlen, string picarr)
//        {
//            string FilePath = "";
//            string Topic = "";
//            string Details = "";
//            string strIMG = "";
//            string strUrl = "infodetail.aspx?InfoMID=" + InfoMID + "&InfoCatID=" + dr["InfoID"].ToString() + "&InfoID=" + dr["ID"].ToString();
//            if (dr != null)
//            {
//                FilePath = dr["InfoSmallPic"].ToString();
//                if (FilePath == "")
//                {
//                    FilePath = dr["InfoBigPic"].ToString();
//                }
//                if (FilePath != "")
//                {
//                    strIMG = "<a href='" + strUrl + "' target='_blank'><img src='" + FilePath + "' " + picarr + " border=0></a>";
//                }

//                Topic = dr["Topic"].ToString();
//                Topic = GetLeftStr(Topic, topiclen);
//                Details = dr["InfoDesc"].ToString();
//                if (Details == "")
//                {
//                    Details = dr["InfoDetail"].ToString();
//                }
//                Details = GetStrNoHtml(Details, contentlen, false);
//            }
//            StringBuilder strHtml = new StringBuilder();
//            strHtml.Append("<dl>");
//            if (FilePath != "")
//            {
//                strHtml.Append(" <dt>" + strIMG + "</dt>");
//                strHtml.Append(" <dd>");
//            }
//            strHtml.Append(" <p class='dltit'><a href='" + strUrl + "' title='" + dr["topic"].ToString() + "' target='_blank'>" + Topic + "</a></p>");
//            strHtml.Append(" <p class='dlcon' > <a href='" + strUrl + "' target='_blank'> " + Details + "</a></p>");
//            strHtml.Append(" </dd>");
//            strHtml.Append("</dl>");
//            return strHtml.ToString();
//        }


//        public static string GetStrNoHtml(string strHtml, int len, bool IsEnter)
//        {
//            string str = MoveHTML(strHtml, IsEnter);
//            if (len == 0)
//            {
//                return str;
//            }
//            if (str.Length > len)
//            {
//                str = str.Substring(0, len) + "...";
//            }
//            return str;
//        }

//        ///   <summary>
//        ///   去除HTML标记
//        ///   </summary>
//        ///   <param   name="NoHTML">包括HTML的源码   </param>
//        ///   <param   name="IsEnter">是否需要回车格式    </param>
//        ///   <returns>已经去除后的文字</returns>
//        public static string MoveHTML(string Htmlstring, bool IsEnter)
//        {

//            if (IsEnter)
//            {
//                Htmlstring.Replace("<BR>", "\r");
//                Htmlstring.Replace("<br>", "\r");
//                Htmlstring.Replace("&nbsp;", "\n");
//            }
//            //删除脚本
//            Htmlstring = Regex.Replace(Htmlstring, @"<script[^>]*?>.*?</script>", "",
//              RegexOptions.IgnoreCase);
//            //删除HTML
//            Htmlstring = Regex.Replace(Htmlstring, @"<(.[^>]*)>", "",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"([\r\n])[\s]+", "",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"-->", "", RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"<!--.*", "", RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(quot|#34);", "\"",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(amp|#38);", "&",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(lt|#60);", "<",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(gt|#62);", ">",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(nbsp|#160);", "   ",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(iexcl|#161);", "\xa1",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(cent|#162);", "\xa2",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(pound|#163);", "\xa3",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&(copy|#169);", "\xa9",
//              RegexOptions.IgnoreCase);
//            Htmlstring = Regex.Replace(Htmlstring, @"&#(\d+);", "",
//              RegexOptions.IgnoreCase);

//            Htmlstring.Replace("<", "");
//            Htmlstring.Replace(">", "");
//            Htmlstring.Replace("\r\n", "");

//            //    Htmlstring = HttpContext.Current.Server.HtmlEncode(Htmlstring).Trim();


//            Htmlstring.Replace("\r", "<BR>");
//            Htmlstring.Replace("\r", "<br>");
//            Htmlstring.Replace("\n", "&nbsp;");

//            return Htmlstring;
//        }
//        /// <summary>
//        /// 取的字符串左边字符数
//        /// </summary>
//        /// <param name="str"></param>
//        /// <param name="len"></param>
//        /// <returns></returns>
//        public static string GetLeftStr(string str, int len)
//        {
//            if (str == null)
//            {
//                return "";
//            }
//            else
//            {
//                if (str.Length > len)
//                {
//                    return str.Substring(0, len);
//                }
//                else
//                {
//                    return str;
//                }
//            }
//        }

//        #region 格式化字符串,符合SQL语句
//        /// <summary>
//        /// 格式化字符串,符合SQL语句
//        /// </summary>
//        /// <param name="formatStr">需要格式化的字符串</param>
//        /// <returns>字符串</returns>
        public static string inSQL(string formatStr)
        {
            string rStr = formatStr;
            if (formatStr != null && formatStr != string.Empty)
            {
                rStr = rStr.Replace("'", "''");
                rStr = rStr.Replace("\"", "\"\"");
            }
            return rStr;
        }
        /// <summary>
        /// 格式化字符串,是inSQL的反向
        /// </summary>
        /// <param name="formatStr"></param>
        /// <returns></returns>
        public static string outSQL(string formatStr)
        {
            string rStr = formatStr;
            if (rStr != null)
            {
                rStr = rStr.Replace("''", "'");
                rStr = rStr.Replace("\"\"", "\"");
            }
            return rStr;
        }

//        /// <summary>
//        /// 查询SQL语句,删除一些SQL注入问题
//        /// </summary>
//        /// <param name="formatStr">需要格式化的字符串</param>
//        /// <returns></returns>
//        public static string querySQL(string formatStr)
//        {
//            string rStr = formatStr;
//            if (rStr != null && rStr != "")
//            {
//                rStr = rStr.Replace("'", "");
//            }
//            return rStr;
//        }
//        #endregion


//        //会员登录验证
        public static int CheckMemberLogin(string username, string password)
        {
           
                return 0;
           
        }


 
    }
}
