import * as React from 'react';

import { Row, Col, Form, Input, Button, Avatar, Popover, Tooltip } from 'antd';
import { axios, CURRENT_USER } from '../common/constants';

import {
  SettingTwoTone,
  UserOutlined
} from '@ant-design/icons';

import './index.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export namespace Settings {
  export interface IProps {
  }

  export interface IState {
    user: any;
  }
}

export class Settings extends React.Component<Settings.IProps, Settings.IState> {
  constructor(props: Settings.IProps) {
    super(props);

    this.state = {
      user: CURRENT_USER
    }
  }

  onFinish = values => {
    delete values.email;
    axios
      .patch('/users/update', values, {
        onUploadProgress: ProgressEvent => {
          // this.setState({
          //   loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          // });
        }
      })
      .then((response) => {
        // this.setState({
        //   loaded: 0,
        // });

        window.location.reload();
      })
      .catch((err) => {
        
      });
  };

  validateMessages = {
    required: '${label} is required!',
  };

  signOut = () => {
    (window as any).location = '/users/sign_out';
  }

  selectAvatar = () => {
    document.getElementById("avatar_upload").click();
  }

  uploadAvatar = (event) => {
    const data = new FormData()
    data.append('avatar', event.target.files[0]);

    axios
      .patch('/users/update', data, {
        onUploadProgress: ProgressEvent => {
          // this.setState({
          //   loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          // });
        }
      })
      .then((response) => {
        // this.setState({
        //   loaded: 0,
        // });

        window.location.reload();
      })
      .catch((err) => {
        
      });
  }

  render() {
    const { user } = this.state;
    return(
      <div className="center-col settings-container">
        <div className="settings">
          <h4><SettingTwoTone /> Profile Settings</h4>
          <Row>
            <Col span={3}>
              <Tooltip placement="top" title={"Click to change avatar."}>
                <a onClick={this.selectAvatar} className="change-avatar">
                  <Avatar size={64} src={user.avatar.url} icon={<UserOutlined />} />
                </a>
                <span className="change-avatar-msg">Change Avatar.</span>
                <input accept=".gif.jpg,.jpeg,.png" className="hide" onChange={this.uploadAvatar} type="file" id="avatar_upload" name="image"/>
              </Tooltip>
            </Col>
            <Col span={18}>
              <Form {...layout} initialValues={{ name: user.name, email: user.email, bio: user.bio }} name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages}>
                <Form.Item name={'name'} label="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
                  <Input disabled />
                </Form.Item>
                <Form.Item name={'bio'} label="Bio">
                  <Input.TextArea maxLength={250}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="settings other-settings">
          <Button onClick={this.signOut} type="primary" danger>
            Sign Out
          </Button>
        </div>
      </div>
    )
  }
}