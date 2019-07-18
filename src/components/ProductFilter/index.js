import React from 'react';
import './index.scss';
import FilterInfo from '../../shared/filterInfo';
import queryParser from '../../shared/queryParser';
import {Button,Select,Row,Col,Icon, Slider, Radio} from 'antd';
const {Option} = Select;
export default class ProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filterInfo = new FilterInfo();
    this.categories = [...this.filterInfo.categories];
    this.sortOptions = [...this.filterInfo.sortOptions];
    this.inputRef = null;
    this.state = {
      searchText: "",
      category: this.categories[0].id,
      sortDirection: "ASC",
      sortBy: 0,
      priceRange: {from: 0},
      orderRange: {from: 10},
      toggleFilterVisibility: false,
    };
  }

  // static getDerivedStateFromProps(newProps, prevState) {
  //   // Impt to return every state variable explicitly, which was not received in the props.
  //   const newState = {...newProps, toggleFilterVisibility: prevState.toggleFilterVisibility};
  //   console.log("New State: ");
  //   console.log(newState);
  //   return newState;
  // }

  componentDidMount() {
    console.log("Component Mounted");
    console.log(this.props);
  }
 
  handleInputChange = (e) => {
    e.persist();
    this.setState({
      searchText: e.target.value,
    });
  }

  handleSelectChange = (e) => {
    this.setState({
      category: e
    });
  }

  searchOnEnter = (e) => {
    e.persist();
    if (e.keyCode === 13) this.searchBtn(e);
  }

  searchBtn = (e) => {
    e.persist();
    const params = {...this.state, text: this.state.searchText};
    this.props.outputSearchParams(params);
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
    const {searchText,category,toggleFilterVisibility} = this.state;
    const sortOptions = this.sortOptions.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>);
    const categoriesOptions = this.categories.map((item, index) => <Option value={item.id} key={item.id}>{item.label}</Option>);
    const sortDirection = ["ASC", "DESC"].map((item, index) => <Radio value={item} key={`opt-${index}`}>{item}</Radio>);
    const [defaultSortValue,defaultCategory] = [this.sortOptions[0].id, Number(category) || this.categories[0].id];
    return (
      <div className="productFilter">
        <div className="searchBar">
          <Row>
            <Col xs={24} sm={13} md={14} lg={16} className="inputFilter">
              <Icon type="search" className="prefixIcon" onClick={this.searchBtn} />
              <input defaultValue={searchText} placeholder="Search any product..." onChange={this.handleInputChange} onKeyUp={this.searchOnEnter} ref={el => this.inputRef = el}/>
              <Icon type="control" className="suffixIcon" />
            </Col>
            <Col xs={24} sm={11} md={10} lg={8} className="categories">
              <label>Categories</label>
              <Select name="categorySelected" defaultValue={defaultCategory} onChange={this.handleSelectChange}>
                {categoriesOptions}
              </Select>
            </Col>
          </Row>
        </div>
        <div className="extraFilters">
          <Row>
            <Col span={24}>
              <Button type="link" size="small" className="floatRight" onClick={this.toggleFilterVisibilityBtn}> Filters <Icon type="caret-right" /></Button>
            </Col>
          </Row>
          <div className="filter">
            <Row gutter={12} type="flex" className={toggleFilterVisibility ? 'fadeInDown' : 'fadeOutUp'}>
              <Col xs={24} sm={12} lg={4}>
                <p>Sort By:</p>
                <Select className="roundBorderSelect" defaultValue={defaultSortValue} onChange={(e) => this.setState({sortBy: e})}>
                  {sortOptions}
                </Select>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <p>Sort Direction:</p>
                <Radio.Group onChange={(e) => this.setState({sortDirection: e.target.value}) } value={this.state.sortDirection}>
                  {sortDirection}
                </Radio.Group>
              </Col>
              <Col xs={24} sm={12} lg={7}>
                <p>Price Range:</p>
                <Slider defaultValue={0} min={0} step={10} tipFormatter={e => this.sliderFormatter(e, "price")} onChange={e => this.onSliderChange(e,'priceRange')} />
              </Col>
              <Col xs={24} sm={12} lg={7}>
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