using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace SfSoft.web.Test.WorkerAndCustomer
{
    public class Customer
    {
        private string _Name;
        /// <summary>
        /// 消费者名
        /// </summary>
        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 产品缓存队列
        /// </summary>
        private WorkQueue<List<ProductModel>> _queue;
        /// <summary>
        /// 消费线程
        /// </summary>
        public Thread _thread;
        /// <summary>
        /// 消费者等待时间
        /// </summary>
        private int Spead = 5000;

        public Customer(WorkQueue<List<ProductModel>> queue)
        {
            this._queue = queue;
            _thread = new Thread(new ThreadStart(Start));
            _thread.Name = "消费者";
        }
        public void Start()
        {
            while (true) {
                if (!IsWait())
                {

                }
                else {
                    Thread.Sleep(Spead);
                    Console.WriteLine(string.Format("{0} Wait for Cusuming", _thread.Name));
                }
            }
        }
        public bool IsWait()
        {
            return _queue.IsEmpty;
        }
        public void Cusum()
        {
            List<ProductModel> box = this._queue.TryDequeueBox();
        }
    }
}