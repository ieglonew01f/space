import * as React from 'react';

import { Avatar, Button, Progress, notification, Tooltip, Card } from 'antd';
import { CameraOutlined, FileGifOutlined, VideoCameraAddOutlined, CloseCircleOutlined, UserOutlined} from '@ant-design/icons';
import { Row, Col } from 'antd';
import { MAX_INPUT_LEN, AUTH_TOKEN, axios, CURRENT_USER } from '../common/constants';

const { Meta } = Card;

export namespace Editor {
  export interface IProps {

  }

  export interface IState {
    content: string;
    activeImagePost: any;
    loaded: number;
    expandedUrl: any;
  }
}
  
export class Editor extends React.Component<Editor.IProps, Editor.IState> {
  constructor(props: Editor.IProps) {
    super(props)

    this.state = {
      content: '',
      activeImagePost: null,
      loaded: 0,
      expandedUrl: null
    }
  }

  handleChangeInput = event => {
    const { value } = event.target;

    this.setState({
      content: value,
    });
  };

  onPaste = event => {
    const url = event.clipboardData.getData('Text');

    axios
      .post('/posts/parse_link', {
        url: url,
        authenticity_token: AUTH_TOKEN,
      })
      .then((response) => {
        this.setState({expandedUrl: response.data.data})
      })
      .catch((err) => {
        
      });
  }

  post = () => {
    let { content, activeImagePost, expandedUrl } = this.state;
    const message = content.slice(0, MAX_INPUT_LEN);
    let postType = 'text';
    let contentMeta = null;

    if (activeImagePost) {
      postType = 'image'
    }

    if (content === '') {
      notification.info({
        message: 'Post content is empty',
        description:
          'You are trying to submit an empty post.',
        onClick: () => {
          //
        },
      });

      return;
    }

    this.setState({
      activeImagePost: null,
      content: '',
      expandedUrl: null
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

    if (expandedUrl) {
      contentMeta = JSON.stringify(expandedUrl);
    }

    axios
      .post('/posts', {
        content: message,
        content_type: postType,
        image: '',
        authenticity_token: AUTH_TOKEN,
        meta: contentMeta
      })
      .then((response) => {

      })
      .catch((err) => {
        
      });
    
  }

  selectUploader = (target: string) => {
    document.getElementById(target).click();
  }

  uploadPostImage = (event) => {
    const data = new FormData()
    data.append('image', event.target.files[0]);
    data.append('authenticity_token', AUTH_TOKEN);
    data.append('content', '');
    data.append('content_type', 'image');

    axios
      .post('/posts', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          });
        }
      })
      .then((response) => {
        this.setState({
          activeImagePost: response.data.post,
          loaded: 0,
          expandedUrl: null
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

  clearParsedUrl = (event) => {
    this.setState({
      activeImagePost: null,
    });
  }

  render() {
    const { content, activeImagePost, loaded, expandedUrl } = this.state;

    return (
      <div className="editor">
        <h3 className="mast">Trending</h3>
        <Row>
          <Col span={3}>
            <a href="#">
              <Avatar src={CURRENT_USER.avatar.url} size={64} icon={<UserOutlined />} />
            </a>
          </Col>
          <Col span={21}>
            <textarea onPaste={this.onPaste} value={content} onChange={this.handleChangeInput} placeholder="Share something fun ..."></textarea>
          </Col>
        </Row>
        <div className={expandedUrl ? 'preview-url': 'hide'}>
          <Card
            cover={<img alt="preview" src={expandedUrl && expandedUrl.best_image} />}
          >
            <Meta title={expandedUrl && expandedUrl.title} description={expandedUrl && expandedUrl.description} />
          </Card>
        </div>
        <div className={activeImagePost ? 'preview' : 'hide'}>
          <img width="50" src={activeImagePost && activeImagePost.image.url}></img>
          <a onClick={this.clearActivePost} className="image-cross"><CloseCircleOutlined /></a>
        </div>
        <div className="action-bar">
          <button onClick={() => this.selectUploader('post_image')} className="icon-btn photo">
            <CameraOutlined />
          </button>
          <button onClick={ () => this.selectUploader('post_gif')} className="icon-btn gif">
            <FileGifOutlined />
          </button>
          <Tooltip placement="top" title="Comming soon">
            <button className="icon-btn video">
              <VideoCameraAddOutlined />
            </button>
          </Tooltip>
          <span className={content.length > MAX_INPUT_LEN ? "plength danger" : "plength"}>{content.length}/{MAX_INPUT_LEN}</span>
          <Progress className={(loaded === 0) ? 'hide' : ''} percent={loaded} steps={5} strokeColor="#1890ff" />
          <Button onClick={this.post} type="primary" className="float-right">Share</Button>
        </div>
        <input accept=".jpg,.jpeg,.png" className="hide" onChange={this.uploadPostImage} type="file" id="post_image" name="image"/>
        <input accept=".gif" className="hide" onChange={this.uploadPostImage} type="file" id="post_gif" name="image"/>
      </div>
    )
  }
}