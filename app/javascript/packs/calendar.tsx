import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { ControlBar } from './common/controlbar';
import { WeekDays } from './weeks/weekdays';
import { Hourly } from './hourly/hourly';
import { CalenderContext } from './context';

export interface IProps {};

export interface ICalState {
  currentWeek: any[];
  events: any[];
  numWeek: number;
}

export interface IState {
  calState: ICalState;
  setContext(key: string, val: any): void;
}

export class Calendar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      calState: {
        currentWeek: [],
        events: [],
        numWeek: 1,
      },
      setContext: (key: string, val: any) => {
        const { calState } = this.state;
        calState[key] = val;
        this.setState({ calState });
      },
    };
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
