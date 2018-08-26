using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Helper
{
    public static class GoodsHelper
    {
        private static Dictionary<int, SfSoft.Model.WX_PublicGood> _goods;
        static GoodsHelper()
        {
            InitGoods();
        }
        /// <summary>
        ///  初如产品
        /// </summary>
        /// <param name="refresh">是否刷新产品</param>
        private static void InitGoods(bool refresh=false)
        {
            if (_goods == null || refresh==true)
            {
                SfSoft.BLL.WX_PublicGood bll = new SfSoft.BLL.WX_PublicGood();
                List<SfSoft.Model.WX_PublicGood> list = bll.GetModelList("");
                if (list.Count > 0) {
                    _goods = new Dictionary<int, SfSoft.Model.WX_PublicGood>();
                    foreach(SfSoft.Model.WX_PublicGood model in list){
                        _goods.Add(model.ID, model);
                    }
                }
            }
        }
        /// <summary>
        /// 获取指定的产品
        /// 如果在内存中没有找到，会重新刷新产品信息
        /// </summary>
        /// <param name="goodsId"></param>
        /// <returns></returns>
        public static SfSoft.Model.WX_PublicGood GetGoods(int goodsId)
        {
            if (_goods == null) return new SfSoft.Model.WX_PublicGood();

            if (_goods.ContainsKey(goodsId))
            {
                return _goods[goodsId];
            }
            else {
                InitGoods(true);
                if (_goods.ContainsKey(goodsId)) {
                    return _goods[goodsId];
                }
            }
            return new SfSoft.Model.WX_PublicGood();
        }
    }
}