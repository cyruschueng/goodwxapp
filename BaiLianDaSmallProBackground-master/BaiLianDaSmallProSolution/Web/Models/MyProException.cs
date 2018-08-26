using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Web.Models
{
    public class MyProException : Exception
    {
        public MyProException()
        {

        }

        public MyProException(string message)
            : base(message)
        {
        }

        public MyProException(string messageFormat, params object[] args)
            : base(string.Format(messageFormat, args))
        {
        }

        protected MyProException(SerializationInfo
            info, StreamingContext context)
            : base(info, context)
        {
        }

        public MyProException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}