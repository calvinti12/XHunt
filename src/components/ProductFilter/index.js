import React from 'react';
import './index.scss';
import {Input,Select,Row,Col,Button,Icon} from 'antd';
const InputGroup = Input.Group;
const {Option} = Select;
class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.ratings = Array(4).fill(1).map((item,index) => index+1);
    this.categories = [
      {id:44,label: "Consumer Electronics"},
      {id:13,label: "Home Improvement"},
      {id:100003070,label:"Men Apparel"},
      {id:100003109	,label:"Women Apparel"},
      {id:18,label:"Sports & Entertainment"},
      {id:100001622,label:"Baby Toys"}
    ];
    this.state = {
      searchText: "",
      rating: this.ratings[0],
      category: this.categories[0].id,
      lowPrice: null,
      highPrice: null,
    };
  }
  handleInputChange = (e) => {
    e.persist();
    const {name,value} = e.target;
    this.setState({
      [name]: value
    })
  }

  searchOnEnter = (e) => {
    e.persist();
    if (e.keyCode === 13) this.searchBtn();
  }

  searchBtn = () => {
    const {lowPrice, highPrice} = this.state;
    const params = {
      ...this.state,
      ratingsRange: {from: this.state.rating, to: 5}
    };
    if (lowPrice !== null && highPrice !== null) params.priceRange = {from: lowPrice, to: highPrice};
    this.props.searchParams(params);
  }
  
  render() {
    const categoriesOptions = this.categories.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>);
    const ratingOptions = this.ratings.map(item => <Option value={item} key={item}>{`${item}+`}</Option>);
    return (
      <div className="productFilter">
        <Row>
          <Col sm={12} md={8}>
            <Input name="searchText" onChange={this.handleInputChange} onKeyUp={this.searchOnEnter} placeholder="Search products..." size="large"/>
          </Col>
          <Col sm={12} md={6}>
            <Select name="categorySelected" defaultValue={this.categories[0].label} size="large" onChange={(e) => this.setState({category: e})}>
              {categoriesOptions}
            </Select>
          </Col>
          <Col sm={10} md={2}>
            <Select name="rating" defaultValue={this.ratings[0]} size="large" onChange={(e) => this.setState({rating: e})}>
              {ratingOptions}
            </Select>
          </Col>
          <Col sm={10} md={4} className="priceRange">
            <Input name="lowPrice" placeholder="Min" size="large" maxLength={5} onChange={this.handleInputChange}/>
             <span>-</span>
            <Input name="highPrice" placeholder="Max" size="large" maxLength={5} onChange={this.handleInputChange}/>
          </Col>
          <Col sm={4} md={2}>
            <Button type="primary" size="large" onClick={this.searchBtn} onKeyUp={this.searchOnEnter}>
              <Icon type="search" />
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}
export default ProductFilter;