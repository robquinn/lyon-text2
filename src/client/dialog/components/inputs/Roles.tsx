import { Typography } from '@mui/material';
import _ from 'lodash';
import React from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

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
    setSmsRoles: (value) =>
      Promise.resolve(dispatch(smsSlice.actions.roles(value))),
    setSheetRoles: (value) => dispatch(sheetSlice.actions.roles(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    channel: () => void;
  };

class RolesInput extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(): void {
    const { setSheetRoles } = this.props;
    serverFunctions
      .getRoles()
      .then((roles) => setSheetRoles(roles))
      .catch((err) => console.log((err as Error).message));
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    event.persist();
    const { setSmsRoles, channel, sms } = this.props;
    const roles = [...sms.data.roles];
    if (checked) roles.push(event.target.id);
    else roles.splice(roles.indexOf(event.target.id), 1);

    setSmsRoles(roles)
      .then(() => channel())
      .catch((err) => console.log((err as Error).message));
  }

  render() {
    const { sms, sheet } = this.props;

    return (
      <>
        <Typography variant="subtitle2" component="h3">
          {sms.data.all ? 'Except' : 'Select'} Role(s):
        </Typography>
        <InputsAccordian title="Click to Expand">
          {sheet.roles.length > 0 ? (
            <FormGroup sx={{ ml: 2 }}>
              {sheet.roles.map((role) => (
                <Box key={role}>
                  <FormControlLabel
                    key={`role-form-control-key-${role}`}
                    control={
                      <Checkbox
                        key={`role-checkbox-key-${role}`}
                        sx={{ p: 0, m: 0 }}
                        checked={sms.data.roles.includes(_.kebabCase(role))}
                        id={_.kebabCase(role)}
                        onChange={this.handleChange}
                      />
                    }
                    label={
                      <Typography
                        key={`role-label-key-${role}`}
                        variant="caption"
                        component="p"
                      >
                        {role}
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
export default connect(mapStateToProps, mapDispatchToProps)(RolesInput);
