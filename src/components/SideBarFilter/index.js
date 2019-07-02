import React from 'react';
import './index.scss';
import FilterInfo from '../../shared/filterInfo';
import {Input,Select,Row,Col,Button,Icon} from 'antd';
const {Option} = Select;
export default class SideBarFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filterInfo = new FilterInfo();
    this.categories = this.filterInfo.categories;
    this.state = {
      category: 44,
    };
  }

  handleInputChange = (e) => {
  }

  render() {
    const categoriesOptions = this.categories.map((item, index) => <p key={`p-${index}`}>{item.label}</p>);
    return (
      <div className="sideBarFilter">
          <h2>Categories</h2>
          {categoriesOptions}
          {/* <Select defaultValue={this.categories[0].label} onChange={(e) => this.setState({category: e})}>
            {categoriesOptions}
          </Select> */}
      </div>
    )
  }
}