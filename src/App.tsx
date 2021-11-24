import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from './components/AppHeader'
import ApplicationErrorBanner from './components/ApplicationErrorBanner'
import EmptyState from './components/EmptyState'
import Mesocycle from './components/mesocycle'
import Phase from './components/phase'
import { RootState } from './store'
import { createMesocycle } from './store/effects/application'
import { ApplicationState } from './store/types'

const App = () => {
  const { user, mesocycles, phases, selectedPhase } = useSelector<RootState, ApplicationState>(
    (state) => state.application
  )
  const dispatch = useDispatch()

  return (
    <>
      <AppHeader />
      <ApplicationErrorBanner />
      {user.name && selectedPhase && (
        <Phase phase={selectedPhase}>
          <MesocycleContainer>
            <AddMesocycleContainer>
              <Button
                color="primary"
                variant="outlined"
                size="large"
                onClick={() => dispatch(createMesocycle())}
              >
                Add Mesocycle
              </Button>
            </AddMesocycleContainer>
            {mesocycles.map((mesocycle) => {
              const { date } = mesocycle
              return <Mesocycle key={date} {...mesocycle} />
            })}
          </MesocycleContainer>
        </Phase>
      )}
      {!phases.length && user.name && <EmptyState />}
    </>
  )
}

export default App

const MesocycleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const AddMesocycleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5px',
  marginBottom: '15px',
})
