import AddIcon from '@mui/icons-material/Add'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDialog } from '../../../hooks/useDialog'
import { createPhase } from '../../../store/effects/application'

const PhaseDialog = ({ onClose }: any) => {
  const [nameInput, setNameInput] = useState('')
  const dispatch = useDispatch()

  const model = useDialog({
    onSubmit: () => dispatch(createPhase({ name: nameInput })),
    onClose,
  })

  const handleNameInputChange = ({ target: { value } }) => setNameInput(value)

  return (
    <>
      <ListItem button onClick={model.show}>
        <ListItemIcon style={{ minWidth: '30px' }}>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary={'Add Phase'} />
      </ListItem>
      <Dialog {...model.dialogProps}>
        <DialogTitle>Add Phase</DialogTitle>
        <DialogContent>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item style={{ padding: '20px' }}>
              <TextField
                label="Enter phase name"
                value={nameInput}
                variant="standard"
                required
                onChange={handleNameInputChange}
                onKeyDown={({ key }) => {
                  if (key === 'Enter') {
                    model.onConfirm()
                  }
                }}
                autoFocus
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={!nameInput} onClick={model.onConfirm}>
            Confirm
          </Button>
          <Button onClick={model.hide}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PhaseDialog
