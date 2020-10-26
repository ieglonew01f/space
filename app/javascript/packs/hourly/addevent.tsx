import * as React from 'react';
import { CalenderContext } from '../context';
import { IUtils, Utils } from '../utils/utils';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { axios } from '../common/constants';

export interface IProps {}
export interface IState {
  title: string;
  desc: string;
  error: boolean;
}

export class AddEventDialog extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      error: false,
    };

    this.utils = new Utils();
  }

  readonly utils: IUtils;

  handleClose = () => {
    this.context.setContext('addNewDialogOpen', false);
  };

  handleSave = async () => {
    const { currentDay, startTime, endTime, events } = this.context.calState;
    const { title, desc } = this.state;

    if (endTime < startTime) {
      this.setState({ error: true });
      setTimeout(() => this.setState({ error: false }), 1500);
      return;
    }

    if (title) {
      const resp = await axios.post('/events', {
        title,
        start_time: startTime,
        end_time: endTime,
        date: currentDay,
        desc,
      });

      this.context.setContext('events', [...events, resp.data]);

      this.handleClose();
    }
  };

  handleDescChange = (e) => {
    const desc = e.target.value;
    this.setState({ desc });
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState({ title });
  };

  setStartAt = (e) => {
    this.context.setContext('startTime', e.target.value);
  };

  setEndAt = (e) => {
    this.context.setContext('endTime', e.target.value);
  };

  render() {
    const { addNewDialogOpen, startTime, endTime } = this.context.calState;
    const utils = this.utils;
    const machineEndTime = utils.incrementHr(endTime, 1);

    console.log(machineEndTime);

    return (
      <Dialog open={addNewDialogOpen} onClose={this.handleClose}>
        <DialogTitle>Add a new event</DialogTitle>
        <DialogContent>
          <div className={this.state.error ? 'danger' : 'hidden'}>
            Start time cannot be greater than end time.
          </div>
          <div className="title">
            <TextField
              onChange={this.handleTitleChange}
              autoFocus={true}
              margin="dense"
              label="Title"
              type="text"
              fullWidth={true}
            />
          </div>
          <div className="desc">
            <TextField
              onChange={this.handleDescChange}
              margin="dense"
              label="Description"
              type="text"
              fullWidth={true}
            />
          </div>
          <div className="time-picker">
            <TextField
              onChange={this.setStartAt}
              label="Start At"
              type="time"
              className="time"
              defaultValue={startTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              onChange={this.setEndAt}
              label="End At"
              type="time"
              className="time"
              defaultValue={machineEndTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddEventDialog.contextType = CalenderContext;
