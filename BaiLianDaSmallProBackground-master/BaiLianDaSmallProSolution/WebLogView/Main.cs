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
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
        }

        private void btnAddLog_Click(object sender, EventArgs e)
        {
            var addLog = new AddLog();
            addLog.ShowDialog();
        }

        private void btnViewLog_Click(object sender, EventArgs e)
        {
            var viewLog = new ViewLog();
            viewLog.ShowDialog();
        }
    }
}
