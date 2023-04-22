import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import formatSheetRowsForSentMessages from '../../../libs/format';
import serverFunctions from '../../../libs/serverFunctions';
import { messagesSlice, selectMessages } from '../../redux/slices/messages';
import { searchSlice, selectSearch } from '../../redux/slices/search';

const mapStateToProps = (state) => ({
  search: selectSearch(state),
  messages: selectMessages(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPreviewSearch: (value: Search.Preview) =>
      dispatch(searchSlice.actions.preview(value)),
    setSentSearch: (value: Search.Sent) =>
      dispatch(searchSlice.actions.sent(value)),
    setPreviewMessagesData: (value) =>
      dispatch(messagesSlice.actions.previewData(value)),
    setSentMessagesData: (value) =>
      dispatch(messagesSlice.actions.sentData(value)),
    setSentMessagesFetching: (value) =>
      dispatch(messagesSlice.actions.sentFetching(value)),
  };
};

const StyledInputBase = styled(InputBase)(() => ({
  '& input::placeholder': {
    fontSize: '0.80rem',
  },
}));

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    type: Search.Types;
    channel: () => void;
  };

type IconAction = { icon: string; onClick: () => void };

class SearchResults extends React.Component<
  Props,
  {
    actions: IconAction[];
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      actions: [
        { icon: 'backspace', onClick: this.handleBackspace },
        { icon: 'refresh', onClick: this.handleRefresh },
        { icon: 'do_disturb', onClick: this.handleClear },
      ],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSearch(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const search = event.target.value;
    const { type, setSentSearch, setPreviewSearch } = this.props;
    if (type === 'sent') setSentSearch(search);
    else setPreviewSearch(search);
  }

  handleBackspace() {
    const { type, setSentSearch, setPreviewSearch } = this.props;

    if (type === 'sent') setSentSearch('');
    else setPreviewSearch('');
  }

  handleRefresh() {
    const {
      type,
      messages,
      setSentMessagesFetching,
      setSentMessagesData,
      channel,
    } = this.props;

    if (type === 'sent') {
      setSentMessagesFetching(true);
      serverFunctions
        .getMessages(messages.sent.id)
        .then((sentMessages) => {
          const m = formatSheetRowsForSentMessages(JSON.parse(sentMessages));
          setSentMessagesData([...m]);
          return setSentMessagesFetching(false);
        })
        .catch((err) => {
          setSentMessagesFetching(false);
          console.log(err);
        });
    } else {
      channel();
    }
  }

  handleClear() {
    const { type, setSentMessagesData, setPreviewMessagesData } = this.props;
    if (type === 'sent') setSentMessagesData([]);
    else setPreviewMessagesData([]);
  }

  render() {
    const { actions } = this.state;
    const { search, type } = this.props;
    return (
      <Stack sx={{ width: '100%' }} flexDirection="row">
        <StyledInputBase
          defaultValue={type === 'sent' ? search.sent : search.preview}
          onChange={this.handleSearch}
          sx={{ ml: 1, width: '100%' }}
          placeholder={`Search ${_.capitalize(type)} Messages`}
          inputProps={{ 'aria-label': `search ${type} messages` }}
        />
        {actions.map((action: IconAction) => (
          <IconButton
            key={`${action.icon}`}
            onClick={() => {
              // eslint-disable-next-line no-param-reassign
              action.onClick = action.onClick.bind(this);
              action.onClick();
            }}
            type="button"
            sx={{ p: '10px' }}
            aria-label={action.icon}
          >
            <Icon>{action.icon}</Icon>
          </IconButton>
        ))}
      </Stack>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
