import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material'
import { useState } from 'react'

const AddSessionDialog = ({ model }: any) => {
  const handleNameChange = ({ target: { value } }) => {
    model.setContext(value)
  }

  return (
    <Dialog {...model.dialogProps}>
      <DialogTitle>Add Session</DialogTitle>
      <DialogContent>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item style={{ padding: '20px' }}>
            <TextField
              label="Name (e.g. Bench Press)"
              value={model.context}
              variant="standard"
              required
              autoFocus
              onChange={handleNameChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={model.onConfirm} disabled={!model.context}>
          Confirm
        </Button>
        <Button onClick={model.hide} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddSessionDialog

export const useSessionsDialog = ({ onSubmit }) => {
  const [showSessionsDialog, setShowSessionsDialog] = useState(false)
  const [context, setContext] = useState('')

  return {
    dialogProps: {
      open: showSessionsDialog,
    },
    onConfirm: () => {
      onSubmit(context)
      setShowSessionsDialog(false)
    },
    show: () => setShowSessionsDialog(true),
    hide: () => setShowSessionsDialog(false),
    setContext: (context: any) => setContext(context),
    context,
    showSessionsDialog,
  }
}
