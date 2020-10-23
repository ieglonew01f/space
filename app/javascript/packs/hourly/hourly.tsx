import * as React from 'react';
import { EmptyEvent, Event } from './event';

export class Hourly extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="hourly">
        <li>
          <Event />
        </li>
        <li>
          <EmptyEvent />
        </li>
      </ul>
    );
  }
}
