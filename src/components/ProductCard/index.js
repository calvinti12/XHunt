import React from 'react';
import './index.scss';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
const { Meta } = Card;
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { imageUrl, title, price } = this.props;
    return (
      // <div className="productCard">
      //   <div className="productImage">
      //     <img src={imageUrl} alt={title} />
      //   </div>
      //   <p>{title}</p>
      // </div>
      <Card
        cover={
          <img
            alt={title}
            src={imageUrl}
          />
        }
        actions={[<Icon type="heart" />, <Icon type="edit" />]}
      >
        <Meta
          title={"$" + price.value}
          description={title}
        />
      </Card>
    )
  }
}
export default ProductCard;