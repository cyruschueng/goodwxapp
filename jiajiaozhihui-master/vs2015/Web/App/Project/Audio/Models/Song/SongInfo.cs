using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.Song
{
    public class SongInfo:Audio.AudioInfo
    {
        public bool IsFavorite { get; set; }
        public Models.Category.CategoryInfo CategoryInfo { get; set; }
    }
}