import { ApplicationState, ApplicationAction } from '../types'
import { produce } from 'immer'

const initialState: ApplicationState = {
  loggedIn: false,
  loading: false,
  user: {
    name: '',
    weight: 0,
  },
  mesocycles: [],
  phases: [],
  selectedPhase: undefined,
  error: undefined,
}

const application = (state = initialState, action: ApplicationAction) => {
  switch (action.type) {
    case 'resetApplicationState':
      return initialState

    case 'setErrorState':
      return {
        ...state,
        error: action.error,
      }

    case 'setSelectedPhase':
      return produce(state, (draft) => {
        draft.selectedPhase = action.phase
      })

    // users
    case 'loadUserRequest':
      return {
        ...state,
        loading: true,
      }
    case 'loadUserSuccess':
      const { user } = action
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user,
      }
    case 'loadUserError':
      return {
        ...state,
        error: action.error,
        loading: false,
        loggedIn: false,
      }

    // phases
    case 'loadPhasesRequest':
      return {
        ...state,
        loading: true,
      }
    case 'loadPhasesSuccess':
      const { phases } = action
      return {
        ...state,
        loading: false,
        phases,
      }
    case 'loadPhaseSuccess':
      const { phase } = action
      return {
        ...state,
        loading: false,
        phases: [{ ...phase, mesocycles: [] }, ...state.phases],
      }
    case 'loadPhasesError':
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    // mesos
    case 'loadMesocyclesRequest':
      return {
        ...state,
        loading: true,
      }
    case 'loadMesocyclesSuccess':
      const { mesocycles } = action
      return {
        ...state,
        loading: false,
        mesocycles,
      }
    case 'loadMesocycleSuccess':
      const { mesocycle } = action
      return {
        ...state,
        loading: false,
        mesocycles: [{ ...mesocycle, microcycles: [] }, ...state.mesocycles],
      }
    case 'loadMesocyclesError':
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    default:
      return state
  }
}

export default application
