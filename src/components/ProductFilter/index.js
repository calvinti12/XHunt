import React from 'react';
import './index.scss';
import FilterInfo from '../../shared/filterInfo';
import {Input,Select,Row,Col,Icon, Slider, Checkbox} from 'antd';
const {Option} = Select;
export default class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filterInfo = new FilterInfo();
    this.categories = [...this.filterInfo.sortOptions];
    this.state = {
      searchText: "",
      category: this.categories[0].id,
    };
  }

  handleInputChange = (e) => {
    e.persist();
    this.setState({
      searchText: e.target.value,
    });
  }

  searchOnEnter = (e) => {
    e.persist();
    if (e.keyCode === 13) this.searchBtn(e);
  }

  searchBtn = (e) => {
    e.persist();
    this.props.searchParams({...this.state});
  }

  priceSliderFormatter = (value) => {
    return `$${value}+`;
  }

  ordersSliderFormatter = (value) => {
    return `${value}+`;
  }

  sortDirectionChange = (e) => {

  }

  render() {
    const sortOptions = this.categories.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>);
    const categoriesOptions = this.categories.map((item, index) => <Option value={item.id} key={item.id}>{item.label}</Option>);
    return (
      <div className="productFilter">
        <div className="searchBar">
          <Row>
            <Col xs={16} className="inputFilter">
              <Icon type="search" onClick={this.searchBtn} />
              <input placeholder="Search any product..." onChange={this.handleInputChange} onKeyUp={this.searchOnEnter}/>
            </Col>
            <Col xs={8} className="sortSelect">
              <label>Sort By:</label>
              <Select name="categorySelected" defaultValue={this.categories[0].label} onChange={(e) => this.setState({category: e})}>
                {sortOptions}
              </Select>
            </Col>
          </Row>
        </div>
        <div className="extraFilters">
          <Row gutter={24}>
            <Col md={8}>
              <p>Sort By:</p>
              <Select defaultValue={this.categories[0].label} onChange={(e) => this.setState({category: e})}>
              {sortOptions}
            </Select>
            </Col>
            <Col md={8}>
              <p>Price Range</p>
              <Slider defaultValue={0} min={0} step={10} tipFormatter={this.priceSliderFormatter} />
            </Col>
            <Col md={8}>
              <p># of Orders</p>
              <Slider defaultValue={0} min={0} step={10} tipFormatter={this.ordersSliderFormatter} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}