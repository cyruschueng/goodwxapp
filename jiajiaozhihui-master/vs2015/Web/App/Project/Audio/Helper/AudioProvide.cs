using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class AudioProvide
    {
        public static List<Models.Audio.AudioInfo> GetSongByCategory(int categoryId)
        {
            BLL.WX_Audio bll = new BLL.WX_Audio();
            var list= bll.GetModelList("CategoryId=" + categoryId);
            List<Models.Audio.AudioInfo> audioInfos = new List<Models.Audio.AudioInfo>();
            foreach (var m in list) {
                audioInfos.Add(new Models.Audio.AudioInfo
                {
                    AudioId = m.Id,
                    CategoryId = m.CategoryId ?? 0,
                    CategoryPath = m.CategoryPath,
                    Cover = m.Cover,
                    FullName = m.FullName,
                    PlayNumber = m.PlayNumber ?? 0,
                    ShortName = m.ShortName,
                    SoundSource = m.SoundSource,
                    Duration=m.Duration??0,
                });
            }
            return audioInfos;
        }

        public static int PlayNumber(int audioId)
        {
            BLL.WX_Audio bll = new BLL.WX_Audio();
            var model= bll.GetModel(audioId);
            model.PlayNumber = (model.PlayNumber ?? 0) + 1;
            bll.Update(model);
            return model.PlayNumber??0;
        }
    }
}