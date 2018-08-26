using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_AttFiles 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_AttFiles
    {
        public Pub_AttFiles()
        { }
        #region Model
        private int _id;
        private string _filename;
        private string _filepath;
        private string _mid;
        private string _docid;
        private string _classid;
        /// <summary>
        /// 
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FileName
        {
            set { _filename = value; }
            get { return _filename; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FilePath
        {
            set { _filepath = value; }
            get { return _filepath; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string MID
        {
            set { _mid = value; }
            get { return _mid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocID
        {
            set { _docid = value; }
            get { return _docid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ClassID
        {
            set { _classid = value; }
            get { return _classid; }
        }
        #endregion Model

    }
}

