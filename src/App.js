import React, { Component } from 'react';
import './shared/Includes.jsx';

import Layout from './shared/Layout.jsx';
import Home from './pages/Home.jsx';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Home/>
      </Layout>
    );
  }
}
