import * as React from 'react';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: '90%',
  margin: theme.spacing(1),
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
  title: string;
  children: React.ReactNode;
}

export default class InputsAccordian extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, children } = this.props;
    return (
      <Accordion>
        <AccordionSummary>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    );
  }
}
