// export function skuInit (component, skuVOs, skuSource, skuKeys) {
//   let component = component;
//   // 拼装sku数据格式
//   for (let i = 0, len = component.proData.skuVOs.length; i < len; i++) {
//     let skuKey = component.proData.skuVOs[i].skuDimensionIds;
//     skuKey.sort((value1, value2) => {
//       return parseInt(value1) - parseInt(value2);
//     });
//     // 生成sku对象
//     component.skuData.skuSource[skuKey.join(';')] = component.proData.skuVOs[i];
//     // 生成skuKeys
//     component.skuData.skuKeys.push(skuKey.join(';'));
//   }
//   // 拼装sku结果集
//   for (let i = 0, len = component.skuData.skuKeys.length; i < len; i++) {
//     let skuKey = component.skuData.skuKeys[i];
//     let sku = component.skuData.skuSource[skuKey];
//     let skuKeyAttrs = skuKey.split(';');
//     // 对每个Sku信息key属性值进行拆分组合
//     let combArr = skuCombInArray(skuKeyAttrs);
//     for (let j = 0; j < combArr.length; j++) {
//       add2SkuResult(combArr[j], sku, component);
//     }
//     // 结果集接放入SKUResult
//     component.skuData.skuResult[skuKeyAttrs.join(';')] = {
//       amount: sku.amount,
//       prices: [sku.price],
//       promotionPrice: [sku.promotionPrice],
//       promotionAmount: sku.promotionAmount,
//       discountPrice: [sku.discountPrice],
//       images: [sku.imgUrl]
//     };
//   }
//   console.log(component.skuData);
// }
// /**
//  * [sku计算相关]
//  * 从数组中生成指定长度的组合
//  * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
//  */
// export function skuCombInArray (aData) {
//   if (!aData || !aData.length) {
//     return [];
//   }
//   let len = aData.length;
//   let aResult = [];
//   for (let n = 1; n < len; n++) {
//     let aaFlags = this.skuGetCombFlags(len, n);
//     while (aaFlags.length) {
//       let aFlag = aaFlags.shift();
//       let aComb = [];
//       for (let i = 0; i < len; i++) {
//         aFlag[i] && aComb.push(aData[i]);
//       }
//       aResult.push(aComb);
//     }
//   }
//   return aResult;
// }
// /**
//  * [sku计算相关]
//  * 得到从 m 元素中取 n 元素的所有组合
//  * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
//  */
// export function skuGetCombFlags(m, n) {
//   if (!n || n < 1) {
//     return [];
//   }
//   let aResult = [];
//   let aFlag = [];
//   let bNext = true;
//   let i, j, iCnt1;
//   for (i = 0; i < m; i++) {
//     aFlag[i] = i < n ? 1 : 0;
//   }
//   aResult.push(aFlag.concat());
//   while (bNext) {
//     iCnt1 = 0;
//     for (i = 0; i < m - 1; i++) {
//       if (aFlag[i] === 1 && aFlag[i + 1] === 0) {
//         for (j = 0; j < i; j++) {
//           aFlag[j] = j < iCnt1 ? 1 : 0;
//         }
//         aFlag[i] = 0;
//         aFlag[i + 1] = 1;
//         let aTmp = aFlag.concat();
//         aResult.push(aTmp);
//         if (aTmp.slice(-n).join('').indexOf('0') === -1) {
//           bNext = false;
//         }
//         break;
//       }
//       aFlag[i] === 1 && iCnt1++;
//     }
//   }
//   return aResult;
// }
// /**
//  * @name [sku计算相关]
//  * @desc 把组合的key放入结果集SKUResult
//  * @param combArrItem
//  */
// export function add2SkuResult(combArrItem, sku, component) {
//   let that = component;
//   let key = combArrItem.join(';');
//   if (that.skuData.skuResult[key]) { // SKU信息key属性·
//     that.skuData.skuResult[key].amount += sku.amount;
//     sku.price && that.skuData.skuResult[key].prices.push(sku.price);
//     that.skuData.skuResult[key].images.push(sku.imgUrl);
//     that.skuData.skuResult[key].promotionAmount += sku.promotionAmount;
//     sku.promotionPrice && that.skuData.skuResult[key].promotionPrice.push(sku.promotionPrice);
//     sku.discountPrice && that.skuData.skuResult[key].discountPrice.push(sku.discountPrice);
//   } else {
//     console.log('single type');
//     that.skuData.skuResult[key] = {
//       amount: sku.amount,
//       single: 'single',
//       prices: [sku.price],
//       promotionPrice: [sku.promotionPrice],
//       promotionAmount: sku.promotionAmount,
//       discountPrice: [sku.discountPrice],
//       images: [sku.imgUrl]
//     };
//   }
// }
