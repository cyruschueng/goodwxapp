using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Test.WorkerAndCustomer
{
    public class WorkQueue<T>: ConcurrentQueue<T>
    {
        public int MaxSize = 10;//队列最大值

        public void EnqueueBox(T box)
        {
            if (this.MaxSize > this.Count)
            {
                this.Enqueue(box);
            }
        }
        public T TryDequeueBox()
        {
            T _obj = default(T);
            if (!this.IsEmpty)//如果队列不为空，也就是有产品
                this.TryDequeue(out _obj);
            return _obj;
        }
    }
    
}