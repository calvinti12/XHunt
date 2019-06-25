import React from 'react';
import './index.scss';
import {Tabs,Row,Col} from 'antd';
const { TabPane } = Tabs;
class ProductFilter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tabPanes: ['All','New','Trending','Popular'],
      activeTab: 0
    };
  }
  tabClick = (e) => {
    this.setState({
      activeTab : e
    });
  }
  render() {
    const {tabPanes, activeTab} = this.state;
    const tabsPane = tabPanes.map((item, index) => <TabPane tab={item} key={index} />);
    return (
      <div className="productFilter">
        <p className="selectedTitle">{tabPanes[activeTab]} Products</p>
        <Tabs defaultActiveKey="0" onTabClick={this.tabClick}>
          {tabsPane}
        </Tabs>
      </div>
    )
  }
}
export default ProductFilter;