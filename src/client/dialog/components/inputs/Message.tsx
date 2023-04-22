import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { selectMessages } from '../../redux/slices/messages';
import { selectSms, smsSlice } from '../../redux/slices/sms';

const mapStateToProps = (state) => ({
  sms: selectSms(state),
  messages: selectMessages(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (value) =>
      Promise.resolve(dispatch(smsSlice.actions.message(value))),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    channel: () => void;
  };

class MessageInput extends React.Component<
  Props,
  { valid: boolean; buttons: { text: string; symbol: string }[] }
> {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      buttons: [
        { text: 'First Name', symbol: '{{FIRST}}' },
        { text: 'Last Name', symbol: '{{LAST}}' },
        { text: 'Office', symbol: '{{OFFICE}}' },
        { text: 'Role', symbol: '{{ROLE}}' },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInsertButton = this.handleInsertButton.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { setMessage } = this.props;
    setMessage(event.target.value)
      .then(() => ({}))
      .catch((err) => console.log((err as Error).message));
  }

  handleBlur() {
    const { sms, channel } = this.props;
    const valid = sms.data.message.length > 0;
    this.setState({ valid });
    if (valid) channel();
  }

  handleInsertButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    symbol: string
  ) {
    event.preventDefault();
    const {
      sms: {
        data: { message },
      },
      setMessage,
      channel,
    } = this.props;
    setMessage(`${message}${symbol}`)
      .then(() => channel())
      .catch((err) => console.log((err as Error).message));
  }

  render() {
    const {
      sms: {
        data: { message },
      },
    } = this.props;
    const { valid, buttons } = this.state;
    return (
      <>
        <Typography variant="subtitle2" component="h3">
          Add Your Message:
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0.5}
        >
          <TextField
            required
            error={!valid}
            value={message}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            id="standard-basic"
            label="Hello Agents! ..."
            helperText="Include your message above"
            multiline
            rows={3}
          />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={0.5}
          >
            {buttons.map((button) => (
              <Button
                key={`${button.text}`}
                variant="contained"
                onMouseDown={(event) =>
                  this.handleInsertButton(event, button.symbol)
                }
                color="primary"
                aria-label="insert"
                size="small"
                sx={{ minWidth: 0, fontSize: '0.6rem' }}
              >
                {button.text}
              </Button>
            ))}
          </Stack>
        </Stack>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
