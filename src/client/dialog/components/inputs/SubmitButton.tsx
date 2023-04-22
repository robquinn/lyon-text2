import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import React from 'react';
import { connect } from 'react-redux';
import { selectSms } from '../../redux/slices/sms';

const mapStateToProps = (state) => {
  return {
    sms: selectSms(state),
  };
};

const mapDispatchToProps = () => {
  return {};
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    title: string;
    loading?: boolean;
    disabled: boolean;
    handleSubmit: (...args: unknown[]) => unknown;
  };

class SubmitButton extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      sms: { estimate },
      handleSubmit,
      disabled,
      loading,
      title,
    } = this.props;

    return loading ? (
      <LoadingButton loading size="large" variant="contained" color="primary">
        {`Sending ${estimate as number} Texts`}
      </LoadingButton>
    ) : (
      <Button
        onClick={handleSubmit}
        disabled={disabled}
        variant="contained"
        size="medium"
        color="primary"
        aria-label="add"
        sx={{ color: 'white' }}
      >
        <Icon sx={{ mr: 1 }}>send</Icon>
        {title}
      </Button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);
