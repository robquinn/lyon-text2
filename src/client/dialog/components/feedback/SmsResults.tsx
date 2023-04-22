import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
// import SentMessagesTestJson from '../../assets/json/sent-messages-test-data.json';
import Badge from '@mui/material/Badge';
import Icon from '@mui/material/Icon';
import LinearProgress from '@mui/material/LinearProgress';
import _ from 'lodash';
import { connect } from 'react-redux';
import { resolveObjPath } from '../../../libs/resolveObj';
import { selectMessages } from '../../redux/slices/messages';
import { selectSearch } from '../../redux/slices/search';
import { selectSms } from '../../redux/slices/sms';
import ResultAccordian from './ResultAccordian';
import SearchResults from './SearchResults';

const mapStateToProps = (state) => ({
  messages: selectMessages(state),
  search: selectSearch(state),
  sms: selectSms(state),
});

const mapDispatchToProps = () => {
  return {
    // setPreviewMessages: (value) => dispatch(messagesSlice.actions.preview(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    type: Messages.Types;
    channel: () => void;
  };

class SmsResults extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
    this.filterMessages = this.filterMessages.bind(this);
    this.searchTerms = this.searchTerms.bind(this);
  }

  searchTerms(): string[] {
    const { search, type }: { search: Search.Action; type: Search.Types } =
      this.props;
    const text = search[type];
    const terms: string[] =
      text != null
        ? (text as string)?.includes(' ')
          ? (text as string).split(' ')
          : [text]
        : [];
    return terms
      .map((t: string) => t.trim())
      .map((t: string) => _.lowerCase(t))
      .map((t: string) => t.replaceAll(',', ''))
      .filter((t: string) => t.length > 0);
  }

  filterMessages() {
    const common = [
      'user.firstName',
      'user.lastName',
      'user.office',
      'user.role',
      'user.isNinja',
    ];
    const preview = [
      ...common,
      'request.options.payload.To',
      'request.options.payload.Body',
      'request.options.payload.From',
    ];
    const sent = [...common, 'response.to', 'response.body', 'response.from'];

    const keys = {
      preview,
      sent,
    };

    const flags = {
      non: ['non', 'not', 'nonninja'],
      ninja: ['ninja'],
    };
    const userIsNotNinja = (key, value) => {
      if (
        (key === 'user.isNinja' &&
          value !== 'UNKNOWN' &&
          Boolean(value) === false &&
          flags.non.some((flag) => this.searchTerms()?.includes(flag))) ||
        (flags.ninja.some((flag) => this.searchTerms()?.includes(flag)) &&
          flags.non.some((flag) => this.searchTerms()?.includes(flag)))
      ) {
        return true;
      }
      return false;
    };
    const userIsNinja = (key, value) => {
      if (
        key === 'user.isNinja' &&
        value !== 'UNKNOWN' &&
        Boolean(value) === true &&
        flags.ninja.some((flag) => this.searchTerms()?.includes(flag)) &&
        !flags.non.some((flag) => this.searchTerms()?.includes(flag))
      ) {
        return true;
      }
      return false;
    };
    const {
      messages,
      type,
    }: { messages: Messages.Action; type: Messages.Types } = this.props;
    return (
      (messages[type] as Messages.Preview | Messages.Sent)?.data as string[]
    )?.filter((m) =>
      this.searchTerms().some((term) =>
        (keys[type] as string[]).some((key) => {
          const value = resolveObjPath(key, m);
          if (
            userIsNotNinja(key, value) ||
            userIsNinja(key, value) ||
            _.lowerCase(value)?.includes(term)
          )
            return true;
          return false;
        })
      )
    );
  }

  accordian({ message, i, type }) {
    return <ResultAccordian type={type} id={i} message={message} />;
  }

  render() {
    const {
      messages,
      search,
      type,
      channel,
    }: {
      messages: Messages.Action;
      search: Search.Action;
      type: Messages.Types;
      channel: SmsData.Channel;
    } = this.props;
    const numberOfMessages: number =
      this.filterMessages()?.length > 0
        ? this.filterMessages().length
        : (
            (messages[type] as Messages.Preview | Messages.Sent)
              ?.data as string[]
          )?.length > 0
        ? (
            (messages[type] as Messages.Preview | Messages.Sent)
              ?.data as string[]
          )?.length
        : 0;
    return (
      <Stack>
        <Stack
          mt={2}
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Badge
            sx={{ mr: 2 }}
            badgeContent={numberOfMessages}
            max={5000}
            color="primary"
          >
            <Icon color="action">mail</Icon>
          </Badge>
          <Typography variant="h6" component="h3">
            {_.capitalize(type)} Messages
          </Typography>
        </Stack>
        <Stack
          minWidth={300}
          maxWidth={300}
          minHeight={290}
          maxHeight={290}
          border="black solid 10px"
          borderRadius="10px"
          overflow="-moz-hidden-unscrollable"
        >
          <SearchResults channel={channel} type={type} />
          {(messages[type] as Messages.Preview | Messages.Sent).fetching ? (
            <LinearProgress />
          ) : null}
          <Stack overflow="auto">
            {(messages[type] as Messages.Preview | Messages.Sent).data.length >
            0
              ? (search[type] as string)?.length > 0
                ? this.filterMessages().map((message, i) =>
                    this.accordian({ message, i, type })
                  )
                : (messages[type] as Messages.Preview | Messages.Sent).data.map(
                    (message, i) => this.accordian({ message, i, type })
                  )
              : null}
          </Stack>
        </Stack>
      </Stack>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmsResults);
