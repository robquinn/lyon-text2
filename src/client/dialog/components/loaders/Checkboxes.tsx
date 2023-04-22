import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

interface IProps {
  loaders: number;
}

class CheckboxesLoader extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loaders } = this.props;
    return [...Array(loaders)].map((e) => (
      <Stack
        key={e}
        p={0}
        m={0}
        height="25px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0.5}
      >
        <Skeleton sx={{ m: 0, p: 0 }} height={35} width={25} />
        <Skeleton sx={{ p: 0, m: 0 }} height={15} width={80} />
      </Stack>
    ));
  }
}

export default CheckboxesLoader;
