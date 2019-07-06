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
import ProductService from '../../services/products';
import queryParser from '../../shared/queryParser';
export default class HomePage extends React.Component {
  constructor(props) {
    super();
    this.ps = new ProductService();
    this.filterInfo = new FilterInfo();
    this.bestSellingProductsParams = {
      category: this.filterInfo.categories[0].id,
      sortDirection: "ASC",
      ratingsRange: {from: 4},
      orderRange: {from: 50},
      skip: 0,
      limit: 25
    };
    this.totalSearchItems = 0;
    this.scrollThreshold = 200;
    this.apiError = [];
    this.limit = 25;
    this.skip = 0;
    this.state = {
      dataLoaded: false,
      products: [],
    }
  }
  componentDidMount() {
    // console.log(this.props);
    // const query = this.props.location.search;
    console.log(queryParser(this.props.location.search));
    this.getBestSellingProducts();
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
            <Row gutter={12} type="flex" justify="center">
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