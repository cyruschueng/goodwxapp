/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const Card = require('../../component/components/Card');
const SummaryCard = React.createClass({
    render (){
        console.log(this.props.children)
        return(
            <Card>
                <div className="global-summary-card">
                <h1 className="title">{this.props.title}</h1>
                {this.props.children.split('#').map((item, index) => {
                return (
                <p key={index} className="text_body">{item}</p>
                )
                })}
                </div>
            </Card>
        )

    }
});
module.exports = SummaryCard;







