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
import { Inbox } from './inbox';
import { History } from './inbox/history';

import 'antd/dist/antd.css';
import './app.css';

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
          <Route exact path="/">
            <Col span={9}>
              <Editor></Editor>
              <Feeds filter="hot"></Feeds>
            </Col>
          </Route>
          <Route exact path="/trending">
            <Col span={9}>
              <Editor></Editor>
              <Feeds filter="trending"></Feeds>
            </Col>
          </Route>
          <Route exact path="/fresh">
            <Col span={9}>
              <Editor></Editor>
              <Feeds filter="fresh"></Feeds>
            </Col>
          </Route>
          <Route exact path="/inbox/:id">
            <Col span={9}>
              <Inbox></Inbox>
            </Col>
            <Col span={5}>
              <History></History>
            </Col>
          </Route>
          <Route exact path="/inbox/">
            <Col span={9}>
              <Inbox></Inbox>
            </Col>
            <Col span={5}>
              <History></History>
            </Col>
          </Route>
          <Route exact path="/profile/:id">
            <Col span={9}>
              <Profile></Profile>
            </Col>
          </Route>
          <Route exact path="/settings">
            <Col span={9}>
              <Settings></Settings>
            </Col>
          </Route>
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