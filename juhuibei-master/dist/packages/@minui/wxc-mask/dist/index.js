function hexToRgb(hex) {
  let color = [];
  let rgb = [];

  hex = hex.replace(/#/, '');

  if (hex.length === 3) {
    let tmp = [];

    for (let i = 0; i < 3; i++) {
      tmp.push(hex.charAt(i) + hex.charAt(i));
    }

    hex = tmp.join('');
  }

  for (let i = 0; i < 3; i++) {
    color[i] = '0x' + hex.substr(i * 2, 2);
    rgb.push(parseInt(Number(color[i])));
  }

  return rgb.join(',');
}

export default Component({
  properties: {
    status: {
      type: String,
      value: 'hide',
      observer: function (newStatusValue) {
        this.setData({
          status: newStatusValue
        });
      }
    },
    opacity: {
      type: [String, Number],
      value: 0.6
    },
    backgroundColor: {
      type: String,
      value: '#000000'
    },
    locked: {
      type: [String],
      value: 'hide'
    },
    contentAlign: {
      type: String,
      value: 'tl'
    },
    __positionStyle: {
      type: String,
      value: 'top:0; left:0'
    }
  },

  data: {},

  methods: {
    omMaskTap: function () {
      let data = this.data;

      if (data.locked && data.locked !== 'true') {
        this.setData({
          status: 'hide'
        });
      }
    }
  },

  attached: function () {
    let data = this.data;

    this.setData({
      backgroundColor: hexToRgb(data.backgroundColor)
    });

    let contentAlignStyle;

    switch (data.contentAlign) {
      case 'tl':
        {
          contentAlignStyle = 'top:0; left:0';
          break;
        }

      case 'tr':
        {
          contentAlignStyle = 'top:0; right:0';
          break;
        }

      case 'bl':
        {
          contentAlignStyle = 'bottom:0; left:0';
          break;
        }

      case 'br':
        {
          contentAlignStyle = 'bottom:0; right:0';
          break;
        }
    }

    this.setData({
      __positionStyle: contentAlignStyle
    });
  }
});