import React from 'react';
import './index.scss';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import {Image,Transformation} from 'cloudinary-react';
const { Meta } = Card;
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { imageUrl, title, price } = this.props;
    return (
      <Card
        cover={
          // <Image cloudName="dyce0ba6z" publicId={imageUrl}>
          //   <Transformation alt={title} width="400" height="300" crop="fill"/>
          // </Image>
          <img src={imageUrl} alt={title}/>
        }
        actions={[<Icon type="heart" />, <Icon type="shopping-cart" />]}
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