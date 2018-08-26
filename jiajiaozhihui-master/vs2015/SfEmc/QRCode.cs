using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using com.google.zxing;
using COMMON = com.google.zxing.common;
using System.Drawing;

namespace SfSoft.SfEmc
{
    /// <summary>
    /// 
    /// </summary>
    public class QRCode
    {
        /// <summary>
        /// 生成二维图像
        /// </summary>
        /// <param name="content">要转换二维码的文字</param>
        /// <param name="path">存储的二维码路径及名称</param>
        /// <param name="size">二维码大小</param>
        /// <returns>1:参数不以为空</returns>
        public string WriteBarcode(string content, string path,int size=350)
        {
            string result = "";
            try
            {
                COMMON.ByteMatrix byteMatrix = new MultiFormatWriter().encode(content.Trim(), BarcodeFormat.QR_CODE, size, size);
                writeToFile(byteMatrix, System.Drawing.Imaging.ImageFormat.Png, path);
            }
            catch (Exception ex) {
                result = ex.ToString();
            }
            return result;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public string  ReadBarcode(string path) 
        {
            string  result = "";
            Image img = Image.FromFile(path);
            Bitmap bmap=null;
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
                code = new MultiFormatReader().decode(bitmap);
                result = code.ToString();
            }
            catch (ReaderException re)
            {
                result = re.ToString();
            }
            return result;
        }
        private  void writeToFile(COMMON.ByteMatrix matrix, System.Drawing.Imaging.ImageFormat format, string file)
        {
            System.Drawing.Imaging.EncoderParameters eps = new System.Drawing.Imaging.EncoderParameters();
            eps.Param[0] = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 100L);
            Bitmap bmap = toBitmap(matrix);
            bmap.Save(file, format);
        }
        private  Bitmap toBitmap(COMMON.ByteMatrix matrix)
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
            return bmap;
        }
    }
}
