import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDialog } from '../../hooks/useDialog'
import { RootState } from '../../store'
import { resetApplicationState } from '../../store/actions/application'
import { loadUser } from '../../store/effects/application'
import { ApplicationState } from '../../store/types'
import UserMenu from './UserMenu'

const LoginDialog = () => {
  const [userInput, setUserInput] = useState('')
  const { loggedIn, error } = useSelector<RootState, ApplicationState>((state) => state.application)
  const dispatch = useDispatch()

  const model = useDialog({
    onSubmit: () => dispatch(loadUser(userInput)),
  })

  const handleNameInputChange = ({ target: { value } }) => setUserInput(value)
  const handleSwitchUser = () => {
    dispatch(resetApplicationState())
    setUserInput('')
    model.show()
  }

  useEffect(() => {
    if (!loggedIn && !error) {
      model.show()
    } else {
      model.hide()
    }
  }, [loggedIn, error, model])

  return (
    <>
      {loggedIn ? (
        <UserMenu>
          {({ handleClose }) => [
            <MenuItem key={'profile'} onClick={handleClose}>
              Profile
            </MenuItem>,
            <MenuItem key={'switchUser'} onClick={handleSwitchUser}>
              Switch User
            </MenuItem>,
          ]}
        </UserMenu>
      ) : (
        <Button color="inherit" onClick={model.show}>
          Login
        </Button>
      )}
      <Dialog {...model.dialogProps}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item style={{ padding: '20px' }}>
              <TextField
                label="Enter username"
                value={userInput}
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
          <Button color="primary" disabled={!userInput} onClick={model.onConfirm}>
            Confirm
          </Button>
          <Button onClick={model.hide}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginDialog
