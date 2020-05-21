import * as React from 'react';
import { Row, Col, Avatar, Button } from 'antd';
import { HeartTwoTone, EditTwoTone } from '@ant-design/icons';

import './index.css'

export namespace Profile {
  export interface IProps {

  }
}

export class Profile extends React.Component {
  constructor(props: Profile.IProps) {
    super(props);
  }

  render() {
    let currentUser = (window as any).gon.current_user

    return(
      <div className="center-col profile-container">
        <h3 className="mast">{currentUser.name}</h3>
        <div className="bio">
          <Row>
            <Col span={3}><Avatar size={64} src="https://scontent.fgau1-1.fna.fbcdn.net/v/t1.0-1/p320x320/75521927_10216026571044241_2658697791173296128_n.jpg?_nc_cat=107&_nc_sid=dbb9e7&_nc_oc=AQn6HJONLNkzZCFbGRfCmLYNNhcU9nFN9KcNOfgRhm2Lksn4XPyqyV8XcgAfkjJqc4XFnrTVXnVR1Zyq1mNCwbPU&_nc_ht=scontent.fgau1-1.fna&_nc_tp=6&oh=754840b08e23cf1c842256fd936537d3&oe=5EE9B413" /></Col>
            <Col span={21}>
              <span><b>Bio</b></span>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </Col>
          </Row>
          <span className="stats"><b><HeartTwoTone twoToneColor="#eb2f96" /> 5M Likes</b></span>
          <span className="stats"><b><EditTwoTone  /> 5M Posts</b></span>
        </div>
      </div>
    )
  }
}