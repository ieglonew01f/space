import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import { IUtils, Utils } from '../utils/utils';
import { CalenderContext } from '../context';
import { axios } from './constants';

/**
 * Control bar
 */
export class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
  }

  readonly utils: IUtils;

  /**
   * Skips to current week
   */
  currentWeek = async () => {
    const currentDay = this.utils.getCurrentDate();
    const week = this.utils.getCurrentWeek();

    this.context.setContext('currentWeek', week);
    this.context.setContext('numWeek', 1);
    this.context.setContext('currentDay', currentDay);

    this.context.setContext('loading', true);
    const resp = await axios.get(`/events/${currentDay}`);
    this.context.setContext('loading', false);
    this.context.setContext('events', resp.data);
  };

  /**
   * Skips to next week
   */
  nextWeek = () => {
    const { numWeek } = this.context.calState;
    const week = this.utils.getNextWeek(numWeek);
    this.context.setContext('currentWeek', week);
    this.context.setContext('numWeek', numWeek + 1);
  };

  /**
   * Skips to previous week
   */
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
