import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Row, Col, Card, List, Avatar} from 'antd';
import PageHeaderLayout from 'layouts/PageHeaderLayout';
import styles from './ArticleApp.less';

@connect(state => {
    return ({
        project: state.project
    })
})
export default class EnterpriseApplication extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'project/fetchNotice',
        });
    }

    render() {
        const {
            project: {loading: projectLoading, notice},
        } = this.props;
        const pageHeaderContent = (
            <div className={styles.pageHeaderContent}>
                <div className={styles.avatar}>
                    <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>好文分享</div>
                    <div>推荐好文分享,您最好的微信获客工具</div>
                </div>
            </div>
        );
        const pageHeaderExtra = (
            <div className={styles.pageHeaderExtra}>
                <div>
                    <p>阅读数</p>
                    <p>56</p>
                </div>
                <div>
                    <p>转发数</p>
                    <p>2,223</p>
                </div>
            </div>
        );
        return (
            <PageHeaderLayout

                content={pageHeaderContent}
                extraContent={pageHeaderExtra}
            >
                <Col xs={24}>
                    <Link to={'/enterpriseApplication/articleApp/publishArticle'}>发布文章</Link>
                </Col>
            </PageHeaderLayout>
        );
    }
}
