using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.Manage.Common
{
    public class CommonFile
    {
        public byte[] ReadCommonFile(string  abousePaths)
        {
            byte[] buffer = null;
            using (FileStream fs = new FileStream(abousePaths, FileMode.Open))
            { 
                //获取文件大小
                long size = fs.Length;
                buffer = new byte[size];
                //将文件读到byte数组中
                fs.Read(buffer, 0, buffer.Length);
                fs.Close();
            };
            return buffer;
        }
    }
}