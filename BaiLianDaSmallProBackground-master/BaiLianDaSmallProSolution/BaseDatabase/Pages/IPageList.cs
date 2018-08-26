using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseDatabase.Pages
{
    public interface IPageList<T>
    {
        IEnumerable<T> Datas { get; set; }

        int TotalRecords { get; set; }
    }
}
