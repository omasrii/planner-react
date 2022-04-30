import APIService from './apiService'

class PlannerService extends APIService {
  constructor() {
    super(`${process.env.REACT_APP_PLANNER_API_URL}`)
  }

  getUser(username: string) {
    return this.get(`users/${username}`)
  }

  postUser(user: UserRequest) {
    return this.post(`users`, { user })
  }

  getPhases(username: string) {
    return this.get(`phases/${username}`)
  }

  getPhase(username: string, id: number) {
    return this.get(`phases/${username}/${id}`)
  }

  postPhase(username: string, phase: PhaseRequest) {
    return this.post(`phases/${username}`, { phase })
  }

  getMesocycles(username: string) {
    return this.get(`mesocycles/${username}`)
  }
  postMesocycle(username: string, mesocycle: MesocycleRequest) {
    return this.post(`mesocycles/${username}`, { mesocycle })
  }

  postMicrocycle(username: string, microcycle: MicrocycleRequest) {
    return this.post(`microcycles/${username}`, { microcycle })
  }

  getSessionsForMicrocycle(microcycle_id: number) {
    return this.get(`microcycles/${microcycle_id}/sessions`)
  }

  postSession(user: string, session: SessionRequest) {
    return this.post(`sessions/${user}`, { session })
  }
  putSession(session_id: number, session: SessionRequest) {
    return this.put(`sessions/${session_id}`, { session })
  }

  postSet(user: string, set: SetRequest) {
    return this.post(`sets/${user}`, { set })
  }
  putSet(set_id: number, set: SetRequest) {
    return this.put(`sets/${set_id}`, { set })
  }
}

export const plannerService = new PlannerService()

export type UserRequest = {
  name: string
  weight: number
}
export type PhaseRequest = {
  name: string
  date?: string
}
export type MesocycleRequest = {
  phase_id: number
  date?: string
}

export type MicrocycleRequest = {
  phase_id: number
  mesocycle_id: number
  deload?: boolean
}

export type SessionRequest = {
  date?: string
  name?: string
  phase_id?: number
  mesocycle_id?: number
  microcycle_id?: number
}

export type SetRequest = {
  session_id?: number
  load?: number
  reps?: number
}
