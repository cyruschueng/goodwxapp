namespace WebLogView
{
    partial class Main
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Main));
            this.btnAddLog = new System.Windows.Forms.Button();
            this.btnViewLog = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnAddLog
            // 
            this.btnAddLog.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnAddLog.Location = new System.Drawing.Point(0, 0);
            this.btnAddLog.Name = "btnAddLog";
            this.btnAddLog.Size = new System.Drawing.Size(1008, 115);
            this.btnAddLog.TabIndex = 0;
            this.btnAddLog.Text = "添加日志";
            this.btnAddLog.UseVisualStyleBackColor = true;
            this.btnAddLog.Click += new System.EventHandler(this.btnAddLog_Click);
            // 
            // btnViewLog
            // 
            this.btnViewLog.Dock = System.Windows.Forms.DockStyle.Top;
            this.btnViewLog.Location = new System.Drawing.Point(0, 115);
            this.btnViewLog.Name = "btnViewLog";
            this.btnViewLog.Size = new System.Drawing.Size(1008, 120);
            this.btnViewLog.TabIndex = 1;
            this.btnViewLog.Text = "显示日志";
            this.btnViewLog.UseVisualStyleBackColor = true;
            this.btnViewLog.Click += new System.EventHandler(this.btnViewLog_Click);
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1008, 729);
            this.Controls.Add(this.btnViewLog);
            this.Controls.Add(this.btnAddLog);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Main";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "主窗口";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnAddLog;
        private System.Windows.Forms.Button btnViewLog;
    }
}