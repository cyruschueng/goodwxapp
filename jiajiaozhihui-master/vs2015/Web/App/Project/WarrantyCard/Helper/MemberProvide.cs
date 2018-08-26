using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WarrantyCard.Helper
{
    public class MemberProvide
    {
        /// <summary>
        ///  保修卡列表
        /// </summary>
        /// <param name="memberType"></param>
        /// <param name="openId"></param>
        /// <returns>如果没有，则返回null</returns>
        public List<Model.WX_WarrantyCard> GetWarrantyCardList(string openId)
        {
            BLL.WX_WarrantyCard bll = new BLL.WX_WarrantyCard();
            return bll.GetModelList("OpenId='"+openId+"'");
        }
        /// <summary>
        /// 查找所有的保修卡
        /// </summary>
        /// <param name="memberType"></param>
        /// <returns></returns>
        public List<Model.WX_WarrantyCard> GetWarrantyCardList()
        {
            BLL.WX_WarrantyCard bll = new BLL.WX_WarrantyCard();
            return bll.GetModelList("");
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="machineCode"></param>
        /// <returns></returns>
        public Model.WX_WarrantyCard GetWarrantyCard(string machineCode)
        {
            BLL.WX_WarrantyCard bll = new BLL.WX_WarrantyCard();
            return bll.GetModel(machineCode);
        }
        /// <summary>
        /// 新增保修卡登记
        /// </summary>
        /// <param name="member"></param>
        /// <returns></returns>
        public bool AddMember(Model.WX_WarrantyCard card)
        {
            BLL.WX_WarrantyCard bll = new BLL.WX_WarrantyCard();
            return bll.Add(card);
        }
        /// <summary>
        /// 是否存在保修卡
        /// </summary>
        /// <param name="memberType"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public bool ExistWarrantyCard(string machineCode)
        {
            BLL.WX_WarrantyCard bll = new BLL.WX_WarrantyCard();
            return bll.Exists(machineCode);
        }
        /// <summary>
        /// 更新保修卡
        /// </summary>
        /// <param name="member"></param>
        /// <returns></returns>
        public bool UpdateWarrantyCard(Model.WX_WarrantyCard card)
        {
            BLL.WX_WarrantyCard bll = new BLL.WX_WarrantyCard();
            return bll.Update(card);
        }
    }
}