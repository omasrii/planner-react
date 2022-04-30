/* internal components */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { MesocycleInterface } from '../../../interface'
import { plannerService } from '../../../services/plannerService'
import { RootState } from '../../../store'
import { ApplicationState } from '../../../store/types'
import { MicrocycleProps } from '../../microcycle'
import Microcycle from '../../microcycle/lib/Microcycle'
import MesocycleAccordion from './MesocycleAccordion'

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

    const resp = await plannerService.postMicrocycle(user.name, {
      mesocycle_id,
      phase_id,
      deload,
    })
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
