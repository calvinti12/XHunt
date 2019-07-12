import React from 'react';
import './index.scss';
import {Redirect} from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import FilterInfo from '../../shared/filterInfo';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import ProductFilter from '../../components/ProductFilter';
import ProductCard from '../../components/ProductCard';
import ProductService from '../../services/products';
import queryParser from '../../shared/queryParser';
import {Row,Col,Icon,Alert,Modal,Skeleton,Carousel,Rate,Button} from 'antd';
export default class HomePage extends React.Component {
  constructor(props) {
    super();
    this.ps = new ProductService();
    this.filterInfo = new FilterInfo();
    this.bestSellingProductsParams = {
      category: this.filterInfo.categories[0].id,
      sortDirection: "ASC",
      ratingsRange: {from: 4},
      orderRange: {from: 0},
      skip: 0,
      limit: 24
    };
    this.totalSearchItems = 0;
    this.scrollThreshold = 200;
    this.apiError = [];
    this.limit = 24;
    this.skip = 0;
    this.breakPointLimit = {
      1600: 20, // items displayed per row * rows to display.
      1200: 15,
      992: 15,
      768: 10,
      576: 5,
    };
    this.state = {
      products: [],
      productDetails: {},
      dataLoaded: false,
      isModalVisible: false,
      hasModalDataLoaded: false,
    }
  }

  componentDidMount() {
    // console.log(this.props);
    // const query = this.props.location.search;
    // console.log(queryParser(this.props.location.search));
    this.getBestSellingProducts();
    this.registerInfiniteScroll();
  }

  getBestSellingProducts = () => {
    this.ps.searchProducts(this.bestSellingProductsParams)
      .then((res) => {
        if (Array.isArray(res)) this.apiError = res;
        this.setState({
          dataLoaded: true,
          products: res.items,
        });
      })
      .catch(err => {console.log(err);})
  }

  searchProduct = (values) => {
    this.setState({
      dataLoaded: false,
    });
    this.ps.searchProducts({...values,limit: this.limit, skip: this.skip})
      .then((res) => {
        this.totalSearchItems = (res && res.aggregation && res.aggregation.totalCount) || 0;
        this.filterInfo.products = [...res.items];
        const sortedProducts = this.filterInfo.sortProducts(values.sortBy, values.sortDirection);
        this.setState({
          dataLoaded: true,
          products: [...sortedProducts],
        });
      })
      .catch((err) => {console.log(err);});
  }

  getProductDetails = (data) => {
    this.ps.fetchProductDetails({productId: data.id})
      .then(res => {
        this.setState({
          hasModalDataLoaded: true,
          productDetails: {...res, ...data}
        });
      })
      .catch(err => console.log(err));
  }

  registerInfiniteScroll = () => {
    document.getElementsByTagName('body')[0].addEventListener("scroll", this.infiniteScrollCallBack);
  }

  infiniteScrollCallBack = () => {
    const heightLimit = document.body.scrollTop + window.innerHeight + this.scrollThreshold >= document.body.scrollHeight;
    console.log( document.body.scrollTop + window.innerHeight + this.scrollThreshold, document.body.scrollHeight);
    if (heightLimit && !this.state.dataLoaded) {
      this.searchProduct(this.state.searchParams);
    }
  }

  showProductModal = (e, data) => {
    e.persist();
    this.setState({
      isModalVisible: true,
    });
    this.getProductDetails(data);
  }

  hideProductModal = (e) => {
    this.setState({
      hasModalDataLoaded: false,
      isModalVisible: false
    });
  }

  render() {
    let {products, dataLoaded, isModalVisible, hasModalDataLoaded} = this.state;
    let {productImages, title, detailUrl, ratings, orders, price} = this.state.productDetails;
    productImages = productImages || [];
    products = products || [];
    const productItems = dataLoaded && products.map((item) =>(
      <Col xs={24} sm={12} lg={8} xl={6} key={item.id} onClick={(e) => this.showProductModal(e,item)}>
        <ProductCard {...item}/>
      </Col>
    ));
    const loader = <div className="loader"><Icon type="loading" /><h3>Fetching Products...</h3></div>;
    const alert = (
      <Alert
        message={this.apiError.length ? this.apiError[0].exception : "No Results Found"}
        description={this.apiError.length ? this.apiError[0].message : "Try changing your search parameters!"}
        showIcon
        type={this.apiError.length ? "error": "info"}/>
    );
    const prodModalDescSkeleton = <Skeleton paragraph={{rows: 5}} loading={!hasModalDataLoaded} active />;
    const prodModalImgSkeleton = <Skeleton title={false} paragraph={false} avatar={{shape:"square", size: 250}} loading={!hasModalDataLoaded} active />;
    const prodImage = <div className="prodImage"><img className="imgResponsive" src={productImages[0]} alt={productImages[0]} /></div>;
    const carousel = (
      <Carousel className="productCarousel">
        {productImages.map((item, index) => (
          <div key={`Img-${index}`}>
            <img src={item} alt={item} />
          </div>
        ))}
      </Carousel>
    );
    const productModal = (
      <Modal
        className="productModal"
        title={<span><Icon type="arrow-left" /> Back to Listings</span>}
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
    )
    return (
      <div className="homePage">
        <Menu isLoggedIn={true}/>
        <Banner />
        <div className="container">
          <ProductFilter searchParams={this.searchProduct} />
            {!dataLoaded && loader}
          <Row gutter={24} type="flex" justify="center">
            <Col sm={32} md={24}>
              {dataLoaded && productItems}
              {dataLoaded && !productItems.length && alert}
            </Col>
            {/* <InfiniteScroll
              pageStart={0}
              loadMore={this.searchProduct}
              hasMore={this.totalSearchItems > products.length}
              loader={loader}
              useWindow={false}>
              {dataLoaded && productItems}
            </InfiniteScroll> */}
          </Row>
          {productModal}
          <Footer />
        </div>
      </div>
    )
  }
}