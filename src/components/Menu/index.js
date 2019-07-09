import React from "react";
import "./index.scss";
import {Row,Col,Button,Icon,Avatar} from "antd";
class Menu extends React.Component {
  constructor(props) {
    super();
    this.state = {...props};
  }
  render() {
    const {isLoggedIn} = {...this.state};
    return (
      <div className="header">
        <Row type="flex" align="middle" justify="space-between">
          <Col span={12}>
            <h1><Icon type="deployment-unit" /> XHunt</h1>
          </Col>
          <Col span={12}>
            <div className="rightMenu">
              {!isLoggedIn && <Button className="btnTransparent" icon="key">Login</Button>}
              {isLoggedIn && <Avatar icon="user" size={40} />}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Menu;