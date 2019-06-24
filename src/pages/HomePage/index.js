import React from 'react';
import './index.scss';
const Menu = React.lazy(() => import('../../components/Menu'));
const Footer = React.lazy(() => import('../../components/Footer'));
class HomePage extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className='container'>
        <div className='homePage'>
          <div className='content'>
          </div>
        </div>
      </div>
    )
  }
}
export default HomePage;