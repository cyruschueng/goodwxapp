using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gardenia.Helper
{
    public class MyProvide
    {
        /// <summary>
        /// 获取入学通知书
        /// </summary>
        /// <param name="openId"></param>
        public string GetAdvice(string openId)
        {
            var fileName= System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase+ "files\\gardenia\\member\\advice\\"+ openId+".png";
            if (File.Exists(fileName)) {
                return App.Helper.WxBaseConfig.ServerUrl + "files/gardenia/member/advice/" + openId + ".png";
            }
            return "";
        }
    }
}