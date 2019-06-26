import React from 'react';
import './index.scss';
class ProductCard extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() {
    const {imageUrl, title} = this.props;
    return (
      <div className="productCard">
        <div className="productImage">
          <img src={imageUrl} alt={title} />
        </div>
        <p>{title}</p>
      </div>
    )
  }
}
export default ProductCard;