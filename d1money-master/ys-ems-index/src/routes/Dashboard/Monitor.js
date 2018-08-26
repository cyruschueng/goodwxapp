import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Tooltip} from 'antd';
import 'antd/lib/modal/style/index.css';
import numeral from 'numeral';
import LzEditor from 'react-lz-editor'
import {Pie, WaterWave, Gauge, TagCloud} from '../../components/Charts';
import NumberInfo from '../../components/NumberInfo';
import CountDown from '../../components/CountDown';
import ActiveChart from '../../components/ActiveChart';

import styles from './Monitor.less';

const targetTime = new Date().getTime() + 3900000;

@connect(state => ({
    monitor: state.monitor,
}))
export default class Monitor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: "",
            markdownContent: "## 二级标题 HEAD 2 \n markdown 格式示例 \n ``` 欢迎使用 ```",
            rawContent: '{"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://image.qiluyidian.mobi/4305350813991067' +
            '8747.jpg"}},"1":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://image.qiluyidian.mobi/430535081399106787' +
            '47.jpg"}}},"blocks":[{"key":"fr2lj","text":"正文示例","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[]' +
            ',"data":{}},{"key":"90kdv","text":"一度金融的消息称，乐视金融同数码视讯的接触尚处在高层范围内进行，因此对于收购价格，暂时还不能确定。","type":"unstyled","depth":0,"inlin' +
            'eStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b60ni","text":"如果乐视金融拿下数码视讯的两张金融牌照，并且在到期后能够获得央行审核顺利延期，意味着乐视可以通过移动设' +
            '备和电视两个终端来链接用户的银行卡。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eui4h","text' +
            '":"乐视金融在去年11月份首度公开亮相的时候，缺少银行和支付两张关键牌照就一直是外界关注的问题。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' +
            '"data":{}},{"key":"29t6l","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"lengt' +
            'h":1,"key":0}],"data":{}},{"key":"7ujeo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' +
            '"data":{}},{"key":"3n9d4","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"lengt' +
            'h":1,"key":1}],"data":{}},{"key":"9r0k2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],' +
            '"data":{}}]}',
            responseList: []
        }
        this.receiveHtml = this.receiveHtml.bind(this);
        this.receiveMarkdown = this.receiveMarkdown.bind(this);
        this.receiveRaw = this.receiveRaw.bind(this);
        this.onChange = this.onChange.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.getSignature = this.getSignature.bind(this);
        this.getPolicy = this.getPolicy.bind(this);
    }
    receiveHtml(content) {
        console.log("recieved HTML content", content);
        this.setState({responseList:[]});
    }
    componentDidMount() {}
    receiveMarkdown(content) {
        console.log("recieved markdown content", content);
    }
    receiveRaw(content) {
        console.log("recieved Raw content", content);
    }
    onChange(info) {
        // console.log("onChange:", info);
        // console.log("upload onChange this.state.files",this.state.files,info)
        let currFileList = info.fileList;

        currFileList = currFileList.filter((f) => (!f.length));
        let url = "http://devopee.b0.upaiyun.com";
        //读取远程路径并显示链接
        currFileList = currFileList.map((file) => {
            if (file.response) {
                // 组件会将 file.url 作为链接进行展示
                file.url = url + file.response.url;
            }
            if (!file.length) {
                return file;
            }
        });
        let _this = this;
        //按照服务器返回信息筛选成功上传的文件
        currFileList = currFileList.filter((file) => {
            //根据多选选项更新添加内容
            let hasNoExistCurrFileInUploadedList = !~findIndex(_this.state.responseList, item => item.name === file.name)
            if (hasNoExistCurrFileInUploadedList) {
                if (!!_this.props.isMultiple == true) {
                    _this.state.responseList.push(file);
                } else {
                    _this.state.responseList = [file];
                }
            }
            return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
        });
        currFileList = uniqBy(currFileList, "name");
        if (!!currFileList && currFileList.length != 0) {
            // console.log("upload set files as fileList", currFileList);
            this.setState({responseList: currFileList});
        }
        _this.forceUpdate();
    }
    beforeUpload(file) {
        console.log("beforeUpload like", file);
    }
    getSignature(fileName) {
        let now = new Date();
        let h = hmacsha1('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
        let Signature = Base64.encode(h);
        return Signature;
    }
    getPolicy(fileName) {
        let now = new Date();
        let afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000); //过期时间1小时后
        let policy = Base64.encode(JSON.stringify({
            "bucket": "devopee",
            "save-key": "/" + fileName,
            "expiration": Math.round(afterHour.getTime() / 1000),
            "date": now
        }));
        return policy;
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'monitor/fetchTags',
        });
    }

    render() {
        const {monitor} = this.props;
        const {tags} = monitor;

        const uploadConfig = {
            QINIU_URL: "http://up.qiniu.com", //上传地址，现在暂只支持七牛上传
            QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求图片的token
            QINIU_PFOP: {
                url: "http://www.yourServerAddress.mobi/doQiniuPicPersist.do" //七牛持久保存请求地址
            },
            QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do", //请求媒体资源的token
            QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.mobi/getUptokenOfQiniu.do?name=patch", //其他资源的token的获取
            QINIU_DOMAIN_IMG_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀
            QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀
            QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/", //其他文件地址前缀
        }

        let policy = "";

        //uploadProps 配置方法见 https://ant.design/components/upload-cn/
        const uploadProps = {
            action: "http://v0.api.upyun.com/devopee",
            onChange: this.onChange,
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => { //自定义上传参数，这里使用UPYUN
                return {
                    Authorization: "UPYUN reactlzeditor:" + this.getSignature(file.name),
                    policy: (() => {
                        policy = this.getPolicy(file.name);
                        return policy;
                    })(),
                    signature: md5(policy + '&pLv/J4I6vfpeznxtwU+g/dsUcEY=')
                }
            },
            multiple: true,
            beforeUpload: this.beforeUpload,
            showUploadList: true
        }
        return (
            <div>
                <div>
                    <LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml}
                              uploadProps={uploadProps}/>
                </div>
                <Row gutter={24}>
                    <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="活动实时交易情况" bordered={false}>
                            <Row>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberInfo
                                        subTitle="今日交易总额"
                                        suffix="元"
                                        total={numeral(124543233).format('0,0')}
                                    />
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberInfo
                                        subTitle="销售目标完成率"
                                        total="92%"
                                    />
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberInfo
                                        subTitle="活动剩余时间"
                                        total={<CountDown target={targetTime}/>}
                                    />
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberInfo
                                        subTitle="每秒交易总额"
                                        suffix="元"
                                        total={numeral(234).format('0,0')}
                                    />
                                </Col>
                            </Row>
                            <div className={styles.mapChart}>
                                <Tooltip title="等待后期实现">
                                    <img src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                                         alt="map"/>
                                </Tooltip>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                        <Card title="活动情况预测" style={{marginBottom: 24}} bordered={false}>
                            <ActiveChart/>
                        </Card>
                        <Card
                            title="券核效率"
                            style={{marginBottom: 24}}
                            bodyStyle={{textAlign: 'center'}}
                            bordered={false}
                        >
                            <Gauge
                                format={(val) => {
                                    switch (parseInt(val, 10)) {
                                        case 20:
                                            return '差';
                                        case 40:
                                            return '中';
                                        case 60:
                                            return '良';
                                        case 80:
                                            return '优';
                                        default:
                                            return '';
                                    }
                                }}
                                title="跳出率"
                                height={180}
                                percent={87}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xl={12} lg={24} sm={24} xs={24}>
                        <Card
                            title="各品类占比"
                            style={{marginBottom: 24}}
                            bordered={false}
                            className={styles.pieCard}
                        >
                            <Row gutter={4} style={{padding: '16px 0'}}>
                                <Col span={8}>
                                    <Pie
                                        animate={false}
                                        percent={28}
                                        subTitle="中式快餐"
                                        total="28%"
                                        height={128}
                                        lineWidth={2}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Pie
                                        animate={false}
                                        color="#5DDECF"
                                        percent={22}
                                        subTitle="西餐"
                                        total="22%"
                                        height={128}
                                        lineWidth={2}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Pie
                                        animate={false}
                                        color="#2FC25B"
                                        percent={32}
                                        subTitle="火锅"
                                        total="32%"
                                        height={128}
                                        lineWidth={2}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="热门搜索" bordered={false} bodyStyle={{overflow: 'hidden'}}>
                            <TagCloud
                                data={tags}
                                height={161}
                            />
                        </Card>
                    </Col>
                    <Col xl={6} lg={12} sm={24} xs={24} style={{marginBottom: 24}}>
                        <Card title="资源剩余" bodyStyle={{textAlign: 'center', fontSize: 0}} bordered={false}>
                            <WaterWave
                                height={161}
                                title="补贴资金剩余"
                                percent={34}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
