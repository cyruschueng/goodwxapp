using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Serialization;
using System.Text;

namespace SfSoft.web.App.Helper
{
    public class UnderlineSplitContractResolver : DefaultContractResolver
    {
        protected override string ResolvePropertyName(string propertyName)
        {
            return CamelCaseToUnderlineSplit(propertyName);
        }
        private string CamelCaseToUnderlineSplit(string name)
        {
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < name.Length; i++)
            {
              var ch = name[i];
              if (char.IsUpper(ch) && i == 0)
              {
                  builder.Append(char.ToLower(ch));
              }
              else {
                  builder.Append(ch);
              }
            }
            return builder.ToString();
        }
    }
}