import { Button } from "@fluentui/react-components";
import { DialogBody, DialogSurface, DialogTitle, Dialog, DialogActions, DialogTrigger} from "@fluentui/react-components/unstable";
import React from 'react';

function CustomDialog(props){
  return(
    <Dialog
    open={props.open}
    onClose={props.handleClose}
    onSubmit={props.submit}
    modalType="alert
    ">
            <DialogSurface aria-label="label">
              <DialogTitle>{props.dialogTitle}</DialogTitle>
              <DialogBody>
                {props.dialogBody}
              </DialogBody>
              <DialogActions>
                <DialogTrigger>
                  <Button appearance="secondary" onClick={props.handleClose}>Cancel</Button>
                </DialogTrigger>
                <Button appearance="primary" style={props.alert?{backgroundColor:"#bc2f32"}:{}}onClick={props.onSubmit} type="submit">{props.dialogSubmit}</Button>
              </DialogActions>
            </DialogSurface>
  </Dialog>
  );
}
export default CustomDialog;