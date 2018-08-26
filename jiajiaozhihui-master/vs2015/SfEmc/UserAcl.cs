using System;
using System.Data;
using System.Collections.Generic;
using System.Text;

namespace SfSoft.SfEmc
{
    public class UserAcl
    {
        public static Boolean checkMenuAcl(DataView acldv, string ModulesID)
        {

            if (acldv != null)
            {

                acldv.RowFilter = "[FunID]='" + ModulesID + "'";
                if (acldv.Count > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

    }
}
