import React from 'react';
import './index.scss';
import {Row,Col,Button,Icon} from 'antd';
class Menu extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className='header'>
        <Row type="flex" align="middle" justify="space-between">
          <Col span={12}>
            <h1><Icon type="deployment-unit" /> DropShipper</h1>
          </Col>
          <Col span={12}>
            <div className='rightMenu'>
              <Button type="link">
                <Icon type="search" theme="outlined" />
              </Button>
              <Button type="link">
                <Icon type="shopping" theme="outlined" />
              </Button>
              <Button type="link">Login</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Menu;