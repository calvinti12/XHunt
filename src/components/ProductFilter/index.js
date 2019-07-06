import React from 'react';
import './index.scss';
import FilterInfo from '../../shared/filterInfo';
import {Button,Select,Row,Col,Icon, Slider, Radio} from 'antd';
const {Option} = Select;
export default class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filterInfo = new FilterInfo();
    this.categories = [...this.filterInfo.categories];
    this.sortOptions = [...this.filterInfo.sortOptions];
    this.state = {
      searchText: props.searchText || "",
      category: props.category || this.categories[0].id,
      sortDirection: props.sortDirection || "ASC",
      sortBy: props.sortBy || 0,
      priceRange: {from: props.price || 0},
      orderRange: {from: props.order || 10},
      toggleFilterVisibility: false,
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
    const params = {...this.state, text: this.state.searchText};
    this.props.searchParams({...params});
  }

  sliderFormatter = (value, type) => {
    return type === "price" ? `$${value}+` : type === "order" ? `${value}+` : value;
  }

  toggleFilterVisibilityBtn = (e) => {
    e.persist();
    this.setState((state) => ({
      toggleFilterVisibility: !state.toggleFilterVisibility
    }));
  }

  onSliderChange = (e, name) => {
    this.setState({
      [name] : {from : e}
    });
  }

  render() {
    const sortOptions = this.sortOptions.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>);
    const categoriesOptions = this.categories.map((item, index) => <Option value={item.id} key={item.id}>{item.label}</Option>);
    const sortDirection = ["ASC", "DESC"].map((item, index) => <Radio value={item} key={`opt-${index}`}>{item}</Radio>)
    const [defaultSortValue,defaultSortCategory] = [this.sortOptions[0].label,this.categories[0].label];
    const {toggleFilterVisibility} = this.state;
    return (
      <div className="productFilter">
        <div className="searchBar">
          <Row>
            <Col xs={16} className="inputFilter">
              <Icon type="search" onClick={this.searchBtn} />
              <input placeholder="Search any product..." onChange={this.handleInputChange} onKeyUp={this.searchOnEnter}/>
            </Col>
            <Col xs={8} className="sortSelect">
              <label>Categories</label>
              <Select name="categorySelected" defaultValue={defaultSortCategory} onChange={(e) => this.setState({category: e})}>
                {categoriesOptions}
              </Select>
            </Col>
          </Row>
        </div>
        <div className="extraFilters">
          <Row>
            <Col span={24}>
              <Button type="link" size="small" className="floatRight" onClick={this.toggleFilterVisibilityBtn}> Filters <Icon type="caret-right" rotate={toggleFilterVisibility ? 90 : 0} /></Button>
            </Col>
          </Row>
          <div className="filter">
            <Row gutter={12} className={toggleFilterVisibility ? "fadeInDown" : "fadeOutUp"}>
              <Col md={12} lg={4}>
                <p>Sort By:</p>
                <Select className="roundBorderSelect" defaultValue={defaultSortValue} onChange={(e) => this.setState({sortBy: e})}>
                  {sortOptions}
                </Select>
              </Col>
              <Col md={12} lg={6}>
                <p>Sort Direction:</p>
                <Radio.Group onChange={(e) => this.setState({sortDirection: e.target.value}) } value={this.state.sortDirection}>
                  {sortDirection}
                </Radio.Group>
              </Col>
              <Col md={12} lg={7}>
                <p>Price Range:</p>
                <Slider defaultValue={0} min={0} step={10} tipFormatter={e => this.sliderFormatter(e, "price")} onChange={e => this.onSliderChange(e,'priceRange')} />
              </Col>
              <Col md={12} lg={7}>
                <p># of Orders:</p>
                <Slider defaultValue={10} min={10} step={10} tipFormatter={e=> this.sliderFormatter(e, "order")} onChange={e => this.onSliderChange(e,'orderRange')} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}