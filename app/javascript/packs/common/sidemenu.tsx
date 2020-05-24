import * as React from 'react';
import { RiseOutlined, FireOutlined, InstagramOutlined, UserOutlined, SettingOutlined} from '@ant-design/icons';
import { CURRENT_USER } from './constants';

export namespace SideMenu {
  export interface IProps {

  }

  export interface IState {
    activeTab: string;
  }
}

export class SideMenu extends React.Component<SideMenu.IProps, SideMenu.IState> {
  constructor(props: SideMenu.IProps) {
    super(props);

    //populate existing hash
    let hash = window.location.hash;

    this.state = {
      activeTab: hash
    }

    window.addEventListener("hashchange", e => {
      this.setState( { activeTab: window.location.hash })
    });
  }

  render() {
    const { activeTab } = this.state;
    return(
      <div className="side-menu">
        <ul className="list-unstyled">
          <li><a className={activeTab === '#/' ? 'active' : ''} href="#/"><FireOutlined /> Hot</a></li>
          <li><a className={activeTab === '#/trending' ? 'active' : ''} href="#/trending"><RiseOutlined /> Trending</a></li>
          <li><a className={activeTab === '#/fresh' ? 'active' : ''} href="#/fresh"><InstagramOutlined /> Fresh</a></li>
          <li><a className={activeTab === '#/profile/' + CURRENT_USER.uuid ? 'active' : ''} href={"#/profile/" + CURRENT_USER.uuid}><UserOutlined /> Profile</a></li>
          <li><a className={activeTab === '#/settings' ? 'active' : ''} href="#/settings"><SettingOutlined /> Settings</a></li>
        </ul>
      </div>
    )
  }
}