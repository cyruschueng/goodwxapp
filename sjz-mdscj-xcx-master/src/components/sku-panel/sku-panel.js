import { Component, PropTypes } from 'labrador-immutable';
// import { connect } from 'labrador-redux';
// import skuItem from '../sku-item/sku-item';
import counter from '../counter/counter';

class skuPanel extends Component {
  static propTypes = {
    show: PropTypes.bool,
    imgUrl: PropTypes.string,
    defaultPrice: PropTypes.number,
    defaultAmount: PropTypes.number,
    skuVOs: PropTypes.array,
    skuDimensions: PropTypes.array,
    onClose: PropTypes.func,
    onBuy: PropTypes.func
  };

  static defaultProps = {
    show: false,
    imgUrl: '',
    defaultPrice: 0,
    defaultAmount: 0,
    skuDimensions: [],
    skuCurrentType: 'NONE',
    promotion: {}    
  };

  state = {
    initialized: false,
    skuCount: 1,
    selectedSku: {},
    skuInfo: {
      price: '...',
      amount: '...',
      skuStr: '请选择规格',
      imgUrl: ''
    },
    currentVOId: 0,
    skuType: 'NONE'
  };

  onUpdate (props) {
    const { skuCurrentType } = props;
    let { initialized, skuType } = this.state;
    if (props.show && !this.props.show) {
      if (!initialized || skuType !== skuCurrentType) {
        this.setState({
          skuInfo: {
            price: this.props.defaultPrice / 100,
            amount: this.props.defaultAmount,
            skuStr: '请选择规格',
            imgUrl: this.props.imgUrl
          },
          initialized: true,
          skuType: skuCurrentType
        });
  
        // 如果只有一个sku，则默认选中
        this.props.skuDimensions.forEach(dimension => {
          let onlyOneSku = dimension.listSkuDimensionData.length === 1;
          if (onlyOneSku) {
            let sku = dimension.listSkuDimensionData[0];
            let dId = dimension.id;
            let sId = sku.id;
            this.setState({
              selectedSku: this.state.selectedSku.set(dId, {
                id: sId,
                dId,
                name: `${dimension.specName}: ${sku.name}`
              })
            }, this.updateSkuInfo);
          }
        });
      } else {
        console.log('aaa');
        this.updateSkuInfo();
      }
    }
  }

  children () {
    const {amount} = this.state.skuInfo;
    let maxCount = typeof amount === 'number' ? amount : 99;
    const { promotion: { maxPurchaseNumber }, skuCurrentType } = this.props;
    if (skuCurrentType === 'TUAN' && maxPurchaseNumber && (maxCount > maxPurchaseNumber)) {
      maxCount = maxPurchaseNumber;
    }
    return {
      counter: {
        component: counter,
        props: {
          min: maxCount === 0 ? maxCount : 1,
          max: maxCount,
          value: this.state.skuCount,
          onChange: (value) => {
            this.setState({skuCount: value});
          }
        }
      }
    };
  }

  handleClose () {
    this.props.onClose();
  }

  handleBodyTap () {

  }

  handleOkTap () {
    if (!this.state.currentVOId) {
      wx.showModal({
        title: '提示',
        content: '请选择商品类型',
        showCancel: false,
        confirmText: '确认',
        confirmColor: '#FF2551',
        complete: function(res) {
          return;
        }
      });
    }
    if (this.state.skuCount > 0 && this.state.currentVOId) {
      this.props.onBuy(this.state.currentVOId, this.state.skuCount);
    }
  }

  updateSkuInfo = () => {
    const {selectedSku} = this.state;
    const {skuVOs, skuDimensions, defaultPrice, defaultAmount, imgUrl, skuCurrentType} = this.props;
    const skus = Object.values(selectedSku)
      .filter(i => i)
      .sort((a, b) => a.dId - b.dId);

    const newSkuInfo = {};

    if (skus.length < skuDimensions.length) {
      newSkuInfo.price = defaultPrice;
      newSkuInfo.amount = defaultAmount;
      newSkuInfo.skuStr = skus.length > 0
        ? skus.map(i => i.name).join('; ')
        : '请选择规格';
      newSkuInfo.imgUrl = imgUrl;
      this.setState({currentVOId: 0});
    } else {
      const thisIdStr = skus.map(i => i.id).join('-');
      let targetIndex = -1;
      for (let i = 0; i < skuVOs.length; i++) {
        const item = skuVOs[i];

        const thatIdStr = item.skuDimensionIds
          .asMutable()
          .sort((a, b) => a - b).join('-');

        if (thisIdStr === thatIdStr) {
          targetIndex = i;
          break;
        }
      }

      const targetVO = skuVOs[targetIndex];

      if (targetVO) {
        newSkuInfo.imgUrl = targetVO.imgUrl || imgUrl;
        newSkuInfo.skuStr = targetVO.spec;
        newSkuInfo.price = skuCurrentType !== 'NONE' ? targetVO.promotionPrice : targetVO.discountPrice || targetVO.price;
        newSkuInfo.amount = skuCurrentType !== 'NONE' ? targetVO.promotionAmount : targetVO.amount;

        this.setState({currentVOId: targetVO.id});
        if (newSkuInfo.amount === 0) {
          this.setState({skuCount: 0});
        } else if (this.state.skuCount === 0) {
          this.setState({skuCount: 1});
        } else if (newSkuInfo.amount < this.state.skuCount) {
          this.setState({skuCount: newSkuInfo.amount});
        }
      }
    }

    if ( newSkuInfo.skuStr.slice(-1) === '；') {
      newSkuInfo.skuStr = newSkuInfo.skuStr.slice(0, newSkuInfo.skuStr.length - 1);
    }
    newSkuInfo.price && (newSkuInfo.price = newSkuInfo.price / 100);
    this.setState({skuInfo: newSkuInfo});
  };

  handleSkuSelect (e) {
    const {sku, dimension} = e.target.dataset;
    const dId = dimension.id;
    const sId = sku.id;

    const selectStatus = this.state.selectedSku[dId];
    if (selectStatus && selectStatus.id === sId) {
      this.setState({
        selectedSku: this.state.selectedSku.set(dId, null)
      }, this.updateSkuInfo);

      return;
    }

    this.setState({
      selectedSku: this.state.selectedSku.set(dId, {
        id: sId,
        dId,
        name: `${dimension.specName}: ${sku.name}`
      })
    }, this.updateSkuInfo);
  }
}

export default skuPanel;
