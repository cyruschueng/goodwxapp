import utils from '../../utils/index.js';

const links = [
  { label: '录音功能', url: '/pages/record/index' },
  { label: 'Promisify', url: '/pages/promisify/index' }
]

Page({
  data: {
    color: '#ccc',
    links
  },

  onLoad() {
    console.log('page onload');
  },

  onShow() {
    console.log('page onshow');

    let tick = 0;
    const tid = setInterval(() => {
      this.setData({
        color: utils.color.random()
      });

      tick += 1;
      if (tick >= 5) {
        clearInterval(tid);
      }
    }, 1000);
  },

  onToast() {
    utils.toast.show({
      title: 'toast showing',
      icon: 'success'
    });
  },

  onLoading() {
    utils.loading.show({
      title: 'Hi! Loading!'
    });

    setTimeout(() => {
      utils.loading.hide();
    }, 1000);
  },

  onRequest() {
    const url = 'https://example.com/';
    utils.http.get(url)
    .then((res) => {
      console.log('index.onRequest:', res);
    });
  }
})
