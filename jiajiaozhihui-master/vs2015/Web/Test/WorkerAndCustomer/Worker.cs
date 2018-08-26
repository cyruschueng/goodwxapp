using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace SfSoft.web.Test.WorkerAndCustomer
{
    /// <summary>
    /// 产品类名
    /// </summary>
    public enum ProductType
    {
        Phone,
        Computer,
        Pad
    }
    public class Worker
    {
        private string _Name;
        /// <summary>
        /// 生产者名称
        /// </summary>
        public string Name {
            get { return _Name; }
            set { _Name = value; }
        }
        /// <summary>
        /// 生产盒子
        /// </summary>
        private List<ProductModel> _ProductBox;
        /// <summary>
        /// 生产者等待时间
        /// </summary>
        private int Speed = 1000;
        /// <summary>
        /// 工作线程
        /// </summary>
        public Thread _thread;
        /// <summary>
        /// 工作队列
        /// </summary>
        private WorkQueue<List<ProductModel>> _queue;

        public Worker(WorkQueue<List<ProductModel>> queue)
        {
            this._queue = queue;
            _ProductBox = new List<ProductModel>();
            _thread = new Thread(new ThreadStart(Start));
        }
        private void Start()
        {
            while (true) {
                if (IsWait()) {
                    ProductModel product = CreateProduct();
                    InsertBox(product);
                }
            }
        }
        private bool IsWait()
        {
            return _queue.MaxSize == _queue.Count;
        }
        /// <summary>
        /// 生成一个产品
        /// </summary>
        /// <returns></returns>
        public ProductModel CreateProduct()
        {
            
            int randomindex = new Random().Next(1, 4);

            ProductType productType = (ProductType)randomindex;
            ProductModel product = new ProductModel()
            {
                Id = System.Guid.NewGuid().ToString(),
                Name = SelectProductType(productType),
                CreateBy = this._Name,
                DateTime = DateTime.Now
            };

            return product;
        }

        /// <summary>
        /// 随机获取产品名
        /// </summary>
        /// <param name="TypeIndex"></param>
        /// <returns></returns>
        public string SelectProductType(ProductType TypeIndex)
        {
            ProductType productType = ProductType.Phone;

            switch (TypeIndex)
            {
                case ProductType.Phone: productType = ProductType.Phone; break;
                case ProductType.Computer: productType = ProductType.Computer; break;
                case ProductType.Pad: productType = ProductType.Pad; break;
                default: productType = ProductType.Phone; break;
            }

            return productType.ToString();
        }
        /// <summary>
        /// 装箱发送
        /// </summary>
        /// <param name="product"></param>
        public void InsertBox(ProductModel product)
        {

            //小于5个产品，都装箱
            if (_ProductBox.Count < 5)
            {
                _ProductBox.Add(product);
                Console.WriteLine(string.Format("{0}生产产品正在装箱", this.Name));
            }
            else
            {
                Send();
                Console.WriteLine(string.Format("{0}装满一箱放入队列", this.Name));

            }
        }
        /// <summary>
        /// 发送给缓冲区队列
        /// </summary>
        public void Send()
        {
            List<ProductModel> list = new List<ProductModel>();//地址传递必须重新赋值操作---深拷贝

            foreach (ProductModel item in _ProductBox)
            {
                list.Add(item);
            }

            _queue.EnqueueBox(list);
            _ProductBox.Clear();//清空盒子
        }
    }
}