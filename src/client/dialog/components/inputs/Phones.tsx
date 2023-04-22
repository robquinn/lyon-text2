import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { connect } from 'react-redux';
import generateUUID from '../../../libs/uuid';
import { selectSms, smsSlice } from '../../redux/slices/sms';
import PhonesLoader from '../loaders/Phones';

const mapStateToProps = (state) => ({
  sms: selectSms(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPhones: (value) =>
      Promise.resolve(dispatch(smsSlice.actions.phones(value))),
    pushOrPopPhones: (value) => dispatch(smsSlice.actions.phones(value)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    channel: () => void;
  };

type Phone = { id: string; value: string };
class PhonesInput extends React.Component<Props, { phones: Phone[] }> {
  constructor(props) {
    super(props);
    this.state = {
      phones: [],
    };
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFab = this.addFab.bind(this);
    this.minusFab = this.minusFab.bind(this);
    this.clearFab = this.clearFab.bind(this);
    this.clear = this.clear.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.updatePhones = this.updatePhones.bind(this);
  }

  componentDidMount(): void {
    this.push();
  }

  handleChange(
    value: string,
    _data: CountryData | object,
    event: React.ChangeEvent<HTMLInputElement>,
    _formattedValue: string,
    id: string
  ) {
    event.persist();
    const { phones: phoneState } = this.state;
    const phones = [...phoneState];
    phones[phones.map((p) => p.id).indexOf(id)] = { value: `+${value}`, id };
    this.setState({ phones: [...phones] });
  }

  handleBlur() {
    this.updatePhones();
  }

  clear(id: string) {
    const { phones: phoneState } = this.state;
    const phones = [...phoneState];
    const target = phones.map((p) => p.id).indexOf(id);
    phones[target] = { value: `+1`, id };
    this.setState({ phones: [...phones] });
    return Promise.resolve();
  }

  push() {
    const { phones: phonesState } = this.state;
    const phones = phonesState.length > 0 ? [...phonesState] : [];

    phones.push({
      id: generateUUID(),
      value: '+1',
    });
    this.setState({ phones: [...phones] });
  }

  pop(id: string) {
    const { phones: phoneState } = this.state;
    const phones = [...phoneState];
    phones.splice(phones.map((p) => p.id).indexOf(id), 1);
    this.setState({ phones: [...phones] });
    return Promise.resolve();
  }

  updatePhones() {
    const { phones: phoneState } = this.state;
    const { setPhones, channel } = this.props;

    const phones = [...phoneState]
      .map((p) => p.value)
      .flat()
      .filter((p) => p.length === 12);
    setPhones(phones.length > 0 ? phones : [])
      .then(() => channel())
      .catch((err) => console.log((err as Error).message));
  }

  addFab() {
    return (
      <Button
        variant="contained"
        onClick={() => this.push()}
        color="primary"
        aria-label="add"
        size="small"
        sx={{ minWidth: 0 }}
      >
        <Icon fontSize="small">add</Icon>
      </Button>
    );
  }

  minusFab(phone: Phone) {
    return (
      <Button
        variant="contained"
        onClick={() => {
          this.pop(phone.id)
            .then(() => {
              this.updatePhones();
              return 0;
            })
            .catch((err) => console.log((err as Error).message));
        }}
        color="primary"
        aria-label="remove"
        size="small"
        sx={{ minWidth: 0 }}
      >
        <Icon fontSize="small">remove</Icon>
      </Button>
    );
  }

  clearFab(phone: Phone) {
    return (
      <Button
        variant="contained"
        onClick={() => {
          this.clear(phone.id)
            .then(() => {
              this.updatePhones();
              return 0;
            })
            .catch((err) => console.log((err as Error).message));
        }}
        color="primary"
        aria-label="remove"
        size="small"
        sx={{ minWidth: 0 }}
      >
        <Icon fontSize="small">backspace</Icon>
      </Button>
    );
  }

  render() {
    const { phones } = this.state;
    return (
      <>
        <Typography variant="subtitle2" component="h3">
          Add Phone Number(s):
        </Typography>
        {phones.length > 0 ? (
          phones.map((phone, i) => (
            <Stack
              key={`${phone.id}`}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={0.5}
            >
              <>
                <PhoneInput
                  inputStyle={{
                    width: 210,
                    fontSize: '0.85rem',
                  }}
                  country="us"
                  value={phone.value}
                  prefix="+"
                  onBlur={this.handleBlur}
                  onChange={(
                    value: string,
                    data: CountryData | object,
                    event: React.ChangeEvent<HTMLInputElement>,
                    formattedValue: string
                  ) =>
                    this.handleChange(
                      value,
                      data,
                      event,
                      formattedValue,
                      phone.id
                    )
                  }
                />{' '}
                {i === 0 ? this.addFab() : this.minusFab(phone)}
                {this.clearFab(phone)}
              </>
            </Stack>
          ))
        ) : (
          <PhonesLoader />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhonesInput);
