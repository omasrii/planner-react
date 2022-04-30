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
  TextField,
  Typography,
} from '@mui/material'
import Popper from '@mui/material/Popper'
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { plannerService } from '../../../services/plannerService'
import { RootState } from '../../../store'
import { ApplicationState } from '../../../store/types'
import { humanDateString } from './utils'

const SetsDialog = ({ model }: any) => {
  const { sets } = model.context

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer style={{ display: 'flex', justifyContent: 'center' }}>
        <AddSetPopup model={model} />
      </GridToolbarContainer>
    )
  }

  return (
    <Dialog {...model.dialogProps} fullWidth>
      <DialogTitle>
        [{model.context.id}] {model.context.name}
        <Typography color="textSecondary">{humanDateString(model.context.date)}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box padding={2} alignContent="center">
          <DataGrid
            components={{
              Toolbar: CustomToolbar,
            }}
            rows={sets?.map((set, i) => ({ ...set, id: i + 1, set_id: set.id })) || []}
            onCellEditStop={async ({ field, row }: any, e: any) => {
              const body = {}
              body[field] = e.target.value
              const resp = await plannerService.putSet(row.set_id, body)
              model.onConfirm()
            }}
            columns={model.setsGridColumns}
            headerHeight={40}
            rowHeight={40}
            autoPageSize={true}
            autoHeight={true}
            pageSize={50}
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
  const { user } = useSelector<RootState, ApplicationState>((state) => state.application)
  const [load, setLoad] = useState(0)
  const [reps, setReps] = useState(0)

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleAddSet = async () => {
    const { id: session_id } = model.context

    const resp = await plannerService.postSet(user.name, {
      session_id,
      load,
      reps,
    })

    setOpen(false)
    model.onConfirm()
    model.hide()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
  }

  return (
    <div>
      <Button color="primary" onClick={handleClick}>
        Add Set
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        style={{ zIndex: 9999 }}
      >
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
                <Button size="large" onClick={() => handleAddSet()} disabled={!reps || !load}>
                  Confirm
                </Button>
                <Button size="large" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

export const useSetsDialog = ({ onConfirm }: any) => {
  const [showSetsDialog, setShowSetsDialog] = useState(false)
  const [context, setContext] = useState({} as any)

  const commonProps: any = {
    disableColumnMenu: true,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
  }
  const setsGridColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', ...commonProps },
    { field: 'set_id', headerName: 'Set', type: 'number', hide: true, ...commonProps },
    { field: 'load', headerName: 'Load', type: 'number', editable: true, ...commonProps },
    { field: 'reps', headerName: 'Reps', type: 'number', editable: true, ...commonProps },
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
