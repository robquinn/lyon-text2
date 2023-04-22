import Stack from '@mui/material/Stack';
import React from 'react';
import { connect } from 'react-redux';
import serverFunctions from '../../libs/serverFunctions';
import SmsResults from '../components/feedback/SmsResults';
import ResultsAlert from '../components/feedback/Snackbar';
import SendMessageForm from '../components/forms/SendMessage';
import { messagesSlice } from '../redux/slices/messages';
import { selectSms, smsSlice } from '../redux/slices/sms';
import { snackbarSlice } from '../redux/slices/snackbar';

const mapStateToProps = (state) => ({ sms: selectSms(state) });

const mapDispatchToProps = (dispatch) => {
  return {
    setSnackbar: (value: Snackbar.Action) =>
      dispatch(snackbarSlice.actions.snackbar(value)),
    setSentMessagesData: (value) =>
      dispatch(messagesSlice.actions.sentData(value)),
    setSentMessagesId: (value) => dispatch(messagesSlice.actions.sentId(value)),
    setPreviewMessagesData: (value) =>
      dispatch(messagesSlice.actions.previewData(value)),
    setPreviewMessagesFetching: (value) =>
      dispatch(messagesSlice.actions.previewFetching(value)),
    setSendable: (value: SmsData.Sendable) =>
      dispatch(smsSlice.actions.sendable(value)),
    setSending: (value: SmsData.Sendable) =>
      dispatch(smsSlice.actions.sending(value)),
    setEstimate: (value: SmsData.Estimate) =>
      dispatch(smsSlice.actions.estimate(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class SendSms extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
    this.channel = this.channel.bind(this);
    this.messageCantSend = this.messageCantSend.bind(this);
  }

  channel() {
    const {
      sms,
      setPreviewMessagesData,
      setSendable,
      setEstimate,
      setPreviewMessagesFetching,
    } = this.props;
    setPreviewMessagesData([]);
    setPreviewMessagesFetching(true);
    setSendable(false);
    serverFunctions
      .getSmsPreview(sms.data)
      .then((resPromise) => resPromise)
      .then((twilioSmsRequests) => {
        setPreviewMessagesData(twilioSmsRequests);
        setEstimate(twilioSmsRequests.length);
        if (this.messageCantSend()) setSendable(true);
        return setPreviewMessagesFetching(false);
      })
      .catch((err) => console.log((err as Error).message));
  }

  messageCantSend() {
    const { sms } = this.props;
    const estimateEqualZero = sms.estimate === 0;
    const messageIsNotSendable = !sms.sendable;
    const messageIsBlank = sms.data.message.length === 0;
    const allInputsAreBlank =
      Boolean(sms.data.all) === false &&
      sms.data.offices.length === 0 &&
      sms.data.roles.length === 0 &&
      sms.data.ninjas.length === 0 &&
      sms.data.phones.length === 0;

    return (
      estimateEqualZero ||
      messageIsNotSendable ||
      messageIsBlank ||
      allInputsAreBlank
    );
  }

  render() {
    // const { setSentMessages } = this.props;
    return (
      <Stack
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <SendMessageForm
            channel={this.channel}
            messageCantSend={this.messageCantSend}
          />
          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxHeight="700"
          >
            <SmsResults channel={this.channel} type="preview" />
            <SmsResults channel={this.channel} type="sent" />
          </Stack>
        </Stack>
        <ResultsAlert />
      </Stack>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendSms);
