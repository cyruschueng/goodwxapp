/**
 * Created by ichangtou on 2017/9/11.
 *//**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const Card = require('../../component/components/Card');

const ImageCard = React.createClass({
    render (){
        return (
            <Card>
                <img src={this.props.src} className="global-image-card"/>
            </Card>
        );
    }
});
module.exports = ImageCard;








