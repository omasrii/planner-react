/**
 *
 * Schema:
 *
 */
interface RowInterface {
  id?: number
}

export interface SetInterface extends RowInterface {
  load: number
  reps: number
  session_id?: number
}

/**
 * an individual session within a microcycle/week
 */
export interface SessionInterface extends RowInterface {
  date: string
  name: string
  sets: SetInterface[]

  phase_id: number
  mesocycle_id: number
  microcycle_id: number
}

/**
 * a week of sessions within a Mesocycle
 */
export interface MicrocycleInterface extends RowInterface {
  date: string
  deload?: boolean
  sessions?: SessionInterface[]

  phase_id?: number
  mesocycle_id?: number
}

/**
 * a several weeks block of training within a Phase
 */
export interface MesocycleInterface extends RowInterface {
  date: string
  microcycles: MicrocycleInterface[]

  phase_id: number
}

/**
 * a 3-4 month training block within a year that focuses
 * on a specific goal (i.e. strength, hypertrophy).
 * broken down into mesocycles
 */
export interface PhaseInterface extends RowInterface {
  date: string
  name: string
  mesocycles: MesocycleInterface[]
}

export interface UserInterface extends RowInterface {
  name: string
  weight: number
}
