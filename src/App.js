import React, { Component } from 'react';
import './App.css';
import "antd/dist/antd.css";

import NavSider from "./components/NavSider"
import Main from "./components/Main"

import { Layout } from 'antd';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };

    this.onCollapse = this.onCollapse.bind(this)
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  render() {
    let me = this
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <NavSider collapsed={this.state.collapsed} onCollapse={(e) => { me.onCollapse(e) }} />
        <Main collapsed={this.state.collapsed} />
      </Layout>
    );
  }
}

export default App;
