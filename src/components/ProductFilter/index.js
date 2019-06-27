import React from 'react';
import './index.scss';
import {Input,Select,Row,Col,Dropdown,Menu,Button,Icon} from 'antd';
const InputGroup = Input.Group;
const {Option} = Select;
class ProductFilter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchText: "",
      sort: "BEST_MATCH",
      sortDirection: ["ASC", "DESC"],
      ratings: Array(4).fill(1).map((item,index) => index+1),
      categories: [
        {id:13,label: "Home Improvement"},
        {id:44,label: "Consumer Electronics"},
        {id:200010196,label:"Smart Electronics"},
        {id:100003070,label:"Men Apparel"},
        {id:100003109	,label:"Women Apparel"},
        {id:200214370,label:"Sports Accessories"},
        {id:18,label:"Sports & Entertainment"},
        {id:200000528,label:"Boys' Baby Clothing"},
        {id:200000567,label:"Girls' Baby Clothing"},
        {id:100001622,label:"Baby Toys"}
      ],
      ratingsRange: {
        from: 0,
        to: 0,
      },
      priceRange: {
        from: 0,
        to: 0,
      },
    };
  }
  render() {
    const {categories,ratings} = this.state;
    const categoriesOptions = categories.map(item => <Option value={item.label} key={item.id}>{item.label}</Option>);
    const ratingOptions = ratings.map(item => <Option value={item} key={item}>{`${item}+`}</Option>)
    return (
      <div className="productFilter">
        <Row>
          <Col sm={12} md={8}>
            <Input placeholder="Search products..." size="large"/>
          </Col>
          <Col sm={12} md={6}>
            {/* <label>Categories</label> */}
            <Select defaultValue={categories[0].label} size="large">
              {categoriesOptions}
            </Select>
          </Col>
          <Col sm={8} md={2}>
            {/* <label>Ratings</label> */}
            <Select defaultValue={ratings[0]} size="large">
              {ratingOptions}
            </Select>
          </Col>
          <Col sm={8} md={4} className="priceRange">
            {/* <label>Price Range</label> */}
            <Input placeholder="Min" size="large" maxLength={5}/>
             <span>-</span>
            <Input placeholder="Max" size="large" maxLength={5}/>
          </Col>
          <Col sm={8} md={2}>
            <Button type="primary" size="large">
              <Icon type="search" />
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}
export default ProductFilter;