import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { resolveObjProps } from '../../../libs/resolveObj';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface IProps {
  message: Messages.Payload.Preview | Messages.Payload.Sent;
  type: Search.Types;
}

class ResultTable extends React.Component<IProps> {
  constructor(props) {
    super(props as IProps);
    this.state = {};
    this.handleKey = this.handleKey.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  handleKey(key) {
    let newKey = '';
    if (key === 'Body' || key === 'body') newKey = 'Message';
    else newKey = key;
    return _.startCase(newKey);
  }

  handleValue(value) {
    let newValue;
    const props = { variant: 'caption' as const };
    switch (true) {
      case typeof value === 'object':
        newValue = <Typography {...props}>{JSON.stringify(value)}</Typography>;
        break;
      case typeof value === 'undefined':
        newValue = (
          <Typography {...props} fontWeight="bold">
            NULL
          </Typography>
        );
        break;
      case typeof value === 'string' && value.length === 0:
        newValue = (
          <Typography {...props} fontWeight="bold">
            NULL
          </Typography>
        );
        break;
      case typeof value === 'string':
        newValue = <Typography {...props}>{value}</Typography>;
        break;
      case typeof value === 'boolean':
        newValue = <Typography {...props}>{JSON.stringify(value)}</Typography>;
        break;
      default:
        break;
    }
    return newValue as React.ReactNode;
  }

  render() {
    const { type, message } = this.props;
    console.log('message', message);
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell padding="none" size="small">
                Key
              </StyledTableCell>
              <StyledTableCell padding="none" size="small">
                Value
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Object.entries(
              type === 'sent'
                ? ({
                    ...(resolveObjProps(
                      ['to', 'from', 'body'] as string[],
                      (message as Messages.Payload.Sent).response
                    ) as object),
                    ...resolveObjProps(
                      ['firstName', 'lastName', 'office', 'role', 'isNinja'],
                      message.user
                    ),
                  } as object)
                : {
                    ...(resolveObjProps(
                      ['To', 'Body', 'From'] as string[],
                      (message as Messages.Payload.Preview).request.options
                        .payload
                    ) as object),
                    ...(resolveObjProps(
                      [
                        'firstName',
                        'lastName',
                        'office',
                        'role',
                        'isNinja',
                      ] as string[],
                      message.user
                    ) as object),
                  }
            ).map(([key, value]) => {
              return (
                <StyledTableRow
                  key={`${key}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell
                    sx={{ textSize: '0.2rem' }}
                    padding="none"
                    size="small"
                    component="th"
                    scope="row"
                  >
                    <Typography variant="caption" fontWeight="bold">
                      {this.handleKey(key)}{' '}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      textSize: '0.2rem',

                      wordWrap: 'break-word',
                    }}
                    padding="none"
                    size="small"
                  >
                    {this.handleValue(value)}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default ResultTable;
