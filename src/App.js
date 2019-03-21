import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import "./assets/css/customize.css";
import "antd/dist/antd.css";

import NavSider from "./components/NavSider"
import Main from "./components/Main"

import { Layout } from 'antd';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      selectedMenu: "Overview"
    };

    this.onCollapse = this.onCollapse.bind(this)
    this.selectMenu = this.selectMenu.bind(this)
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  selectMenu(info) {
    this.setState({ selectedMenu: info.key });
  }

  render() {
    let me = this
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <NavSider
            collapsed={this.state.collapsed}
            onCollapse={(e) => { me.onCollapse(e) }}
            selectedMenu={this.state.selectedMenu}
            selectMenu={(e) => { me.selectMenu(e) }} />
          <Main
            collapsed={this.state.collapsed}
            selectedMenu={() => { return this.state.selectedMenu }}
          />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
