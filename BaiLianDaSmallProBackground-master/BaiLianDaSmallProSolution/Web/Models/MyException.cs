using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Web.Models
{
    public class MyException : HttpResponseException
    {
        public MyException(HttpResponseMessage response) : base(response)
        {

        }

        public static HttpResponseMessage GetMyResponse(HttpStatusCode statusCode, StringContent content,string reasonPhrase)
        {
            return new HttpResponseMessage()
            {
                StatusCode = statusCode,
                Content = content,
                ReasonPhrase = reasonPhrase
            };
        }
    }


}