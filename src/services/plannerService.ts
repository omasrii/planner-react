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

  getMesocycles(username: string) {
    return this.get(`mesocycles/${username}`)
  }
  postMesocycle(username: string, mesocycle: MesocycleRequest) {
    return this.post(`mesocycles/${username}`, { mesocycle })
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

  getSessionsForMicrocycle(microcycle_id: number) {
    return this.get(`microcycles/${microcycle_id}`)
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
