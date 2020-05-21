import * as React from 'react';
import { RiseOutlined, FireOutlined, InstagramOutlined, UserOutlined, SettingOutlined} from '@ant-design/icons';

export namespace SideMenu {
  export interface IProps {

  }
}

export class SideMenu extends React.Component {
  constructor(props: SideMenu.IProps) {
    super(props);
  }

  render() {
    return(
      <div className="side-menu">
        <ul className="list-unstyled">
          <li><a href="#/"><RiseOutlined /> Trending</a></li>
          <li><a href="#/hot"><FireOutlined /> Hot</a></li>
          <li><a href="#/fresh"><InstagramOutlined /> Fresh</a></li>
          <li><a href="#/profile"><UserOutlined /> Profile</a></li>
          <li><a href="#/settings"><SettingOutlined /> Settings</a></li>
        </ul>
      </div>
    )
  }
}