using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Pages
{
    public class PageList<T> : IPageList<T>
    {
        public IEnumerable<T> Datas { get; set; }

        public int TotalRecords { get; set; }

        public PageList(IQueryable<T> query, int page, int size)
        {
            this.TotalRecords = query.Count();
            query = query.Skip(page * size).Take(size);
            this.Datas = query.ToList();
        }
    }
}
