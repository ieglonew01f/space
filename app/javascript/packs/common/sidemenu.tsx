import * as React from 'react';
import { RiseOutlined, FireOutlined, InstagramOutlined, UserOutlined, SettingOutlined} from '@ant-design/icons';

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
    this.state = {
      activeTab: '#/'
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
          <li><a className={activeTab === '#/' ? 'active' : ''} href="#/"><RiseOutlined /> Trending</a></li>
          <li><a className={activeTab === '#/hot' ? 'active' : ''} href="#/hot"><FireOutlined /> Hot</a></li>
          <li><a className={activeTab === '#/fresh' ? 'active' : ''} href="#/fresh"><InstagramOutlined /> Fresh</a></li>
          <li><a className={activeTab === '#/profile' ? 'active' : ''} href="#/profile"><UserOutlined /> Profile</a></li>
          <li><a className={activeTab === '#/settings' ? 'active' : ''} href="#/settings"><SettingOutlined /> Settings</a></li>
        </ul>
      </div>
    )
  }
}