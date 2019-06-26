import React from 'react';
import './index.scss';
import {Row,Col} from 'antd';
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
      products: [],
      dataLoaded: false,
    }
  }
  componentDidMount() {
    this.ps.getBestSellingProducts()
      .then(res => {
        this.setState({
          products: res.items,
          dataLoaded: true,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const {products, dataLoaded} = this.state;
    const productItems = dataLoaded && products.map(item => (
      <Col xs={24} sm={12} md={8} lg={6}  key={item.id}>
        <ProductCard {...item} />
      </Col>
    ));
    return (
      <div className='container'>
        <div className='homePage'>
          <Menu />
          <Banner />
          <ProductFilter />
          <div className='content'>
            <Row gutter={24}>
              {productItems}
            </Row>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
export default HomePage;