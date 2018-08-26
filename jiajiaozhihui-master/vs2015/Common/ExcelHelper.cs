using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Data;
using System.Data.OleDb;
using System.Collections;
using Microsoft.Office.Interop.Excel;
using System.Configuration;
using System.IO;
using System.Web.UI.WebControls;
using System.Web;

namespace SfSoft.Common
{
    public class ExcelHelper
    {
        private Excel._Application excelApp;
        private string fileName = string.Empty;
        private Excel.WorkbookClass wbclass;
        public ExcelHelper(string _filename)
        {
            excelApp = new Excel.Application();
            object objOpt = System.Reflection.Missing.Value;
            wbclass = (Excel.WorkbookClass)excelApp.Workbooks.Open(_filename, objOpt, false, objOpt, objOpt, objOpt, true, objOpt, objOpt, true, objOpt, objOpt, objOpt, objOpt, objOpt);
        }
        public ExcelHelper()
        { 
        
        }
        /// <summary>
        /// 所有sheet的名称列表
        /// </summary>
        /// <returns></returns>
        public List<string> GetSheetNames()
        {
            List<string> list = new List<string>();
            Excel.Sheets sheets = wbclass.Worksheets;
            string sheetNams = string.Empty;
            foreach (Excel.Worksheet sheet in sheets)
            {
                list.Add(sheet.Name);
            }
            return list;
        }
        public Excel.Worksheet GetWorksheetByName(string name)
        {
            Excel.Worksheet sheet = null;
            Excel.Sheets sheets = wbclass.Worksheets;
            foreach (Excel.Worksheet s in sheets)
            {
                if (s.Name == name)
                {
                    sheet = s;
                    break;
                }
            }
            return sheet;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sheetName">sheet名称</param>
        /// <returns></returns>
        public Array GetContent(string sheetName)
        {
            Excel.Worksheet sheet = GetWorksheetByName(sheetName);
            //获取A1 到AM24范围的单元格
            Excel.Range rang = sheet.get_Range("A3", "AM24");
            //读一个单元格内容
            //sheet.get_Range("A1", Type.Missing);
            //不为空的区域,列,行数目
            //   int l = sheet.UsedRange.Columns.Count;
            // int w = sheet.UsedRange.Rows.Count;
            //  object[,] dell = sheet.UsedRange.get_Value(Missing.Value) as object[,];
            System.Array values = (Array)rang.Cells.Value2;
            return values;
        }

        public void Close()
        {
            excelApp.Quit();
            excelApp = null;
        }

        public  static DataSet GetDataSet(string filePath)
        {
            string Connstr = string.Format("Provider=Microsoft.Jet.OLEDB.4.0;Data Source='" + filePath + "';Extended Properties='Excel 8.0;HDR=Yes;IMEX=1'");
            OleDbConnection Conn = new OleDbConnection(Connstr);
            //创建ArrayList对象 存放所有sheetname    
            ArrayList sheetNamelist = new ArrayList();
            //获取配置Excel中sheet总数(这里是根据项目需求配置的) 如果需要导入Excel表格所有sheet数据则将此代码删除  
           // int sheetCount = Convert.ToInt32(ConfigurationManager.AppSettings["sheetCount"].ToString());
            DataSet dsExcel = new DataSet();
            try
            {
                if (Conn.State == ConnectionState.Closed)
                {
                    Conn.Open();
                }
                System.Data.DataTable dtExcelSchema = Conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, new object[] { null, null, null, "Table" });
                 List<string> sheetNames = new List<string>();
                if (dtExcelSchema.Rows.Count > 12)
                {
                    //        Page.RegisterStartupScript("", "<mce:script type="text/javascript"><!--  
                    // alert('很抱歉!你上传Excel文件sheet总数过多不能大于10个sheet..!! ')  
                    // --></mce:script>");  
                    return null;
                }
                else
                {
                    foreach (DataRow var in dtExcelSchema.Rows)
                    {
                        string s = var[2].ToString();
                        sheetNamelist.Add(var[2].ToString());
                    }
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString(), ex);
            }
            finally
            {
                Conn.Close();
            }
            try
            {
                string strSQL = string.Empty;
                for (int i = 0; i < sheetNamelist.Count; i++)
                {
                    strSQL = "select * from [" + sheetNamelist[i].ToString() + "]";
                    OleDbDataAdapter da = new OleDbDataAdapter(strSQL, Conn);
                    System.Data.DataTable dtExcel = new System.Data.DataTable(sheetNamelist[i].ToString());
                    da.Fill(dtExcel);
                    dsExcel.Tables.Add(dtExcel);
                }
                return dsExcel;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
       public  void DtToExcel(DataSet ds, string tableName, bool containColumName,string fileName)   
        {
            if (ds == null || (!ds.Tables.Contains(tableName) && ds.Tables.Count < int.Parse(tableName)))
            {
                return ;
            }
            System.Data.DataTable tb = !ds.Tables.Contains(tableName) ? ds.Tables[int.Parse(tableName)] : ds.Tables[tableName];

            StringBuilder strb = new StringBuilder();   
            strb.Append(" <html xmlns:o=\"urn:schemas-microsoft-com:office:office\"");   
            strb.Append("xmlns:x=\"urn:schemas-microsoft-com:office:excel\"");   
            strb.Append("xmlns=\"http://www.w3.org/TR/REC-html40/ \" lang=\"zh-cn\" ");
            strb.Append(" <head> <meta http-equiv='Content-Type' content='text/html'; charset='gb2312'>");   
            strb.Append(" <style>");   
            strb.Append(".xl26");   
            strb.Append(" {mso-style-parent:style0;");   
            strb.Append(" font-family:\"宋体\", serif;");   
            strb.Append(" mso-font-charset:0;");   
            strb.Append(" mso-number-format:\"@\";}");   
            strb.Append(" </style>");   
            strb.Append(" <xml>");   
            strb.Append(" <x:ExcelWorkbook>");   
            strb.Append("  <x:ExcelWorksheets>");   
            strb.Append("  <x:ExcelWorksheet>");   
            strb.Append("    <x:Name>Sheet1 </x:Name>");  
            strb.Append("    <x:WorksheetOptions>");   
            strb.Append("    <x:DefaultRowHeight>285 </x:DefaultRowHeight>");   
            strb.Append("    <x:Selected/>");   
            strb.Append("    <x:Panes>");   
            strb.Append("      <x:Pane>");   
            strb.Append("      <x:Number>3 </x:Number>");   
            strb.Append("      <x:ActiveCol>1 </x:ActiveCol>");   
            strb.Append("      </x:Pane>");   
            strb.Append("    </x:Panes>");
            strb.Append("    <x:ProtectContents>True </x:ProtectContents>");
            strb.Append("    <x:ProtectObjects>True </x:ProtectObjects>");
            strb.Append("    <x:ProtectScenarios>True </x:ProtectScenarios>");   
            strb.Append("    </x:WorksheetOptions>");   
            strb.Append("  </x:ExcelWorksheet>");   
            strb.Append("  <x:WindowHeight>6750 </x:WindowHeight>");   
            strb.Append("  <x:WindowWidth>10620 </x:WindowWidth>");   
            strb.Append("  <x:WindowTopX>480 </x:WindowTopX>");   
            strb.Append("  <x:WindowTopY>75 </x:WindowTopY>");   
            strb.Append("  <x:ProtectStructure>True </x:ProtectStructure>");
            strb.Append("  <x:ProtectWindows>True </x:ProtectWindows>");   
            strb.Append(" </x:ExcelWorkbook>");   
            strb.Append(" </xml>");   
            strb.Append("");   
            strb.Append(" </head> <body> <table align=\"center\" style='border-collapse:collapse;table-layout:fixed'>");
            if (containColumName)
            {
                strb.Append("<tr>");
                //写列标题   
                int columncount = tb.Columns.Count;
                for (int columi = 0; columi < columncount; columi++)
                {
                    strb.Append(" <td> <b>" + tb.Columns[columi] + " </b> </td>");
                }

                strb.Append(" </tr>");   
            }
            //写数据   
            for (int i = 0; i < tb.Rows.Count; i++)   
            {   
                strb.Append(" <tr>");  
                for (int j = 0; j < tb.Columns.Count; j++)   
                {   
                    strb.Append(" <td class='xl26'>" + tb.Rows[i][j].ToString() + " </td>");   
                }   
                strb.Append(" </tr>");   
            }      
            strb.Append(" </body> </html>");   
            
            HttpContext.Current.Response.Clear();   
            HttpContext.Current.Response.Buffer = true;   
            HttpContext.Current.Response.Charset = "GB2312";
            HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment;filename=" + HttpContext.Current.Server.HtmlEncode(fileName));   
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");//设置输出流为简体中文   
            HttpContext.Current.Response.ContentType = "application/ms-excel";//设置输出文件类型为excel文件。   
            //this.EnableViewState = false;   
            HttpContext.Current.Response.Write(strb);   
            HttpContext.Current.Response.End();   
        } 
    }
}