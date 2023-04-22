import * as React from 'react';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { resolveObjPath } from '../../../libs/resolveObj';
import ResultTable from './ResultTable';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<Icon sx={{ fontSize: '0.9rem' }}>arrow_forward_ios</Icon>}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  minHeight: 'min-content',
  flexDirection: 'row-reverse',
  fontSize: '0.2rem',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface IProps {
  id: number;
  message: Messages.Payload.Sent | Messages.Payload.Preview;
  type: Search.Types;
}

class ResultAccordian extends React.Component<IProps> {
  constructor(props) {
    super(props as IProps);
    this.state = {};
  }

  render() {
    const { message, type } = this.props;

    const firstName: string = resolveObjPath(
      type === 'sent' ? 'user.firstName' : 'user.firstName',
      message
    ) as string;
    const lastName: string = resolveObjPath(
      type === 'sent' ? 'user.lastName' : 'user.lastName',
      message
    ) as string;
    const phone: string = resolveObjPath(
      type === 'sent' ? 'response.to' : 'request.options.payload.To',
      message
    ) as string;
    return (
      <Accordion sx={{ width: '99%' }} disableGutters>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="caption" fontWeight="bold">
            {firstName === 'UNKNOWN' && lastName === 'UNKNOWN'
              ? 'UKNOWN'
              : `${firstName} ${lastName}`}
          </Typography>
          <Typography ml={1} variant="caption">
            ({phone})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ResultTable type={type} message={message} />
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default ResultAccordian;
