/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const Card = require('../../component/components/Card');
const TeacherIntro = React.createClass({
    render (){
        return(<Card>
            <div className="global-teachter-intro">
                <h1 className="title">{this.props.title}</h1>
                <img className="headImg" src={`${this.props.headImage}`}/>
                <p className="introTxt">百合学姐</p>
                <p className="introTxt">{this.props.introTxt}</p>
                {/*<p>长投网理财达人</p>*/}
                {/*<p>21天训练营创始人</p>*/}
            </div>
        </Card>)

    }
});
module.exports = TeacherIntro;







