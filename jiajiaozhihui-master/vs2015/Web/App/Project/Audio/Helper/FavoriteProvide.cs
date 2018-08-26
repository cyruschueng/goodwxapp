using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.Audio.Helper
{
    public class FavoriteProvide
    {
        public static bool UpdateFavorite(Models.Favorite.FavoriteInfo favoriteInfo)
        {
            BLL.WX_Audio_Favorite bll = new BLL.WX_Audio_Favorite();
            bool isExist = bll.Exists(favoriteInfo.AppId, favoriteInfo.OpenId, favoriteInfo.AudioId);
            if (!isExist)
            {
                Model.WX_Audio_Favorite model = new Model.WX_Audio_Favorite();
                model.AppId = favoriteInfo.AppId;
                model.AudioId = favoriteInfo.AudioId;
                model.CreateDate = DateTime.Now;
                model.OpenId = favoriteInfo.OpenId;
                bll.Add(model);
                return true;
            }
            else {
                bll.Delete(favoriteInfo.AppId, favoriteInfo.OpenId, favoriteInfo.AudioId);
                return false;
            }
        }
        public static bool IsExist(string appId, string openId, int audioId)
        {
            BLL.WX_Audio_Favorite bll = new BLL.WX_Audio_Favorite();
            return bll.Exists(appId,openId,audioId);
        }
        public static List<Models.Song.SongInfo> GetMyFavorite(string appId, string openId)
        {
            string sql = "select * from (" +
                " select a.*,b.CategoryId,b.FullName,b.ShortName,b.SoundSource,b.Cover,b.PlayNumber,b.IsAct,b.CategoryPath,b.Duration from  WX_Audio_Favorite a " +
                " left join WX_Audio b on a.AudioId=b.Id"+
                ")a where appId='" + appId + "' and openId='" + openId + "'";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            var categorys = Helper.CategoryProvide.GetCategoryList();
            List<Models.Song.SongInfo> audioInfos = new List<Models.Song.SongInfo>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    audioInfos.Add(new Models.Song.SongInfo
                    {
                        AudioId = dr.Field<int>("AudioId"),
                        CategoryId = dr.Field<int>("CategoryId"),
                        CategoryPath = dr.Field<string>("CategoryPath"),
                        Cover = dr.Field<string>("Cover"),
                        FullName = dr.Field<string>("FullName"),
                        PlayNumber = dr.Field<int?>("PlayNumber") ?? 0,
                        ShortName = dr.Field<string>("ShortName"),
                        SoundSource = dr.Field<string>("SoundSource"),
                        Duration = dr.Field<int?>("Duration")??0,
                        IsFavorite = Helper.FavoriteProvide.IsExist(appId, openId, dr.Field<int>("AudioId")),
                        CategoryInfo = categorys.Where(e => e.CategoryId == dr.Field<int>("CategoryId")).FirstOrDefault<Models.Category.CategoryInfo>()
                    });
                }
            }
            return audioInfos;
        }
        public static void Delete(string appId, string openId, int audioId)
        {
            BLL.WX_Audio_Favorite bll = new BLL.WX_Audio_Favorite();
            bll.Delete(appId, openId, audioId);
        }
    }
}