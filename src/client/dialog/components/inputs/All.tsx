import { Typography } from '@mui/material';
import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { connect } from 'react-redux';

// This is a wrapper for google.script.run that lets us use promises.
import { selectSms, smsSlice } from '../../redux/slices/sms';

const mapStateToProps = (state) => selectSms(state);

const mapDispatchToProps = (dispatch) => {
  return {
    setAll: (value: boolean) =>
      Promise.resolve(dispatch(smsSlice.actions.all(value))),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    channel: () => void;
  };

class AllInput extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    const { setAll, channel } = this.props;
    setAll(checked)
      .then(() => channel())
      .catch((err) => console.log((err as Error).message));
  }

  render() {
    const {
      data: { all },
    } = this.props;

    return (
      <>
        <Typography variant="subtitle2" component="h3">
          All Company
        </Typography>

        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ p: 0, m: 0 }}
                checked={all}
                id="allCompany"
                onChange={this.handleChange}
              />
            }
            label={
              <Typography variant="caption" component="p">
                All Company
              </Typography>
            }
          />
        </FormGroup>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllInput);
