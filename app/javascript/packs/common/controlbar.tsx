import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import { IUtils, Utils } from '../utils/utils';
import { CalenderContext } from '../context';

export class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
  }

  readonly utils: IUtils;

  currentWeek = () => {
    const week = this.utils.getCurrentWeek();
    this.context.setContext('currentWeek', week);
    this.context.setContext('numWeek', 1);
  };

  nextWeek = () => {
    const { numWeek } = this.context.calState;
    const week = this.utils.getNextWeek(numWeek);
    this.context.setContext('currentWeek', week);
    this.context.setContext('numWeek', numWeek + 1);
  };

  previousWeek = () => {
    const { numWeek } = this.context.calState;
    const week = this.utils.getPrevWeek(numWeek);
    this.context.setContext('currentWeek', week);
    this.context.setContext('numWeek', numWeek + 1);
  };

  render() {
    return (
      <div className="control-bar">
        <IconButton onClick={this.previousWeek} aria-label="forward">
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <Button
          onClick={this.currentWeek}
          variant="outlined"
          size="medium"
          color="primary"
        >
          Today
        </Button>
        <IconButton onClick={this.nextWeek} aria-label="backwards">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
        <div className="current-month">
          {this.utils.currentMonthAndYear(this.context.calState.currentWeek)}
        </div>
      </div>
    );
  }
}

ControlBar.contextType = CalenderContext;
