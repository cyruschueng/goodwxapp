using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class SongProvide
    {
        public static List<Models.Song.SongInfo> GetSongs(string appId,string openId, int categoryId)
        {
            List<Models.Song.SongInfo> songInfos = new List<Models.Song.SongInfo>();
            var list= Helper.AudioProvide.GetSongByCategory(categoryId);
            var categorys = Helper.CategoryProvide.GetCategoryList();
            foreach (var m in list) {
                songInfos.Add(new Models.Song.SongInfo
                {
                    AudioId = m.AudioId,
                    CategoryId = m.CategoryId,
                    CategoryInfo = categorys.Where(e=>e.CategoryId==m.CategoryId).FirstOrDefault<Models.Category.CategoryInfo>(),
                    CategoryPath = m.CategoryPath,
                    Cover = m.Cover,
                    Duration = m.Duration,
                    FullName = m.FullName,
                    IsFavorite = Helper.FavoriteProvide.IsExist(appId, openId, m.AudioId),
                    PlayNumber = m.PlayNumber,
                    ShortName = m.ShortName,
                    SoundSource = m.SoundSource
                });
            }
            return songInfos;
        }
    }
}