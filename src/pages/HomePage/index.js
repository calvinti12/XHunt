import React from 'react';
import './index.scss';
import {Row,Col,Icon,Alert} from 'antd';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import ProductFilter from '../../components/ProductFilter';
import ProductCard from '../../components/ProductCard';
import ProductService from '../../services/products';
class HomePage extends React.Component {
  constructor(props) {
    super();
    this.ps = new ProductService();
    this.state = {
      dataLoaded: false,
      products: [],
    }
  }
  componentDidMount() {
    this.getBestSellingProducts();
    this.searchOnEnter();
  }

  searchOnEnter = () => {
    window.addEventListener("keyup", (e) => {
      // if (e.keyCode === 13) this.searchProduct();
    });
  }

  getBestSellingProducts = () => {
    this.ps.getBestSellingProducts()
      .then((res) => {
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
    this.ps.searchProducts(values)
      .then((res) => {
        this.setState({
          dataLoaded: true,
          products: res.items,
        });
      })
      .catch((err) => {console.log(err);});
  }

  render() {
    const {products, dataLoaded} = this.state;
    const productItems = dataLoaded && products.sort((a,b) => a.price.value - b.price.value)
    .map((item) =>(
      <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
        <ProductCard {...item} />
      </Col>
    ));
    const loader = <div className="loader"><Icon type="loading" /><h3>Fetching Products...</h3></div>;
    const alert = (
      <Alert
        message="No Results Found"
        description="Try changing your search parameters!"
        showIcon
        type="info"/>
    );
    return (
      <div className="container">
        <div className="homePage">
          <Menu />
          <Banner />
          <ProductFilter searchParams={this.searchProduct} />
            {!dataLoaded && loader}
            <Row gutter={16} type="flex" justify="center">
              {dataLoaded && productItems}
              {dataLoaded && !productItems.length && alert}
            </Row>
          <Footer />
        </div>
      </div>
    )
  }
}
export default HomePage;