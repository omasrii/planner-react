import { Typography } from '@material-ui/core'
import MenuIcon from '@mui/icons-material/Menu'
import NoteIcon from '@mui/icons-material/Note'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setSelectedPhase } from '../store/actions/application'
import { loadPhase } from '../store/effects/application'
import { ApplicationState } from '../store/types'
import { humanDateString } from './microcycle/lib/utils'
import PhaseDialog from './phase/lib/PhaseDialog'

export default function SwipeableTemporaryDrawer() {
  const [open, setOpen] = useState(false)
  const { phases, selectedPhase } = useSelector<RootState, ApplicationState>(
    (state) => state.application
  )
  const dispatch = useDispatch()

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open)
  }

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <PhaseDialog onClose={toggleDrawer(false)} />
      </List>
      <Divider />
      <List>
        {phases.map((phase, index) => (
          <React.Fragment key={phase.name}>
            <Typography align="center" color="textSecondary">
              {humanDateString(phase.date)}
            </Typography>
            <ListItemButton
              selected={phase.id === selectedPhase?.id}
              key={`${phase.date}-${index}`}
              onClick={() => {
                dispatch(setSelectedPhase(phase))
                dispatch(loadPhase(phase.id!))
                toggleDrawer(false)()
              }}
            >
              <ListItemIcon style={{ minWidth: '30px' }}>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary={phase.name} style={{ whiteSpace: 'nowrap' }} />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={'left'}
          open={open}
          disableSwipeToOpen={false}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </>
    </div>
  )
}
