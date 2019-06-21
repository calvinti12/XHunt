import React from 'react';
import './index.scss';
import Banner1 from '../../assets/images/banner1.png';
class HomePage extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className='container'>
        <div className='homePage'>
          <div className='header'>
          </div>
          <div className='content'>
            <div className='banner'>
              <img src={Banner1} alt='Banner' />
            </div>
          </div>
          <div className='footer'>

          </div>
        </div>
      </div>
    )
  }
}
export default HomePage;