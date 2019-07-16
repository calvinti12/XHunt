import React from 'react';
import './index.scss';
import {Redirect} from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import FilterInfo from '../../shared/filterInfo';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import ProductModal from '../../components/ProductModal';
import ProductFilter from '../../components/ProductFilter';
import ProductCard from '../../components/ProductCard';
import ProductService from '../../services/products';
import queryParser from '../../shared/queryParser';
import {Row,Col,Icon,Alert} from 'antd';
export default class HomePage extends React.Component {
  constructor(props) {
    super();
    this.ps = new ProductService();
    this.filterInfo = new FilterInfo();
    this.bestSellingProductsParams = {
      category: this.filterInfo.categories[0].id,
      sortDirection: "DESC",
      ratingsRange: {from: 0},
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
      searchProps: {
        searchText: "",
        category: 0
      },
      dataLoaded: false,
      isModalVisible: false,
      hasModalDataLoaded: false,
    }
  }

  componentDidMount() {
    const {pathname,search} = this.props.location;
    const q = pathname.split("/");
    if(pathname.length) {
      this.setState({
        searchProps: {
          searchText: q[1],
          category: q[2]
        }
      });
    }
    if (search.length) {

    }
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
      searchProps: {...values}
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
    window.addEventListener("scroll", this.infiniteScrollCallBack);
  }

  infiniteScrollCallBack = () => {
    const heightLimit = window.scrollY + window.innerHeight + this.scrollThreshold >= document.body.scrollHeight;
    // console.log(this.state.searchParams);
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

  hideProductModal = () => {
    this.setState({
      isModalVisible: false,
    })
    setTimeout(() => {
      this.setState({
        hasModalDataLoaded: false,
      });
    },500);
  }

  render() {
    let {products,dataLoaded,isModalVisible,hasModalDataLoaded,productDetails,searchProps} = this.state;
    let error = [...this.apiError];
    products = products || [];
    const productItems = dataLoaded && products.map((item) =>(
      <Col xs={24} sm={12} lg={8} xl={6} key={item.id} onClick={(e) => this.showProductModal(e,item)}>
        <ProductCard {...item}/>
      </Col>
    ));
    const loader = <div className="loader"><Icon type="loading" /><h3>Fetching Products...</h3></div>;
    const alert = (
      <Alert
        message={error.length ? error[0].exception : "No Results Found"}
        description={error.length ? error[0].message : "Try changing your search parameters!"}
        showIcon
        type={error.length ? "error": "info"}/>
    );
    const modalProps = {...productDetails, isModalVisible: isModalVisible, hasModalDataLoaded: hasModalDataLoaded};
    const productModal = <ProductModal {...modalProps} hideProductModal={this.hideProductModal}/>
    return (
      <div className="homePage">
        <Menu isLoggedIn={true}/>
        <Banner />
        <div className="container">
          <ProductFilter {...searchProps} outputSearchParams={this.searchProduct}/>
            {!dataLoaded && loader}
          <Row gutter={24} type="flex" justify="center">
            <Col sm={24} md={24}>
              {dataLoaded && productItems}
              {dataLoaded && !productItems.length && alert}
            </Col>
            {/* <InfiniteScroll
              pageStart={0}
              loadMore={this.searchProduct(searchParams)}
              hasMore={this.totalSearchItems > products.length}
              loader={loader}
              useWindow={false}>
              <Col sm={24} md={24}>
                {dataLoaded && productItems}
                {dataLoaded && !productItems.length && alert}
              </Col>
            </InfiniteScroll> */}
          </Row>
          {productModal}
          <Footer />
        </div>
      </div>
    )
  }
}