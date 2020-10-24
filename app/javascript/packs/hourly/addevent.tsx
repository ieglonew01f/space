import * as React from 'react';
import { CalenderContext } from '../context';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface IProps {}
export interface IState {}

export class AddEventDialog extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  handleClose = () => {
    this.context.setContext('addNewDialogOpen', false);
  };

  render() {
    const { addNewDialogOpen } = this.context.calState;
    return (
      <Dialog
        open={addNewDialogOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus={true}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddEventDialog.contextType = CalenderContext;
