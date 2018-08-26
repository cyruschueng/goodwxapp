using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using com.google.zxing;
using COMMON = com.google.zxing.common;
using System.Drawing;
using System.Diagnostics;
using ThoughtWorks.QRCode.Codec;
using ThoughtWorks.QRCode.Codec.Data;
using System.Text;

namespace SfSoft.web.emc.wxcourse.card
{
    public class QRCode
    {
        private string cardType="";
        private string cardNo = "";
        public QRCode(string cardType)
        {
            this.cardType=cardType;
        }
        /// <summary>
        /// 生成二维图像
        /// </summary>
        /// <param name="content">要转换二维码的文字</param>
        /// <param name="path">存储的二维码路径及名称</param>
        /// <returns>1:参数不以为空</returns>
        public string WriteBarcode(string content, string path,string cardNo)
        {
            string result = "";
            this.cardNo = cardNo;
            try
            {
                COMMON.ByteMatrix byteMatrix = new MultiFormatWriter().encode(content.Trim(), BarcodeFormat.QR_CODE, 350, 350);
                writeToFile(byteMatrix, System.Drawing.Imaging.ImageFormat.Png, path);
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public string ReadBarcode(string path)
        {
            string result = "";
            Image img = Image.FromFile(path);
            Bitmap bmap = null;
            try
            {
                bmap = new Bitmap(img);
            }
            catch (System.IO.IOException ioe)
            {
                result = ioe.ToString();
            }
            if (bmap == null)
            {
                result = "不是有效的二维码";
            }
            LuminanceSource source = new RGBLuminanceSource(bmap, bmap.Width, bmap.Height);
            com.google.zxing.BinaryBitmap bitmap = new com.google.zxing.BinaryBitmap(new COMMON.HybridBinarizer(source));
            Result code;
            try
            {
                //code = new MultiFormatReader().decode(bitmap);
                //result = code.ToString();
                com.google.zxing.qrcode.QRCodeReader reader = new com.google.zxing.qrcode.QRCodeReader();
                code=reader.decode(bitmap);
                result = code.ToString();
            }
            catch (ReaderException re)
            {
                result = re.ToString();
            }
            return result;
        }
        public string JS(string fileName)
        {
            Image primaryImage = Image.FromFile(fileName);

            Bitmap pImg = (Bitmap)primaryImage;// MakeGrayscale3((Bitmap)primaryImage);
            try
            {
                string decodedString = new QRCodeDecoder().decode(new QRCodeBitmapImage(pImg), Encoding.UTF8);
                return decodedString;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        private void writeToFile(COMMON.ByteMatrix matrix, System.Drawing.Imaging.ImageFormat format, string file)
        {
            System.Drawing.Imaging.EncoderParameters eps = new System.Drawing.Imaging.EncoderParameters();
            eps.Param[0] = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 100L);
            Bitmap bmap = toBitmap(matrix);
            
            bmap.Save(file, format);
        }
        private Bitmap toBitmap(COMMON.ByteMatrix matrix)
        {
            int width = matrix.Width;
            int height = matrix.Height;
            Bitmap bmap = new Bitmap(width, height, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    bmap.SetPixel(x, y, matrix.get_Renamed(x, y) != -1 ? ColorTranslator.FromHtml("0xFF000000") : ColorTranslator.FromHtml("0xFFFFFFFF"));
                }
            }
            Graphics g = Graphics.FromImage(bmap);
            Font f = new Font("Verdana", 25); //字体，大小
            Brush b = new SolidBrush(Color.Gray); //字体颜色

            g.DrawString(this.cardNo+ this.cardType, f, b, 25, 310);    //开始画，及位置
            //g.DrawString( this.cardNo+ this.cardType, f, b, 100, 300);    //开始画，及位置
            g.Dispose();

            return bmap;
        }
    }
}