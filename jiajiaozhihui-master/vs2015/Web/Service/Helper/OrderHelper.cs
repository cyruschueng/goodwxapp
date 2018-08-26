using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Helper
{
    public class OrderHelper
    {
        private  static Dictionary<int,SfSoft.Model.Pub_Areas> _dicProvince;
        private static Dictionary<int, SfSoft.Model.Pub_Areas> _dicCity;
        static OrderHelper()
        {
            InitArea();
        }
        /// <summary>
        /// 返回省份
        /// </summary>
        /// <param name="areaId"></param>
        /// <returns></returns>
        public static SfSoft.Model.Pub_Areas GetProvince(int areaId) 
        {
            if (_dicProvince == null) return new SfSoft.Model.Pub_Areas();

            if (_dicProvince.ContainsKey(areaId))
            {
                return _dicProvince[areaId];
            }
            else {
                InitArea(true);
                if (_dicProvince.ContainsKey(areaId))
                {
                    return _dicProvince[areaId];
                }
            }
            return new SfSoft.Model.Pub_Areas();
        }
        /// <summary>
        /// 返回城市
        /// </summary>
        /// <param name="areaId"></param>
        /// <returns></returns>
        public static SfSoft.Model.Pub_Areas GetCity(int areaId) 
        {
            if (_dicProvince == null) return new SfSoft.Model.Pub_Areas();

            if (_dicCity.ContainsKey(areaId))
            {
                return _dicCity[areaId];
            }
            else
            {
                InitArea(true);
                if (_dicCity.ContainsKey(areaId))
                {
                    return _dicCity[areaId];
                }
            }
            return new SfSoft.Model.Pub_Areas();
        }
        /// <summary>
        /// 初始区域信息
        /// </summary>
        private static void InitArea(bool refresh=false)
        {
            if (_dicProvince == null || _dicCity == null || refresh==true) {
                SfSoft.BLL.Pub_Areas bll = new SfSoft.BLL.Pub_Areas();
                List<SfSoft.Model.Pub_Areas> list = bll.GetModelList("");
                if (list.Count > 0)
                {
                    var province = list.FindAll(e => e.AreaType == 1);
                    _dicProvince = new Dictionary<int, SfSoft.Model.Pub_Areas>();
                    foreach (SfSoft.Model.Pub_Areas model in province)
                    {
                        _dicProvince.Add((int)model.AreaID, model);
                    }
                    var city = list.FindAll(e => e.AreaType == 2);
                    _dicCity = new Dictionary<int, SfSoft.Model.Pub_Areas>();
                    foreach (SfSoft.Model.Pub_Areas model in city)
                    {
                        _dicCity.Add((int)model.AreaID, model);
                    }
                }
            }
        }
    }
}