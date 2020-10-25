import * as React from 'react';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { CalenderContext } from '../context';
import { IUtils, Utils } from '../utils/utils';

export class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
  }

  readonly utils: IUtils;

  render() {
    const { currentEvent } = this.context.calState;
    if (currentEvent) {
      return (
        <div className="summary">
          <div className="title">
            <h3>{currentEvent.title}</h3>
          </div>
          <div className="description">
            <p>{currentEvent.desc}</p>
          </div>
          <div className="details">
            <div className="item-block">
              <span className="icon">
                <CalendarTodayTwoToneIcon />
              </span>
              <span className="item">
                {currentEvent.date}
                <small>Date</small>
              </span>
            </div>
            <div className="item-block">
              <span className="icon">
                <QueryBuilderIcon />
              </span>
              <span className="item">
                {`${this.utils.timeToHumanReadable(
                  currentEvent.start_time
                )} - ${this.utils.timeToHumanReadable(currentEvent.end_time)}`}
                <small>Time</small>
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

Summary.contextType = CalenderContext;
