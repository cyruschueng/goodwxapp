using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Helper
{
    public class QuestionPlayerProvide
    {
        public static void UpdatePlayer(Models.AnswerResult.ResultInfo info)
        {
            BLL.WX_TestQuestion_Player bllPlayer = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player modelPlayer = bllPlayer.GetModeByServiceOpenID(info.OpenId);
            modelPlayer.Score = (modelPlayer.Score ?? 0) + info.Score;
            modelPlayer.UsingTime = (modelPlayer.UsingTime ?? 0) + info.UsingTime;
            bllPlayer.Update(modelPlayer);
        }
    }
}