import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Row, Col } from 'antd';
import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ActionCableProvider } from 'react-actioncable-provider';
import { createConsumer } from "@rails/actioncable"


import { Feeds } from './feeds';
import { SideMenu } from './common/sidemenu';
import { Profile } from './profile';
import { Settings } from './settings';
import { Editor } from './feeds/editor';

import 'antd/dist/antd.css'
import './app.css'
import { CURRENT_USER } from './common/constants';

const cable = createConsumer();

const App = () => (
  <div className="main-app">
    <ActionCableProvider cable={cable}>
      <HashRouter>
        <Row className="main-row">
          <Col span={7}>
            <div className="logo">
              <a href="/#">
                <img width="50" src="/site/logo-small.png"></img>
              </a>
            </div>
            <SideMenu></SideMenu>
          </Col>
          <Col span={9}>
            <Route exact path="/">
              <Editor></Editor>
              <Feeds filter="hot"></Feeds>
            </Route>
            <Route exact path="/trending">
              <Editor></Editor>
              <Feeds filter="trending"></Feeds>
            </Route>
            <Route exact path="/fresh">
              <Editor></Editor>
              <Feeds filter="fresh"></Feeds>
            </Route>
            <Route exact path="/profile/:id">
              <Profile></Profile>
            </Route>
            <Route exact path="/settings">
              <Settings></Settings>
            </Route>
          </Col>
          {/* <Col span={8}>col-8</Col> */}
        </Row>
      </HashRouter>
    </ActionCableProvider>
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('app-conatiner')
  )
});