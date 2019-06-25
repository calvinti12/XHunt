import React from 'react';
import './index.scss';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import ProductFilter from '../../components/ProductFilter';
class HomePage extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className='container'>
        <div className='homePage'>
          <Menu />
          <Banner />
          <ProductFilter />
          <div className='content'>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
export default HomePage;