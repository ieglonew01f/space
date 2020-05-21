import * as React from 'react';
import { PageHeader } from 'antd';

// import { Avatar } from 'antd';
// import { HeartOutlined } from '@ant-design/icons';
// import { Row, Col } from 'antd';

export namespace Login {
  export interface IProps {
  }

  export interface IState {
  }
}
  
export class Login extends React.Component<Login.IProps, Login.IState> {
  constructor(props: Login.IProps) {
    super(props);
  }

  render() {
    return (
      <PageHeader
      className="site-page-header"
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
      />
    )
  }
}