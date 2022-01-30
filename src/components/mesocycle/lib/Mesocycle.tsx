/* internal components */
import Microcycle from '../../microcycle/lib/Microcycle'
import MesocycleAccordion from './MesocycleAccordion'
import { MicrocycleProps } from '../../microcycle'
import { useState } from 'react'
import { MesocycleInterface } from '../../../interface'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { ApplicationState } from '../../../store/types'

const Mesocycle = (props: MesocycleInterface) => {
  const { microcycles, id: mesocycle_id, phase_id } = props
  const { user } = useSelector<RootState, ApplicationState>((state) => state.application)
  const [expanded, setExpanded] = useState(false)
  const [currentMicrocycles, setMicrocycles] = useState(microcycles)
  const [loading, setLoading] = useState(false)

  const handleCollapse = () => {
    setExpanded(!expanded)
  }

  const handleAddMicrocycle = async (deload: boolean = false) => {
    setLoading(true)

    const body = {
      microcycle: {
        mesocycle_id,
        phase_id,
        deload,
      },
    }

    const resp = await axios.post(
      `${process.env.REACT_APP_PLANNER_API_URL}/microcycles/${user.name}`,
      body
    )
    console.log(resp.data)
    setMicrocycles([resp.data, ...microcycles])

    setLoading(false)
  }

  return (
    <MesocycleAccordion
      handleCollapse={handleCollapse}
      expanded={expanded}
      mesocycleProps={{ ...props }}
      handleAddMicrocycle={handleAddMicrocycle}
    >
      {expanded && !loading
        ? currentMicrocycles?.map((cycle: MicrocycleProps, index) => {
            return <Microcycle key={index} {...cycle} handleAddMicrocycle={handleAddMicrocycle} />
          })
        : undefined}
    </MesocycleAccordion>
  )
}

export default Mesocycle
