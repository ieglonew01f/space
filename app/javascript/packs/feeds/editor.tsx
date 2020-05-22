import * as React from 'react';

import { Avatar, Button, Progress } from 'antd';
import { CameraOutlined, FileGifOutlined, VideoCameraAddOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

const axios = require('axios').default;

const MAX_INPUT_LEN = 50;
const AUTH_TOKEN = document.querySelector('meta[name=csrf-token]').getAttribute('content');

export namespace Editor {
  export interface IProps {

  }

  export interface IState {
    content: string;
    activeImagePost: any;
  }
}
  
export class Editor extends React.Component<Editor.IProps, Editor.IState> {
  constructor(props: Editor.IProps) {
    super(props)

    this.state = {
      content: '',
      activeImagePost: null,
    }
  }

  handleChangeInput = event => {
    const { value } = event.target;

    this.setState({
      content: value,
    });
  };

  post = () => {
    let { content } = this.state;
    const message = content.slice(0, MAX_INPUT_LEN);
    let postType = 'text'
    let activeImagePost = this.state.activeImagePost;

    if (activeImagePost) {
      postType = 'image'
    }

    this.setState({
      activeImagePost: null,
      content: '',
    });

    if (activeImagePost) {
      axios
      .patch('/posts/' + activeImagePost.uuid + '.json', {
        content: message,
        authenticity_token: AUTH_TOKEN,
      })
      .then((response) => {

      })
      .catch((err) => {
        
      });

      return;
    }

    axios
      .post('/posts', {
        content: message,
        content_type: postType,
        image: '',
        authenticity_token: AUTH_TOKEN,
      })
      .then((response) => {

      })
      .catch((err) => {
        
      });
    
  }

  selectUploader = () => {
    document.getElementById('post_image').click();
  }

  uploadPostImage = (event) => {
    const data = new FormData()
    data.append('image', event.target.files[0]);
    data.append('authenticity_token', AUTH_TOKEN);
    data.append('content', '');
    data.append('content_type', 'image');

    axios
      .post('/posts', data)
      .then((response) => {
        this.setState({
          activeImagePost: response.data.post,
        });
      })
      .catch((err) => {
        
      });
  }

  clearActivePost = (event) => {
    this.setState({
      activeImagePost: null,
    });
  }

  render() {
    const { content, activeImagePost } = this.state;

    return (
      <div className="editor">
        <Row>
          <Col span={3}><Avatar size={64} src="https://scontent.fgau1-1.fna.fbcdn.net/v/t1.0-1/p320x320/75521927_10216026571044241_2658697791173296128_n.jpg?_nc_cat=107&_nc_sid=dbb9e7&_nc_oc=AQn6HJONLNkzZCFbGRfCmLYNNhcU9nFN9KcNOfgRhm2Lksn4XPyqyV8XcgAfkjJqc4XFnrTVXnVR1Zyq1mNCwbPU&_nc_ht=scontent.fgau1-1.fna&_nc_tp=6&oh=754840b08e23cf1c842256fd936537d3&oe=5EE9B413" /></Col>
          <Col span={21}><textarea value={content} onChange={this.handleChangeInput} placeholder="Share something fun ..."></textarea></Col>
        </Row>
        <div className={activeImagePost ? 'preview' : 'hide'}>
          <img width="50" src={activeImagePost && activeImagePost.image.url}></img>
          <a onClick={this.clearActivePost} className="image-cross"><CloseCircleOutlined /></a>
        </div>
        <div className="action-bar">
          <button onClick={this.selectUploader} className="icon-btn photo">
            <CameraOutlined />
          </button>
          <button className="icon-btn gif">
            <FileGifOutlined />
          </button>
          <button className="icon-btn video">
            <VideoCameraAddOutlined />
          </button>
          <span className={content.length > MAX_INPUT_LEN ? "danger" : ""}>{content.length}/{MAX_INPUT_LEN}</span>
          <Button onClick={this.post} type="primary" className="float-right">Share</Button>
        </div>
        <input className="hide" onChange={this.uploadPostImage} type="file" id="post_image" name="image"/>
      </div>
    )
  }
}