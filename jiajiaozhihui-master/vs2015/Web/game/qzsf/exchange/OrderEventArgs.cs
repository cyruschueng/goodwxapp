using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.qzsf.exchange
{
    public class OrderEventArgs : EventArgs
    {
        public OrderEventArgs(Model.WX_PublicOrder entity)
        {
            this.OrderEntity = entity;
        }
        public Model.WX_PublicOrder OrderEntity
        {
            get;
            private set;
        }
    }
}