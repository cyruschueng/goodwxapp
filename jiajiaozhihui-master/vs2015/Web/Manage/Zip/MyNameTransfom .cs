using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Manage.Zip
{
    public class MyNameTransfom : ICSharpCode.SharpZipLib.Core.INameTransform
    {
        public string TransformFile(string name)
        {
            return  System.IO.Path.GetFileName(name);
        }

        public string TransformDirectory(string name)
        {
            return null;
        }
    }
}