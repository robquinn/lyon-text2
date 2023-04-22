import _ from 'lodash';
import React from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';

// This is a wrapper for google.script.run that lets us use promises.
import { connect } from 'react-redux';
import serverFunctions from '../../../libs/serverFunctions';
import { selectSheet, sheetSlice } from '../../redux/slices/sheet';
import { selectSms, smsSlice } from '../../redux/slices/sms';
import CheckboxesLoader from '../loaders/Checkboxes';
import InputsAccordian from '../surfaces/Accordian';

const mapStateToProps = (state) => ({
  sms: selectSms(state),
  sheet: selectSheet(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSmsOffices: (value) =>
      Promise.resolve(dispatch(smsSlice.actions.offices(value))),
    setSheetOffices: (value) => dispatch(sheetSlice.actions.offices(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    channel: () => void;
  };

class OfficesInput extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(): void {
    const { setSheetOffices } = this.props;
    serverFunctions
      .getOffices()
      .then((offices) => {
        return setSheetOffices(offices);
      })
      .catch((err) => console.log((err as Error).message));
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    event.persist();
    const { sms, setSmsOffices, channel } = this.props;

    const offices = [...sms.data.offices];
    if (checked) offices.push(event.target.id);
    else offices.splice(offices.indexOf(event.target.id), 1);

    setSmsOffices(offices)
      .then(() => channel())
      .catch((err) => console.log((err as Error).message));
  }

  render() {
    const { sms, sheet } = this.props;

    return (
      <>
        <Typography variant="subtitle2" component="h3">
          {sms.data.all ? 'Except' : 'Select'} Office(s):
        </Typography>

        <InputsAccordian title="Click to Expand">
          {sheet.offices.length > 0 ? (
            <FormGroup sx={{ ml: 2 }}>
              {sheet.offices.map((office) => (
                <Box key={office}>
                  <FormControlLabel
                    key={`offices-form-control-key-${office}`}
                    control={
                      <Checkbox
                        key={`offices-checkbox-key-${office}`}
                        sx={{ p: 0, m: 0 }}
                        checked={sms.data.offices.includes(_.kebabCase(office))}
                        id={_.kebabCase(office)}
                        onChange={this.handleChange}
                      />
                    }
                    label={
                      <Typography
                        key={`offices-label-key${office}`}
                        variant="caption"
                        component="p"
                      >
                        {office}
                      </Typography>
                    }
                  />
                </Box>
              ))}
            </FormGroup>
          ) : (
            <CheckboxesLoader loaders={3} />
          )}
        </InputsAccordian>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficesInput);
