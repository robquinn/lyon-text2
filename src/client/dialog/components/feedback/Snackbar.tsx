import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { connect } from 'react-redux';
import { selectSnackbar, snackbarSlice } from '../../redux/slices/snackbar';

const mapStateToProps = (state) => selectSnackbar(state);

const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbar: (value: Snackbar.Action) =>
      dispatch(snackbarSlice.actions.snackbar(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type TransitionProps = Omit<SlideProps, 'direction'>;

class ResultsSnackbar extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { setSnackbar } = this.props;
    setSnackbar({
      open: false,
      severity: 'info',
      title: 'Info',
      message: '',
    });
  }

  transitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

  render() {
    const { open, severity, title, message } = this.props;
    return (
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={this.handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        TransitionComponent={this.transitionLeft}
      >
        <Alert
          severity={severity as AlertColor | undefined}
          onClose={this.handleClose}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={this.handleClose}
            >
              <Icon fontSize="inherit">close</Icon>
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsSnackbar);
