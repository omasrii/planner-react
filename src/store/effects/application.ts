import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'
import { MesocycleInterface, PhaseInterface } from '../../interface'
import { PhaseRequest, plannerService, UserRequest } from '../../services/plannerService'
import {
  loadMesocyclesError,
  loadMesocyclesRequest,
  loadMesocyclesSuccess,
  loadMesocycleSuccess,
  loadPhasesError,
  loadPhasesRequest,
  loadPhasesSuccess,
  loadPhaseSuccess,
  loadUserError,
  loadUserRequest,
  loadUserSuccess,
  setSelectedPhase,
} from '../actions/application'
import { ApplicationAction } from '../types'

type Effect = ThunkAction<any, RootState, any, ApplicationAction>

export const loadUser =
  (user: string): Effect =>
  async (dispatch, getState) => {
    dispatch(loadUserRequest())

    try {
      const userResp = await plannerService.getUser(user)
      await dispatch(loadUserSuccess(userResp.data))
      await dispatch(loadPhases())
      await dispatch(loadMesocycles())

      const { phases, selectedPhase } = getState().application
      if (phases.length && !selectedPhase) {
        // default to latest/current phase on login
        dispatch(setSelectedPhase(phases[0]))
      }
    } catch (error: any) {
      dispatch(loadUserError(error))
    }
  }

export const createUser =
  (body: UserRequest): Effect =>
  async (dispatch, _getState) => {
    dispatch(loadUserRequest())

    try {
      const userResp = await plannerService.postUser(body)
      dispatch(loadUserSuccess(userResp.data))
    } catch (error: any) {
      dispatch(loadUserError(error))
    }
  }

export const loadMesocycles = (): Effect => async (dispatch, getState) => {
  const { user } = getState().application
  dispatch(loadMesocyclesRequest())

  try {
    const { data: mesocycles }: { data: MesocycleInterface[] } = await plannerService.getMesocycles(
      user.name
    )
    dispatch(loadMesocyclesSuccess(mesocycles))
  } catch (error: any) {
    dispatch(loadMesocyclesError(error))
  }
}
export const createMesocycle = (): Effect => async (dispatch, getState) => {
  const { user, selectedPhase } = getState().application
  dispatch(loadMesocyclesRequest())

  try {
    const mesoResp = await plannerService.postMesocycle(user.name, { phase_id: selectedPhase?.id! })
    dispatch(loadMesocycleSuccess(mesoResp.data))
  } catch (error: any) {
    dispatch(loadMesocyclesError(error))
  }
}

export const loadPhases = (): Effect => async (dispatch, getState) => {
  const { user } = getState().application
  dispatch(loadPhasesRequest())

  try {
    const { data: phases }: { data: PhaseInterface[] } = await plannerService.getPhases(user.name)
    dispatch(loadPhasesSuccess(phases))
  } catch (error: any) {
    dispatch(loadPhasesError(error))
  }
}

export const loadPhase =
  (id: number): Effect =>
  async (dispatch, getState) => {
    const { user } = getState().application
    dispatch(loadPhasesRequest())

    try {
      const { data: phase }: { data: PhaseInterface } = await plannerService.getPhase(user.name, id)
      // load mesocycles for this phase
      await dispatch(loadMesocyclesSuccess(phase.mesocycles))
    } catch (error: any) {
      dispatch(loadPhasesError(error))
    }
  }

export const createPhase =
  (body: PhaseRequest): Effect =>
  async (dispatch, getState) => {
    const { user } = getState().application
    dispatch(loadPhasesRequest())

    try {
      const { data: phase }: { data: PhaseInterface } = await plannerService.postPhase(
        user.name,
        body
      )
      await dispatch(loadPhaseSuccess(phase))
      await dispatch(setSelectedPhase(phase))
    } catch (error: any) {
      dispatch(loadPhasesError(error))
    }
  }
