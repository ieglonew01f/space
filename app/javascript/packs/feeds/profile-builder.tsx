import * as React from 'react';
import { Avatar, Row, Col, Input, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import {axios, CURRENT_USER, MAX_BIO_LENGTH } from '../common/constants';

import './index.css'

export namespace ProfileBuilder {
  export interface IProps {

  }

  export interface IState {
    loading: boolean,
    bio: string
  }
}

export class ProfileBuilder extends React.Component<ProfileBuilder.IProps, ProfileBuilder.IState> {
  constructor(props: ProfileBuilder.IProps) {
    super(props);

    this.state = {
      loading: false,
      bio: CURRENT_USER.bio,
    }
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

  completeProfile = () => {
    let bio = this.state.bio;
    const slicedBio = bio.slice(0, MAX_BIO_LENGTH);

    axios
      .patch('/users/update', {
        bio: slicedBio
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        
      });
  }

  setAttr = (e: any, target: string) => {
    if (target === 'bio') {
      this.setState({'bio': e.target.value})
    }
  }

  render() {
    // const { imageUrl } = this.state;

    return(
      <div className={CURRENT_USER.complete === 'true' ? 'hide' : "profile-builder"}>
        <Row>
          <p><b>Complete your profile.</b></p>
        </Row>
        <Row>
          <Col className="text-center" span={5}>
            <a href="#" onClick={this.selectAvatar}>
              <Avatar src={CURRENT_USER.avatar.url} className="mb-10" size={64} icon={<UserOutlined />} />
            </a>
            <p>Click to change your avatar.</p>
            <br/>
            <input accept=".gif.jpg,.jpeg,.png" className="hide" onChange={this.uploadAvatar} type="file" id="avatar_upload" name="image"/>
          </Col>
          <Col className="ml-20" span={17}>
            <div className="space-combined-input">
              <label>Name</label>
              <input disabled className="space-input" value={CURRENT_USER.name} />
            </div>
            <div className="space-combined-input">
              <label>Bio - {this.state.bio.length} / {MAX_BIO_LENGTH}</label>
              <textarea value={this.state.bio} maxLength={250} onChange={(e) => this.setAttr(e, 'bio')} className="space-input" placeholder="Tell the world a little about yourself." />
            </div>
            <div className="space-combined-input">
              <Button onClick={this.completeProfile} type="primary">Save</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}