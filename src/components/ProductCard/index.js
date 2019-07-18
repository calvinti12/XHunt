import React from 'react';
import './index.scss';
import {Icon, Row, Col} from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default class ProductCard extends React.Component {
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
            visibleByDefault={true}
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