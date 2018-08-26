using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyUntil
{
    public class StringHelper
    {
        public static string GetSaltStr()
        {
            var seed= (int)DateTime.Now.Ticks;
            return GetRanddomStr(seed, 32);
        }

        private static string GetRanddomStr(int s, int length)
        {
            string sourceStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string randStr = "";
            int randN;
            var rnd = new Random(s * unchecked((int)DateTime.Now.Ticks));
            for (var i = 0; i < length; i++)
            {
                randN = rnd.Next(sourceStr.Length);
                randStr += sourceStr[randN];
            }
            return randStr;
        }

    }
}
