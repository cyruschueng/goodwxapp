## formId 封装组件

### 使用方法

注：该组件依赖 `/lib` 目录下 `request.js` 和 `Promisify.js` 文件

1. 目录：[component/fromid-custom](/component/formid-custom) 下
2. 在需要引入组件的页面中的 `json` 文件中配置如下：
    
    ```json
    "usingComponents": {
      "formid-custom": "../../component/formid-custom/formid-custom"
    }
    ```
3. 在 `wxml` 中使用：
    
    ```html
    <formid-custom bind:taphandle="tap1">
      <!-- ...content... -->
    </formid-custom>
    ```
4. 在 `js` 中指明 `taphandle` 事件
    
    ```js
    // ···
    tap1: function(e) {
      console.log(e.detail.fromId)
    }
    // ···
    ```

### 事件

|    名称     |  是否必须  |   类型    |   参数    |
| ---------- |  -------  | -------- | -------- |
| taphandle  |   true    | Function | e（小程序中的点击事件event，formId绑定在e.detail.fromId） |