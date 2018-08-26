using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MyUntil
{
    public class EncryptHelper
    {
        public static string Md5(string str, string salt)
        {
            MD5 md5Hasher = MD5.Create();

            var d = md5Hasher.ComputeHash(Encoding.UTF8.GetBytes(str + salt));

            var s = new StringBuilder();

            for (int i = 0; i < d.Length; i++)
            {
                s.Append(d[i].ToString("x2"));
            }

            return s.ToString();
        }
    }
}
