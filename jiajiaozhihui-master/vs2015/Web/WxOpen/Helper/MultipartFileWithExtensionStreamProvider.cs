using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace SfSoft.web.WxOpen.Helper
{
    public class MultipartFileWithExtensionStreamProvider: MultipartFileStreamProvider
    {
        public MultipartFileWithExtensionStreamProvider(string rootPath)
        : this(rootPath, 4096)
        {
        }
        public MultipartFileWithExtensionStreamProvider(string rootPath, int bufferSize)
        : base(rootPath, bufferSize)
        {
        }
        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            return base.GetLocalFileName(headers) + Path.GetExtension(headers.ContentDisposition.FileName);
        }
    }
}