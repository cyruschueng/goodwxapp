using System;
using System.Collections.Generic;
using System.Text;

namespace SfSoft.SfEmc
{
   public  class AttFiles
    {

       public static void SaveAttFile(string filename,string newfilename,string MID,string DocID,string ClassID)
       {
           Model.Pub_AttFiles model = new SfSoft.Model.Pub_AttFiles();
           BLL.Pub_AttFiles bll = new SfSoft.BLL.Pub_AttFiles();
           model.DocID = DocID;
           model.ClassID = ClassID;
           model.FileName = filename;
           model.FilePath = newfilename;
           model.MID = MID;
           bll.Add(model);
       }
    }
}
