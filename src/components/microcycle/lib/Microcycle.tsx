import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef, GridRowParams, GridToolbarContainer } from '@mui/x-data-grid';
import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Refresh } from "@mui/icons-material"
import { MicrocycleInterface, SessionInterface } from '../../../interface';
import AddSessionDialog, { useSessionsDialog } from './AddSession';
import SetsDialog, { useSetsDialog } from './SetsDialog';
import { humanDateString } from './utils';

export interface MicrocycleProps extends MicrocycleInterface {
  hidden?: boolean
  handleAddMicrocycle?: () => Promise<any>
}

const commonProps: any = {
  disableColumnMenu: true,
  sortable: false,
  // align: 'center'
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50, hide: true, ...commonProps },
  { field: 'date', headerName: 'Date', width: 150, ...commonProps },
  { field: 'name', headerName: 'Name', width: 130, ...commonProps },
  { field: 'load', headerName: 'Load', type: 'number', width: 65, ...commonProps },
  { field: 'sets', headerName: 'Sets', type: 'number', width: 62, ...commonProps },
  { field: 'rep_max', headerName: 'Rep Max', type: 'number', width: 88, ...commonProps },
  { field: 'rep_min', headerName: 'Rep Min', type: 'number', width: 85, ...commonProps },
  { field: 'rep_avg', headerName: 'Rep Avg', type: 'number', width: 85, ...commonProps },
]

const Microcycle = (props: MicrocycleProps) => {
  const { id, date, deload, phase_id, mesocycle_id } = props
  const [sessions, setSessions] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false);
  const classes = useStyles()

  const setsDialogModel = useSetsDialog({
    onConfirm: () => fetchSessions()
  })
  const sessionsDialogModel = useSessionsDialog({
    onSubmit: async (name) => {
      let resp = await axios.post(`http://10.0.0.191:7000/sessions/omar`, {
        session: {
          name,
          phase_id,
          mesocycle_id,
          microcycle_id: id
        }
      })
      console.log(resp.data)
      console.log('Test')
      await fetchSessions()
      setReload(true)
      setReload(false)
    }
  })

  const fetchSessions = async () => {
    setLoading(true)
    const resp = await axios.get(`http://10.0.0.191:7000/microcycles/${id}/sessions`)
    setSessions(resp.data)
    const { sessions: sessionsFormatted } = formatCycle({ sessions: resp.data, date, deload })
    setRows(sessionsFormatted)
    setLoading(false)
  }

  const addSession = () => {
    sessionsDialogModel.show()
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const handleRowClick = (params: GridRowParams) => {
    setsDialogModel.show()
    const session: any = sessions.find((s: SessionInterface) => params.row.session_id === s.id) || {}
    setsDialogModel.setContext(session)
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button color="primary" onClick={addSession}>Add Session</Button>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>

          <Typography gutterBottom variant="h6" component="div">
            {new Date(date).toDateString()}{deload && '*'}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              {!reload ?
                <DataGrid
                  components={{
                    Toolbar: CustomToolbar
                  }}
                  onCellClick={(_, e) => e.preventDefault()}
                  onRowClick={handleRowClick}
                  rows={rows || []}
                  columns={columns}
                  rowHeight={40}
                  disableExtendRowFullWidth={true}
                  autoPageSize={true}
                  autoHeight={true}
                  hideFooterPagination={true}
                  loading={loading}
                  className={classes.dataGrid} />
                : null}

            </Grid>

          </Grid>
        </CardContent>
      </Card>

      <AddSessionDialog model={sessionsDialogModel} />
      <SetsDialog model={setsDialogModel} />
    </>

  )
}

export default Microcycle;

const useStyles = makeStyles({
  dataGrid: {
    borderRadius: 3,
    border: 0,
    boxShadow: "0 2px 5px 2px rgba(0,0,0, .3)",
    width: "92vw"
  }
});

const formatCycle = (cycle: MicrocycleProps) => {
  const { sessions, date, deload } = cycle

  const currentCycleSessions: any = []

  sessions?.forEach(session => {
    const { id: session_id, sets, date, name } = session

    const loads = Array.from(new Set(sets.map(set => set.load)))

    if (loads.length) {
      loads.map((load, i) => {
        const load_reps = sets.filter(set => set.load === load).map(set => set.reps)
        currentCycleSessions.push({
          id: name + i + date,
          date: humanDateString(date),
          session_id,
          name,
          load,
          sets: sets.filter(set => set.load === load).length,
          rep_max: Math.max(...load_reps),
          rep_min: Math.min(...load_reps),
          rep_avg: Math.round(load_reps.reduce((acc, reps) => acc += reps, 0) / load_reps.length)
        })
      })
    } else {
      currentCycleSessions.push({
        id: name + date,
        date: humanDateString(date),
        session_id,
        name,
      })
    }


  })

  console.log({
    date: date,
    deload: !!deload,
    sessions: currentCycleSessions
  })
  return {
    date: date,
    deload: !!deload,
    sessions: currentCycleSessions
  }
}
