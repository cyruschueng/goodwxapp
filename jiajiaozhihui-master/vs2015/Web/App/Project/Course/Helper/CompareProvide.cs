using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class CompareProvide
    {
        public delegate bool EqualsComparer<T>(T x, T y);
        public class Compare<T> : IEqualityComparer<T>
        {
            private EqualsComparer<T> _equalsComparer;
            public Compare(EqualsComparer<T> equalsComparer)
            {
                this._equalsComparer = equalsComparer;
            }
            public bool Equals(T x, T y)
            {
                if (null != this._equalsComparer)
                    return this._equalsComparer(x, y);
                else
                    return false;
            }

            public int GetHashCode(T obj)
            {
                return obj.ToString().GetHashCode();
            }
        }
    }
}