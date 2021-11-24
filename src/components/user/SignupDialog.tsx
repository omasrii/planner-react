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
import { useDispatch, useSelector } from 'react-redux'
import { useDialog } from '../../hooks/useDialog'
import { RootState } from '../../store'
import { createUser } from '../../store/effects/application'
import { ApplicationState } from '../../store/types'

const SignupDialog = () => {
  const [userInput, setUserInput] = useState('')
  const [weightInput, setWeightInput] = useState(0)
  const { loggedIn } = useSelector<RootState, ApplicationState>((state) => state.application)
  const dispatch = useDispatch()

  const model = useDialog({
    onSubmit: () => {
      dispatch(createUser({ name: userInput, weight: weightInput }))
    },
  })

  const handleNameInputChange = ({ target: { value } }) => setUserInput(value)
  const handleWeightInputChange = ({ target: { value } }) => setWeightInput(value)
  // const handleInputKeyDown = ({ key }) => {
  //   if (key === 'Enter') {
  //     model.onConfirm()
  //     model.hide()
  //   }
  // }

  return (
    <>
      {!loggedIn && (
        <Button color="inherit" onClick={model.show}>
          Sign Up
        </Button>
      )}
      <Dialog {...model.dialogProps}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item style={{ padding: '20px' }}>
              <TextField
                label="Enter username"
                value={userInput}
                variant="standard"
                required
                onChange={handleNameInputChange}
                // onKeyDown={handleInputKeyDown}
                autoFocus
              />
            </Grid>
            <Grid item style={{ padding: '20px' }}>
              <TextField
                label="Enter weight"
                value={weightInput}
                variant="standard"
                required
                onChange={handleWeightInputChange}
                // onKeyDown={handleInputKeyDown}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={!userInput || !weightInput} onClick={model.onConfirm}>
            Confirm
          </Button>
          <Button onClick={model.hide}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SignupDialog
