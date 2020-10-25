import * as React from 'react';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import { CalenderContext } from '../context';

export class Summary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentEvent } = this.context.calState;
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
              {`${currentEvent.start_time} - ${currentEvent.end_time}`}
              <small>Time</small>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Summary.contextType = CalenderContext;
