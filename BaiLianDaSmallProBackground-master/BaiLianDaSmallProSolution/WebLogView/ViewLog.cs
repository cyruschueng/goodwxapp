using MyUntil;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WebLogView
{
    public partial class ViewLog : Form
    {
        private int pageIndex = 0;
        public ViewLog()
        {
            InitializeComponent();
        }

        private void btnPrev_Click(object sender, EventArgs e)
        {
            if (pageIndex <= 0)
            {
                return;
            }
            else
            {
                pageIndex--;
            }
            this.rtbView.Text = ShowLog();
        }

        private void btnNext_Click(object sender, EventArgs e)
        {
            pageIndex++;
            this.rtbView.Text = ShowLog();
        }

        private string ShowLog()
        {
            var log = "";
            try
            {
                log = WebLogHelper.GetWebLog(pageIndex, 1);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

            return log;
        }

        private void ViewLog_Load(object sender, EventArgs e)
        {
            this.rtbView.Text = ShowLog();
        }
    }
}
