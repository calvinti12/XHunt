import React from 'react';
import './index.scss';
import {Input,Select,Row,Col,Button,Icon} from 'antd';
const {Option} = Select;
class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.categories = [
      {id:"BEST_MATCH",label: "Best Match"},
      {id:"ITEM_RATING",label: "Rating"},
      {id:"ORDERS",label:"# of orders"},
      {id:"TRANSACTIONS"	,label:"# of transactions"},
    ];
  }
  
  render() {
    const categoriesOptions = this.categories.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>);
    return (
      <div className="productFilter">
        <Row>
          <Col md={16} className="inputFilter">
            <input placeholder="Search any product..." />
          </Col>
          <Col md={8} className="sortSelect">
            <label>Sort By:</label>
            <Select name="categorySelected" defaultValue={this.categories[0].label} onChange={(e) => this.setState({category: e})}>
              {categoriesOptions}
            </Select>
          </Col>
        </Row>
      </div>
    )
  }
}
export default ProductFilter;