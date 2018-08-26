using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ICSharpCode.SharpZipLib.Zip;

namespace SfSoft.web.Manage.Zip
{
    public class ZipFileHelper
    {
        /// <summary>
        /// 一组绝对路径的文件
        /// </summary>
        /// <param name="paths"></param>
        public byte[] ZipFileByCode(List<string> paths)
        {
            MemoryStream ms = new MemoryStream();
            byte[] buffer = null;
            using (ZipFile file = ZipFile.Create(ms)) {
                file.BeginUpdate();
                file.NameTransform = new MyNameTransfom();
                foreach (var p in paths) {
                    file.Add(p);
                }
                file.CommitUpdate();
                buffer = new byte[ms.Length];
                ms.Position = 0;
                ms.Read(buffer, 0, buffer.Length);

                ms.Flush();
                ms.Close();
            }
            return buffer;
        }
    }
}