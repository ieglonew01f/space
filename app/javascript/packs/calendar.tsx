import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { ControlBar } from './common/controlbar';
import { WeekDays } from './weeks/weekdays';
import { Hourly } from './hourly/hourly';
import { CalenderContext } from './context';
import { axios } from './common/constants';
import { IUtils, Utils } from './utils/utils';
import { AddEventDialog } from './hourly/addevent';
import { Summary } from './hourly/summary';
import { ICurrentEvent } from './hourly/event';

export interface IProps {}

/**
 * Interface for calendar state
 */
export interface ICalState {
  currentWeek: any[];
  events: any[];
  numWeek: number;
  loading: boolean;
  currentDay: string;
  addNewDialogOpen: boolean;
  startTime: string;
  endTime: string;
  currentEvent: ICurrentEvent;
}

export interface IState {
  calState: ICalState;
  setContext(key: string, val: any): void;
}

/**
 * Calendar Main App
 */
export class Calendar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.utils = new Utils();

    this.state = {
      calState: {
        currentWeek: [],
        events: [],
        numWeek: 1,
        loading: true,
        currentDay: this.utils.getCurrentDate(),
        addNewDialogOpen: false,
        startTime: '00:00',
        endTime: '00:00',
        currentEvent: {
          id: null,
          title: '',
          start_time: '',
          end_time: '',
        },
      },
      setContext: (key: string, val: any) => {
        const { calState } = this.state;
        calState[key] = val;
        this.setState({ calState });
      },
    };
  }

  readonly utils: IUtils;

  async componentDidMount() {
    const { calState } = this.state;
    const { currentDay } = calState;

    const resp = await axios.get(`/events/${currentDay}`);

    calState.loading = false;
    calState.events = resp.data;
    calState.currentEvent = calState.events[0];
    this.setState({ calState });
  }

  render() {
    return (
      <CalenderContext.Provider value={this.state}>
        <Container className="main-container" maxWidth="md">
          <ControlBar />
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={2}>
              <WeekDays />
            </Grid>
            <Grid item={true} xs={6}>
              <Hourly />
            </Grid>
            <Grid item={true} xs={4}>
              <Summary />
            </Grid>
          </Grid>
          <AddEventDialog />
        </Container>
      </CalenderContext.Provider>
    );
  }
}
