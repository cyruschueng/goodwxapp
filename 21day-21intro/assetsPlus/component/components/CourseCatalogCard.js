/**
 * Created by ichangtou on 2017/8/3.
 */
const React = require('react');
const Card = require('../../component/components/Card');
const CourseCatalogCard = React.createClass({
    render (){
        return(
            <Card>
                <div className="global-course-catalog-card">
                    <h1 className="title">{this.props.title}</h1>
                    <div className="catalog">
                        {this.props.children.map((item, index) => {
                            return (
                                <div key={index} className="catalogItem">
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Card>
        )

    }
});
module.exports = CourseCatalogCard;







