import React from 'react';
import './index.scss';
import {Row,Col,Icon,Alert} from 'antd';
import {Redirect} from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import FilterInfo from '../../shared/filterInfo';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import ProductFilter from '../../components/ProductFilter';
import ProductCard from '../../components/ProductCard';
import SideBarFilter from "../../components/SideBarFilter";
import ProductService from '../../services/products';
export default class HomePage extends React.Component {
  constructor(props) {
    super();
    this.ps = new ProductService();
    this.filterInfo = new FilterInfo();
    this.bestSellingProductsParams = {
      category: 44,
      sortDirection: "ASC",
      ratingsRange: {from: 4, to: 5},
      priceRange: {from: 0, to: 25},
      ordersRange: {from: 100},
      skip: 0,
      limit: 25
    };
    this.totalSearchItems = 0;
    this.scrollThreshold = 200;
    this.apiError = [];
    this.state = {
      dataLoaded: false,
      products: [],
      searchParams: {},
    }
  }
  componentDidMount() {
    this.getBestSellingProducts();
  }

  getBestSellingProducts = () => {
    // this.ps.getBestSellingProducts(this.bestSellingProductsParams)
    //   .then((res) => {
    //     if (Array.isArray(res)) this.apiError = res;
    //     this.setState({
    //       dataLoaded: true,
    //       products: res.items,
    //     });
    //   })
    //   .catch(err => {console.log(err);})
  }

  searchProduct = (values) => {
    console.log(values);
    this.setState({
      dataLoaded: false,
      searchParams: {...values, category: 44}
    });
    this.ps.searchProducts({...values, category: 44})
      .then((res) => {
        this.totalSearchItems = (res && res.aggregation && res.aggregation.totalCount) || 0;
        this.filterInfo.products = [...res.items];
        const sortedProducts = this.filterInfo.sortProducts(values.category,"ASC");
        this.setState({
          dataLoaded: true,
          products: [...sortedProducts],
        });
      })
      .catch((err) => {console.log(err);});
  }

  registerInfiniteScroll = () => {
    document.getElementsByTagName('body')[0].addEventListener("scroll", this.infiniteScrollCallBack);
  }

  infiniteScrollCallBack = () => {
    const heightLimit = document.body.scrollTop + window.innerHeight + this.scrollThreshold >= document.body.scrollHeight;
    console.log(heightLimit);
    if (heightLimit && !this.state.dataLoaded) {
      this.searchProduct(this.state.searchParams);
    }
  }

  render() {
    let {products, dataLoaded} = this.state;
    products = products || [];
    const productItems = dataLoaded && products.map((item) =>(
      <Col xs={24} sm={12} md={12} lg={8} xl={6} key={item.id}>
        <ProductCard {...item} />
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
    return (
      <div className="container">
        <div className="homePage">
          <Menu />
          <Banner />
          <ProductFilter searchParams={this.searchProduct} />
            {!dataLoaded && loader}
            <Row gutter={12}>
              {/* <Col sm={24} md={5}>
                <SideBarFilter />
              </Col> */}
              <Col sm={24} md={24}>
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
          <Footer />
        </div>
      </div>
    )
  }
}