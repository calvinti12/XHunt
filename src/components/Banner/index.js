import React from 'react';
import './index.scss';
class Banner extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className='banner'>
        <h1>Premium products only a click away!</h1>
        <p>Find all the best selling products of AliExpress on a single platform.</p>
      </div>
    )
  }
}
export default Banner;