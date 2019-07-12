import React from 'react';
import './index.scss';
import {Icon, Row, Col} from 'antd';
// import {Image,Transformation} from 'cloudinary-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoaderImg from '../../assets/images/loader.svg';
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      imgLoaded: false,
    };
    this.imgRef = null;
  }

  afterImgLoaded = (e) => {
    this.setState({
      imgLoaded: true,
    });
  }

  render() {
    const { imageUrl, title, price, imgLoaded } = this.state;
    return (
      <div className="productCard">
        <div className="productImg">
          <LazyLoadImage
            delayTime={0}
            placeholderSrc={LazyLoadImage}
            afterLoad={this.afterImgLoaded}
            alt={title}
            src={imageUrl}/>
        </div>
        <div className="productDesc">
          <Row type="flex" align="middle">
            <Col span={16}>
              <span className="price">{'$' + price.value}</span>
            </Col>
            <Col span={8}>
              <Icon type="heart" className="floatRight" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p className="description">{title}</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default ProductCard;