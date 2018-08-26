define("js/pages/pages2d/bl.js", (dataAndEvents, deepDataAndEvents, ctx) => {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {?} px
   * @param {?} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   * @return {undefined}
   */
  function draw(ctx, px, y, width, height, radius) {
    if (!(isNaN(radius) || radius < 1)) {
      radius |= 0;
      let data;
      let i;
      let x;
      let _p;
      let p;
      let offset;
      let yi;
      let yw;
      let r_sum;
      let g_sum;
      let b_sum;
      let a_sum;
      let r_out_sum;
      let g_out_sum;
      let b_out_sum;
      let a_out_sum;
      let r_in_sum;
      let g_in_sum;
      let b_in_sum;
      let a_in_sum;
      let pr;
      let pg;
      let pb;
      let pa;
      let rbs;
      /** @type {CanvasRenderingContext2D} */
      const context = ctx;
      const pixels = (data = context.getImageData(px, y, width, height)).data;
      const _len4 = radius + radius + 1;
      /** @type {number} */
      const widthMinus1 = width - 1;
      /** @type {number} */
      const heightMinus1 = height - 1;
      const radiusPlus1 = radius + 1;
      /** @type {number} */
      const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      const stackStart = new BlurStack;
      let stack = stackStart;
      /** @type {number} */
      _p = 1;
      for (;_p < _len4;_p++) {
        if (stack = stack.next = new BlurStack, _p == radiusPlus1) {
          var stackEnd = stack
        }
      }
      stack.next = stackStart;
      /** @type {null} */
      let stackIn = null;
      /** @type {null} */
      let stackOut = null;
      /** @type {number} */
      yw = yi = 0;
      const mul_sum = blur_mul_table[radius];
      const shg_sum = blur_shg_table[radius];
      /** @type {number} */
      x = 0;
      for (;x < height;x++) {
        /** @type {number} */
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
        /** @type {number} */
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        /** @type {number} */
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        /** @type {number} */
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        /** @type {number} */
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        /** @type {number} */
        _p = 0;
        for (;_p < radiusPlus1;_p++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }
        /** @type {number} */
        _p = 1;
        for (;_p < radiusPlus1;_p++) {
          /** @type {number} */
          p = yi + ((widthMinus1 < _p ? widthMinus1 : _p) << 2);
          r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _p);
          g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
          b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
          a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;
          stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        /** @type {number} */
        i = 0;
        for (;i < width;i++) {
          /** @type {number} */
          pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
          if (0 != pa) {
            /** @type {number} */
            pa = 255 / pa;
            /** @type {number} */
            pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
            /** @type {number} */
            pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
            /** @type {number} */
            pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
          } else {
            /** @type {number} */
            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
          }
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;
          /** @type {number} */
          p = yw + ((p = i + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
          r_sum += r_in_sum += stackIn.r = pixels[p];
          g_sum += g_in_sum += stackIn.g = pixels[p + 1];
          b_sum += b_in_sum += stackIn.b = pixels[p + 2];
          a_sum += a_in_sum += stackIn.a = pixels[p + 3];
          stackIn = stackIn.next;
          r_out_sum += pr = stackOut.r;
          g_out_sum += pg = stackOut.g;
          b_out_sum += pb = stackOut.b;
          a_out_sum += pa = stackOut.a;
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;
          stackOut = stackOut.next;
          yi += 4;
        }
        yw += width;
      }
      /** @type {number} */
      i = 0;
      for (;i < width;i++) {
        /** @type {number} */
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
        /** @type {number} */
        r_out_sum = radiusPlus1 * (pr = pixels[yi = i << 2]);
        /** @type {number} */
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        /** @type {number} */
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        /** @type {number} */
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        /** @type {number} */
        _p = 0;
        for (;_p < radiusPlus1;_p++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }
        /** @type {number} */
        offset = width;
        /** @type {number} */
        _p = 1;
        for (;_p <= radius;_p++) {
          /** @type {number} */
          yi = offset + i << 2;
          r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - _p);
          g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
          b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
          a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;
          stack = stack.next;
          if (_p < heightMinus1) {
            offset += width;
          }
        }
        /** @type {number} */
        yi = i;
        stackIn = stackStart;
        stackOut = stackEnd;
        /** @type {number} */
        x = 0;
        for (;x < height;x++) {
          /** @type {number} */
          pixels[(p = yi << 2) + 3] = pa = a_sum * mul_sum >> shg_sum;
          if (pa > 0) {
            /** @type {number} */
            pa = 255 / pa;
            /** @type {number} */
            pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
            /** @type {number} */
            pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
            /** @type {number} */
            pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
          } else {
            /** @type {number} */
            pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
          }
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;
          /** @type {number} */
          p = i + ((p = x + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
          r_sum += r_in_sum += stackIn.r = pixels[p];
          g_sum += g_in_sum += stackIn.g = pixels[p + 1];
          b_sum += b_in_sum += stackIn.b = pixels[p + 2];
          a_sum += a_in_sum += stackIn.a = pixels[p + 3];
          stackIn = stackIn.next;
          r_out_sum += pr = stackOut.r;
          g_out_sum += pg = stackOut.g;
          b_out_sum += pb = stackOut.b;
          a_out_sum += pa = stackOut.a;
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;
          stackOut = stackOut.next;
          yi += width;
        }
      }
      context.putImageData(data, px, y);
      console.log("end ?");
    }
  }
  /**
   * @return {undefined}
   */
  function BlurStack() {
    /** @type {number} */
    this.r = 0;
    /** @type {number} */
    this.g = 0;
    /** @type {number} */
    this.b = 0;
    /** @type {number} */
    this.a = 0;
    /** @type {null} */
    this.next = null;
  }
  Object.defineProperty(ctx, "__esModule", {
    value : true
  });
  /** @type {function (CanvasRenderingContext2D, ?, ?, number, number, number): undefined} */
  ctx.stackBlurCanvasRGBA = draw;
  /** @type {Array} */
  var blur_mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 
  446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 
  433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
  /** @type {Array} */
  var blur_shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 
  22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 
  24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
});
