import * as React from 'react';

import { ActionCableConsumer } from 'react-actioncable-provider';

import { PostCard } from './post';
import { ProfileBuilder } from './profile-builder'
import { AUTH_TOKEN, axios } from '../common/constants';

import './index.css'

export namespace Feeds {
  export interface IProps {
    filter: string;
  }

  export interface IState {
    posts: Array<any>
  }
}

export class Feeds extends React.Component<Feeds.IProps, Feeds.IState> {
  constructor(props: Feeds.IProps) {
    super(props)
    this.handleReceived = this.handleReceived.bind(this);

    this.state = {
      posts: []
    }

    this.load();
  }

  load = () => {
    let uuid = null;

    if (this.props.filter === 'profile') {
      let hash = window.location.hash.split('/')
      uuid = hash[hash.length - 1];
    }

    axios
      .post('/posts/filter', {
        user_id: uuid,
        filter: this.props.filter
      })
      .then((response) => {
        this.setState({ posts: response.data })
      })
      .catch((err) => {
        
      });
  }

  handleReceived(resp) {
    if (!resp || resp && !resp.message) return;
    let post = JSON.parse(resp.message);
    let { posts } = this.state;

    this.setState({ posts: [post, ...posts]});
  }

  render() {
    const { posts } = this.state;

    return(
      <div className="center-col feed-container">
        <div className="news-feed">
          <ProfileBuilder></ProfileBuilder>
          <ActionCableConsumer
            channel="NewsFeedChannel"
            onReceived={this.handleReceived}
          >
          {posts.map((post, i) => {
            return (
              <PostCard key={i} post={post}></PostCard>
            );
          })}
          </ActionCableConsumer>
        </div>
      </div>
    )
  }
}