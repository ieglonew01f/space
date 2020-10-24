import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { ControlBar } from './common/controlbar';
import { WeekDays } from './weeks/weekdays';
import { Hourly } from './hourly/hourly';
import { CalenderContext } from './context';
import { axios } from './common/constants';
import { IUtils, Utils } from './utils/utils';

export interface IProps {}

export interface ICalState {
  currentWeek: any[];
  events: any[];
  numWeek: number;
  loading: boolean;
  currentDay: string;
}

export interface IState {
  calState: ICalState;
  setContext(key: string, val: any): void;
}

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

    const resp = await axios.get('/events/');

    calState.loading = false;
    calState.events = resp.data;
    this.setState({ calState });
  }

  render() {
    return (
      <CalenderContext.Provider value={this.state}>
        <Container className="main-container" maxWidth="md">
          <ControlBar />
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={6}>
              <WeekDays />
            </Grid>
            <Grid item={true} xs={6}>
              <Hourly />
            </Grid>
          </Grid>
        </Container>
      </CalenderContext.Provider>
    );
  }
}
