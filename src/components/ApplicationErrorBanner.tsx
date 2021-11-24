import { Dialog, DialogTitle, IconButton, DialogContent, Alert, AlertTitle } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setErrorState } from '../store/actions/application'
import { ApplicationState } from '../store/types'
import CloseIcon from '@mui/icons-material/Close'

const ApplicationErrorBanner = () => {
  const { error } = useSelector<RootState, ApplicationState>((state) => state.application)
  const dispatch = useDispatch()

  return (
    <Dialog open={!!error} maxWidth="md" fullWidth>
      <DialogTitle>
        Application Error
        <IconButton
          aria-label="close"
          onClick={() => {
            dispatch(setErrorState(undefined))
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>{error?.response?.status}</AlertTitle>
          {error?.response?.data}
        </Alert>
      </DialogContent>
    </Dialog>
  )
}

export default ApplicationErrorBanner
