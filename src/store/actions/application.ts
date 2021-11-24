import { AxiosError } from 'axios'
import { MesocycleInterface, PhaseInterface, UserInterface } from '../../interface'
import * as AppActions from '../types'

export const resetApplicationState = (): AppActions.ResetApplicationState => ({
  type: 'resetApplicationState',
})

export const setErrorState = (error?: AxiosError): AppActions.SetErrorState => ({
  type: 'setErrorState',
  error,
})

export const setSelectedPhase = (phase: PhaseInterface): AppActions.SetSelectedPhase => ({
  type: 'setSelectedPhase',
  phase,
})

export const loadUserRequest = (): AppActions.LoadUserRequest => ({
  type: 'loadUserRequest',
})
export const loadUserSuccess = (user: UserInterface): AppActions.LoadUserSuccess => ({
  type: 'loadUserSuccess',
  user,
})
export const loadUserError = (error: AxiosError): AppActions.LoadUserError => ({
  type: 'loadUserError',
  error,
})

export const loadMesocyclesRequest = (): AppActions.LoadMesocyclesRequest => ({
  type: 'loadMesocyclesRequest',
})
export const loadMesocyclesSuccess = (
  mesocycles: MesocycleInterface[]
): AppActions.LoadMesocyclesSuccess => ({
  type: 'loadMesocyclesSuccess',
  mesocycles,
})
export const loadMesocycleSuccess = (
  mesocycle: MesocycleInterface
): AppActions.LoadMesocycleSuccess => ({
  type: 'loadMesocycleSuccess',
  mesocycle,
})
export const loadMesocyclesError = (error: AxiosError): AppActions.LoadMesocyclesError => ({
  type: 'loadMesocyclesError',
  error,
})

export const loadPhasesRequest = (): AppActions.LoadPhasesRequest => ({
  type: 'loadPhasesRequest',
})
export const loadPhasesSuccess = (phases: PhaseInterface[]): AppActions.LoadPhasesSuccess => ({
  type: 'loadPhasesSuccess',
  phases,
})
export const loadPhaseSuccess = (phase: PhaseInterface): AppActions.LoadPhaseSuccess => ({
  type: 'loadPhaseSuccess',
  phase,
})
export const loadPhasesError = (error: AxiosError): AppActions.LoadPhasesError => ({
  type: 'loadPhasesError',
  error,
})
