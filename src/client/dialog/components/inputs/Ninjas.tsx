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

const mapStateToProps = (state) => ({
  sms: selectSms(state),
  sheet: selectSheet(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSmsNinjas: (value) =>
      Promise.resolve(dispatch(smsSlice.actions.ninjas(value))),
    setSheetNinjas: (value) => dispatch(sheetSlice.actions.ninjas(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    channel: () => void;
  };

class NinjasInput extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(): void {
    const { setSheetNinjas } = this.props;
    serverFunctions
      .getNinjas()
      .then((ninjas) => {
        return setSheetNinjas(ninjas);
      })
      .catch((err) => console.log((err as Error).message));
  }

  handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    ninja: NinjasConfig.Choice
  ) {
    event.persist();
    const { sms, setSmsNinjas, channel } = this.props;
    const ninjas = [...sms.data.ninjas];
    if (checked) ninjas.push(ninja.id);
    else ninjas.splice(ninjas.indexOf(ninja.id), 1);

    setSmsNinjas(ninjas)
      .then(() => channel())
      .catch((err) => console.log((err as Error).message));
  }

  render() {
    const { sms, sheet } = this.props;

    return (
      <>
        <Typography variant="subtitle2" component="h3">
          {sms.data.all ? 'Except' : 'Select'} Ninja(s):
        </Typography>
        {sheet.ninjas.length > 0 ? (
          <FormGroup sx={{ ml: 2 }}>
            {sheet.ninjas.map((ninja) => (
              <Box key={`${ninja.name}`}>
                <FormControlLabel
                  key={`ninjas-form-control-key-${ninja.name}`}
                  control={
                    <Checkbox
                      key={`ninjas-checkbox-key-${ninja.name}`}
                      sx={{ p: 0, m: 0 }}
                      checked={sms.data.ninjas.includes(ninja.id)}
                      id={ninja.id.toString()}
                      onChange={(event, checked) =>
                        this.handleChange(event, checked, ninja)
                      }
                    />
                  }
                  label={
                    <Typography
                      key={`ninjas-label-key-${ninja.name}`}
                      variant="caption"
                      component="p"
                    >
                      {ninja.name}
                    </Typography>
                  }
                />
              </Box>
            ))}
          </FormGroup>
        ) : (
          <CheckboxesLoader loaders={3} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NinjasInput);
