using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SfSoft.web.Gardenia.Controller
{
    [RoutePrefix("api/gardenia")]
    public class MemberController : ApiController
    {
        [Route("member/regist")]
        public async Task<IHttpActionResult> Post(dynamic obj)
        {
            try {
                var openId = Convert.ToString(obj.openid);
                var telephone = Convert.ToString(obj.telephone);
                var realName = Convert.ToString(obj.realname);
                var groupType = Convert.ToInt32(obj.grouptype);
                var childAge = Convert.ToInt32(obj.childage);
                var childSex = Convert.ToString(obj.childsex);
                var childGrade = Convert.ToString(obj.childgrade);
                var city = Convert.ToString(obj.city);
                var parentAge = Convert.ToInt32(obj.parentage);
                var profession = Convert.ToString(obj.profession);

                Helper.MemberProvide provide = new Helper.MemberProvide();
                if (provide.IsRegist(telephone, realName) == true)
                {
                    return Json(new { success = true,state=1,msg="已被人注册" });
                }
                else {
                    provide.RegistMemberAsyn(openId, telephone, realName,childAge,childSex,childGrade,city,parentAge,profession);
                    int classId=provide.JoinClassAsyn(openId, groupType);
                    //provide.RegistHabitAsyn(classId, openId, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month));
                    return Json(new { success = true,state=0,msg="有效" });
                }
            }
            catch (Exception ex) {
                return Json(new { success = false,msg=ex.Message });
            }
        }
        [Route("member/info")]
        public IHttpActionResult Post2(dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                Helper.MemberProvide provide = new Helper.MemberProvide();
                var model = provide.GetMember(openId);
                return Json(new { success = true, data=model});
            }
            catch (Exception ex) {
                return Json(new { success = false });
            }
            
        }
    }
}
