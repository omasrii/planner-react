import { AxiosError } from 'axios'
import { Action } from 'redux'
import { MesocycleInterface, PhaseInterface, UserInterface } from '../interface'

export interface ApplicationState {
  loggedIn: boolean
  loading: boolean
  user: UserInterface
  phases: PhaseInterface[]
  mesocycles: MesocycleInterface[]
  error?: AxiosError
  selectedPhase?: PhaseInterface
}

export interface ResetApplicationState extends Action {
  type: 'resetApplicationState'
}

export interface SetErrorState extends Action {
  type: 'setErrorState'
  error?: AxiosError
}

// users
export interface LoadUserRequest extends Action {
  type: 'loadUserRequest'
}

export interface LoadUserSuccess extends Action {
  type: 'loadUserSuccess'
  user: UserInterface
}

export interface LoadUserError extends Action {
  type: 'loadUserError'
  error: AxiosError
}

// phases
export interface LoadPhasesRequest extends Action {
  type: 'loadPhasesRequest'
}
export interface LoadPhasesSuccess extends Action {
  type: 'loadPhasesSuccess'
  phases: PhaseInterface[]
}
export interface LoadPhaseSuccess extends Action {
  type: 'loadPhaseSuccess'
  phase: PhaseInterface
}
export interface LoadPhasesError extends Action {
  type: 'loadPhasesError'
  error: AxiosError
}
export interface SetSelectedPhase extends Action {
  type: 'setSelectedPhase'
  phase: PhaseInterface
}

// mesos
export interface LoadMesocyclesRequest extends Action {
  type: 'loadMesocyclesRequest'
}

export interface LoadMesocyclesSuccess extends Action {
  type: 'loadMesocyclesSuccess'
  mesocycles: MesocycleInterface[]
}
export interface LoadMesocycleSuccess extends Action {
  type: 'loadMesocycleSuccess'
  mesocycle: MesocycleInterface
}

export interface LoadMesocyclesError extends Action {
  type: 'loadMesocyclesError'
  error: AxiosError
}

export type ApplicationAction =
  | ResetApplicationState
  | SetSelectedPhase
  | SetErrorState
  | LoadUserRequest
  | LoadUserSuccess
  | LoadUserError
  | LoadMesocyclesRequest
  | LoadMesocyclesSuccess
  | LoadMesocycleSuccess
  | LoadMesocyclesError
  | LoadPhasesRequest
  | LoadPhasesSuccess
  | LoadPhaseSuccess
  | LoadPhasesError
