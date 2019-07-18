import React from 'react';
import './index.scss';
import {Modal,Icon,Row,Col,Rate,Button,Skeleton} from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      hasModalDataLoaded: false,
    };
  }

  static getDerivedStateFromProps(newProps) {
    return {...newProps};
  }

  hideProductModal = () => {
    this.setState({
      productImages: []
    });
    this.props.hideProductModal();
  }

  roundOffRating = (val) => {
    const a = Math.round(Number(val) * 2) / 2;
    const b = Math.round(val * 2) / 2;
    return (typeof val === "string" ?  a : b) || 0;
  }

  render() {
    let {hasModalDataLoaded,isModalVisible,title,price,ratings,reviews,detailUrl,productImages} = this.state;
    ratings = this.roundOffRating(ratings) || this.roundOffRating(reviews && reviews.ratings);
    productImages = productImages || [];
    const prodModalDescSkeleton = <Skeleton paragraph={{rows: 5}} loading={!hasModalDataLoaded} active />;
    const prodModalImgSkeleton = <Skeleton title={false} paragraph={false} avatar={{shape:"square", size: 250}} loading={!hasModalDataLoaded} active />;
    const prodImage = <div className="prodImage"><LazyLoadImage visibleByDefault={true} afterLoad={this.afterImgLoaded} alt={title}
      src={productImages[0]}/></div>;
    return (
      <Modal
        className="productModal"
        title={<span className="link" onClick={this.hideProductModal}><Icon type="arrow-left" /> Back to Listings</span>}
        visible={isModalVisible}
        footer={null}
        centered={true}
        onCancel={this.hideProductModal}>
          <Row type="flex" justify="center">
            <Col sm={24} md={10}>
              {prodModalImgSkeleton}
              {hasModalDataLoaded && prodImage}
            </Col>
            <Col sm={24} md={14}>
              {prodModalDescSkeleton}
              {hasModalDataLoaded && (
                <div className="productDetails">
                  <h4>{title}</h4>
                  <h5>{`$${price.value}`}</h5>
                  <Rate disabled allowHalf={true} value={ratings} />
                  <p>{title}</p>
                  <div className="btnGroup">
                    <a target="_blank" rel="noopener noreferrer" className="ant-btn btnPrimary ant-btn-primary ant-btn-lg" href={detailUrl}><Icon type="alibaba" /> Buy on AliExpress</a>
                    <Button type="primary" shape="circle" icon="heart" size="large" className="btnTransparent" />
                  </div>
                </div>
              )}
            </Col>
          </Row>
      </Modal>
    );
  }
}