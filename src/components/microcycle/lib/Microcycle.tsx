import { Add as AddIcon } from '@mui/icons-material'
import { Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MicrocycleInterface, SessionInterface } from '../../../interface'
import { plannerService } from '../../../services/plannerService'
import { RootState } from '../../../store'
import { ApplicationState } from '../../../store/types'
import AddSessionDialog, { useSessionsDialog } from './AddSession'
import SetsDialog, { useSetsDialog } from './SetsDialog'
import { humanDateString } from './utils'
import { makeStyles } from '@mui/styles'

export interface MicrocycleProps extends MicrocycleInterface {
  hidden?: boolean
  handleAddMicrocycle?: () => Promise<any>
}

const commonProps: any = {
  disableColumnMenu: true,
  sortable: false,
}

const Microcycle = (props: MicrocycleProps) => {
  const { id, date, deload, phase_id, mesocycle_id } = props
  const { user } = useSelector<RootState, ApplicationState>((state) => state.application)
  const [sessions, setSessions] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const classes = useStyles()

  const setsDialogModel = useSetsDialog({
    onConfirm: () => fetchSessions(),
  })
  const sessionsDialogModel = useSessionsDialog({
    onSubmit: async (name) => {
      await plannerService.postSession(user.name, {
        name,
        phase_id,
        mesocycle_id,
        microcycle_id: id,
      })

      await fetchSessions()
      setReload(true)
      setReload(false)
    },
  })

  const fetchSessions = useCallback(async () => {
    setLoading(true)

    const resp = await plannerService.getSessionsForMicrocycle(id)
    setSessions(resp.data)
    const { sessions: sessionsFormatted } = formatCycle({ sessions: resp.data, date, deload })
    setRows(sessionsFormatted)
    setLoading(false)
  }, [date, deload, id])

  useEffect(() => {
    fetchSessions()
    console.log(rows)
  }, [fetchSessions])

  useEffect(() => {
    if (setsDialogModel.showSetsDialog) {
      const session = sessions.find(({ id }) => setsDialogModel.context.id === id)
      setsDialogModel.setContext(session)
    }
  }, [sessions])

  const handleSetsClick = (session_id: number) => {
    setsDialogModel.show()
    const session: any = sessions.find((s: SessionInterface) => session_id === s.id) || {}
    setsDialogModel.setContext(session)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, hide: true, ...commonProps },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      editable: true,
      type: 'date',
      valueFormatter: ({ value }) => humanDateString(value),
      ...commonProps,
    },
    { field: 'name', headerName: 'Name', width: 125, editable: true, ...commonProps },
    { field: 'load', headerName: 'Load', type: 'number', width: 65, ...commonProps },
    {
      field: 'sets',
      headerName: 'Sets',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      width: 62,
      renderCell: ({ value, row }) => (
        <>
          {value ? (
            <a href="#" onClick={() => handleSetsClick(row.session_id)}>
              {value}
            </a>
          ) : (
            <IconButton onClick={() => handleSetsClick(row.session_id)} size="small">
              <AddIcon fontSize="small" />
            </IconButton>
          )}
        </>
      ),
      ...commonProps,
    },
    { field: 'rep_max', headerName: 'Rep Max', type: 'number', width: 88, ...commonProps },
    { field: 'rep_min', headerName: 'Rep Min', type: 'number', width: 85, ...commonProps },
    { field: 'rep_avg', headerName: 'Rep Avg', type: 'number', width: 85, ...commonProps },
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button color="primary" onClick={() => sessionsDialogModel.show()}>
          Add Session
        </Button>
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {new Date(date).toDateString()}
            {deload && '*'}
          </Typography>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item>
              {!reload ? (
                <DataGrid
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  onCellEditCommit={async ({ field, value, row }: any, e: any) => {
                    if (field !== 'date') return
                    const body = {}
                    body[field] = value
                    await plannerService.putSession(row.session_id, body)
                  }}
                  onCellEditStop={async ({ field, row }: any, e: any) => {
                    if (field !== 'name') return
                    const body = {}
                    body[field] = e.target.value
                    await plannerService.putSession(row.session_id, body)
                  }}
                  rows={rows}
                  columns={columns}
                  headerHeight={45}
                  rowHeight={40}
                  disableExtendRowFullWidth={true}
                  autoPageSize={true}
                  autoHeight={true}
                  hideFooterPagination={true}
                  loading={loading}
                  pageSize={50}
                  className={classes.dataGrid}
                  // experimentalFeatures={{ newEditingApi: true }}
                />
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <AddSessionDialog model={sessionsDialogModel} />
      <SetsDialog model={setsDialogModel} />
    </>
  )
}

export default Microcycle

const useStyles = makeStyles({
  dataGrid: {
    borderRadius: 3,
    border: 0,
    boxShadow: '0 2px 5px 2px rgba(0,0,0, .3)',
    width: '92vw',
  },
})

const formatCycle = (cycle: any) => {
  const { sessions, date, deload } = cycle

  const currentCycleSessions: any = []

  sessions?.forEach((session) => {
    const { id: session_id, sets, date, name } = session

    const loads = Array.from(new Set(sets.map((set) => set.load)))

    if (loads.length) {
      loads.forEach((load, i) => {
        const load_reps = sets.filter((set) => set.load === load).map((set) => set.reps)
        currentCycleSessions.push({
          id: name + i + date,
          date: new Date(date),
          session_id,
          name,
          load,
          sets: sets.filter((set) => set.load === load).length,
          rep_max: Math.max(...load_reps),
          rep_min: Math.min(...load_reps),
          rep_avg: Math.round(load_reps.reduce((acc, reps) => (acc += reps), 0) / load_reps.length),
        })
      })
    } else {
      currentCycleSessions.push({
        id: name + date,
        date: new Date(date),
        session_id,
        name,
      })
    }
  })

  console.log({
    date,
    deload: !!deload,
    sessions: currentCycleSessions,
  })
  return {
    date,
    deload: !!deload,
    sessions: currentCycleSessions,
  }
}
