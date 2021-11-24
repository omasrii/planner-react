import React, { useState } from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DefaultTheme } from '@mui/styles'
import { Button, Checkbox, FormControlLabel, Grid, Popover } from '@mui/material'
import styled from '@emotion/styled'
import { MesocycleInterface } from '../../../interface'

const useStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    heading: {
      fontSize: '15px',
      marginRight: '5px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: '15px',
      opacity: '75%',
    },
  })
)

type MesocycleAccordionProps = {
  handleCollapse: any
  expanded: boolean
  mesocycleProps: MesocycleInterface
  children?: React.ReactElement[]
  handleAddMicrocycle: () => Promise<any>
}

const MesocycleAccordion = (props: MesocycleAccordionProps) => {
  const { expanded, handleCollapse, handleAddMicrocycle } = props
  const { date, microcycles } = props.mesocycleProps
  const classes = useStyles()

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleCollapse}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{ textAlign: 'center' }}
        >
          <Typography className={classes.heading}>
            Mesocycle | <strong>{new Date(date).toDateString()}</strong>{' '}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Duration: {microcycles.length} weeks
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MicrocycleContainer>
            <AddMicrocycle handleAddMicrocycle={handleAddMicrocycle} />
            {props.children}
          </MicrocycleContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default MesocycleAccordion

const MicrocycleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
})

const AddMicrocycle = ({ handleAddMicrocycle }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [deload, setDeload] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleConfirm = () => {
    handleAddMicrocycle(deload)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Button aria-describedby={id} color="primary" variant="outlined" onClick={handleClick}>
        Add Microcycle
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <AddMicrocyclePopupContainer>
          <Typography variant="h6" style={{ alignSelf: 'center' }}>
            Add Microcycle
          </Typography>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item style={{ padding: '20px' }}>
              <FormControlLabel
                label="Is this a deload?"
                control={
                  <Checkbox
                    value={deload}
                    onChange={({ target: { checked } }) => setDeload(checked)}
                  />
                }
              />
            </Grid>
          </Grid>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleClose}>Close</Button>
        </AddMicrocyclePopupContainer>
      </Popover>
    </>
  )
}

const AddMicrocyclePopupContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
})
