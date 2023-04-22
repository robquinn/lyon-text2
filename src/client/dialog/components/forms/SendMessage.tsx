import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

// This is a wrapper for google.script.run that lets us use promises.
import { connect } from 'react-redux';
import serverFunctions from '../../../libs/serverFunctions';
import { messagesSlice, selectMessages } from '../../redux/slices/messages';
import { selectSms, smsSlice } from '../../redux/slices/sms';
import { snackbarSlice } from '../../redux/slices/snackbar';
import AllInput from '../inputs/All';
import MessageInput from '../inputs/Message';
import NinjasInput from '../inputs/Ninjas';
import OfficesInput from '../inputs/Offices';
import PhonesInput from '../inputs/Phones';
import RolesInput from '../inputs/Roles';
import SubmitButton from '../inputs/SubmitButton';

const mapStateToProps = (state) => {
  return {
    messages: selectMessages(state),
    sms: selectSms(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbar: (value: Snackbar.Action) =>
      dispatch(snackbarSlice.actions.snackbar(value)),
    setSentMessagesData: (value) =>
      dispatch(messagesSlice.actions.sentData(value)),
    setSentMessagesId: (value) => dispatch(messagesSlice.actions.sentId(value)),
    setSentMessagesFetching: (value) =>
      dispatch(messagesSlice.actions.sentFetching(value)),
    setPreviewMessagesData: (value) =>
      dispatch(messagesSlice.actions.previewData(value)),
    setSendable: (value: SmsData.Sendable) =>
      dispatch(smsSlice.actions.sendable(value)),
    setSending: (value: SmsData.Sendable) =>
      dispatch(smsSlice.actions.sending(value)),
    setEstimate: (value: SmsData.Estimate) =>
      dispatch(smsSlice.actions.estimate(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    channel: () => void;
    messageCantSend: () => boolean;
  };

class SendMessageForm extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    const { setSendable, setEstimate, setSending } = this.props;
    setEstimate(0);
    setSendable(false);
    setSending(false);
  }

  handleSubmit(): void {
    const {
      sms,
      setSentMessagesFetching,
      setSending,
      setSnackbar,
      setSentMessagesData,
      setSentMessagesId,
    } = this.props;
    setSentMessagesFetching(true);
    setSending(true);
    serverFunctions
      .processResponse(sms.data)
      .then((responses) => responses)
      .then((messages) => {
        setSnackbar({
          open: true,
          severity: 'success',
          title: 'Success',
          message: `${messages.length} message(s) sent`,
        });
        setSentMessagesData(messages);
        setSentMessagesId(messages[0].id);
        setSentMessagesFetching(false);

        console.log('Messages Sent');
        return setSending(false);
      })
      .catch((err) => {
        setSending(false);
        setSentMessagesFetching(false);
        setSnackbar({
          open: true,
          severity: 'error',
          title: 'Error',
          message: `${(err as Error).message}`,
        });
        console.log(err);
      });
  }

  render() {
    const {
      sms: { estimate, sending },
      channel,
      messageCantSend,
    } = this.props;
    return (
      <Box sx={{ mr: 10, maxWidth: 300 }}>
        <Typography variant="h6" component="h3">
          Text Message Form
        </Typography>

        <Box sx={{ mx: 'auto' }}>
          <Grid item>
            <AllInput channel={channel} />
          </Grid>
          <Grid item>
            <OfficesInput channel={channel} />
          </Grid>
          <Grid item>
            <RolesInput channel={channel} />
          </Grid>
          <Grid item>
            <NinjasInput channel={channel} />
          </Grid>
          <Grid item>
            <PhonesInput channel={channel} />
          </Grid>
          <Grid item>
            <MessageInput channel={channel} />
          </Grid>
          <Grid item>
            <SubmitButton
              disabled={messageCantSend()}
              title={`Send ${estimate as number} Texts`}
              handleSubmit={this.handleSubmit}
              loading={Boolean(sending)}
            />
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);
