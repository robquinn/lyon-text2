import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

class PhonesLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack
        p={0}
        mx={0}
        my={2}
        height="25px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0.5}
      >
        <Skeleton sx={{ p: 0, m: 0 }} height={90} width={210} />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
    );
  }
}

export default PhonesLoader;
