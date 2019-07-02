import React from 'react';
import './index.scss';
import FilterInfo from '../../shared/filterInfo';
import {Input,Select,Row,Col,Button,Icon} from 'antd';
const {Option} = Select;
export default class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filterInfo = new FilterInfo();
    this.categories = [...this.filterInfo.categories];
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

  render() {
    const categoriesOptions = this.categories.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>);
    return (
      <div className="productFilter">
        <Row>
          <Col md={16} className="inputFilter">
            <Icon type="search" onClick={this.searchBtn} />
            <input placeholder="Search any product..." onChange={this.handleInputChange} onKeyUp={this.searchOnEnter}/>
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