import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material'
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state'
import { useState } from 'react'
import { humanDateString } from './utils'
import axios from 'axios'

const SetsDialog = ({ model }: any) => {
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer style={{ display: 'flex', justifyContent: 'center' }}>
        <AddSetPopup model={model} />
      </GridToolbarContainer>
    )
  }

  return (
    <Dialog {...model.dialogProps}>
      <DialogTitle>
        [{model.context.id}] {model.context.name}
        <Typography color="textSecondary">{humanDateString(model.context.date)}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box width={'70vw'} padding={2} alignContent="center">
          <DataGrid
            components={{
              Toolbar: CustomToolbar,
            }}
            rows={
              model.context.sets?.map((s, i) => {
                return { ...s, id: i + 1 }
              }) || []
            }
            columns={model.setsGridColumns}
            autoPageSize={true}
            autoHeight={true}
            hideFooterPagination={true}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={model.hide} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetsDialog

export const AddSetPopup = ({ model }: any) => {
  const [load, setLoad] = useState(0)
  const [reps, setReps] = useState(0)

  const handleAddSet = async (popupState) => {
    const { id: session_id } = model.context
    let resp = await axios.post(`${process.env.REACT_APP_PLANNER_API_URL}/sets/omar`, {
      set: {
        session_id,
        load,
        reps,
      },
    })
    console.log(resp.data)
    popupState.close()
    model.onConfirm()
    model.hide()
  }

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button color="primary" {...bindToggle(popupState)}>
            Add Set
          </Button>
          <Popper {...bindPopper(popupState)} transition style={{ zIndex: 9999 }}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item style={{ padding: '20px' }}>
                      <TextField
                        label="load"
                        value={load ? load : undefined}
                        required
                        placeholder="load (unitless)"
                        type="number"
                        autoFocus
                        onChange={({ target: { value } }) => setLoad(Number(value))}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="reps"
                        placeholder="# of reps"
                        value={reps ? reps : undefined}
                        type="number"
                        required
                        onChange={({ target: { value } }) => setReps(Number(value))}
                      />
                    </Grid>
                  </Grid>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                      size="large"
                      onClick={() => handleAddSet(popupState)}
                      disabled={!reps || !load}
                    >
                      Confirm
                    </Button>
                    <Button size="large" onClick={popupState.close}>
                      Close
                    </Button>
                  </div>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  )
}

export const useSetsDialog = ({ onConfirm }: any) => {
  const [showSetsDialog, setShowSetsDialog] = useState(false)
  const [context, setContext] = useState({} as any)

  const commonProps: any = {
    disableColumnMenu: true,
    sortable: false,
    // align: 'center'
  }
  const setsGridColumns = [
    { field: 'id', headerName: 'Set', type: 'number', minWidth: 60, ...commonProps },
    { field: 'load', headerName: 'Load', type: 'number', minWidth: 64, ...commonProps },
    { field: 'reps', headerName: 'Reps', type: 'number', minWidth: 64, ...commonProps },
  ]

  return {
    dialogProps: {
      open: showSetsDialog,
    },
    show: () => setShowSetsDialog(true),
    hide: () => setShowSetsDialog(false),
    onConfirm,
    setContext: (context: any) => setContext(context),
    context,
    showSetsDialog,
    setsGridColumns,
  }
}
