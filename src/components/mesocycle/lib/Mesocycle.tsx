/* internal components */
import Microcycle from '../../microcycle/lib/Microcycle';
import MesocycleAccordion from './MesocycleAccordion'
import { MicrocycleProps } from '../../microcycle';
import { useEffect, useState } from 'react';
import { MesocycleInterface } from '../../../interface';
import axios from 'axios';

const Mesocycle = (props: MesocycleInterface) => {
  const { microcycles, id: mesocycle_id, phase_id } = props
  const hiddenValues = microcycles.map((c: any) => !!c.hidden)
  const [hideCycle, setHideCycle] = useState<any>(hiddenValues)
  const [expanded, setExpanded] = useState(false);
  const [currentMicrocycles, setMicrocycles] = useState(microcycles)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('meso state change')
  }, [hideCycle])

  const handleCollapse = () => {
    setExpanded(!expanded)
  }


  const handleAddMicrocycle = async (deload: boolean = false) => {
    setLoading(true)

    const body = {
      microcycle: {
        mesocycle_id,
        phase_id,
        deload
      }
    }

    const resp = await axios.post('http://10.0.0.191:7000/microcycles/omar', body)
    console.log(resp.data)
    setMicrocycles(microcycles => {
      const copy = microcycles
      copy.push(resp.data)
      return copy
    })

    setLoading(false)
  }

  return (
    <MesocycleAccordion
      handleCollapse={handleCollapse}
      expanded={expanded}
      mesocycleProps={{ ...props }}
      handleAddMicrocycle={handleAddMicrocycle}>
      {
        expanded && !loading ?
          currentMicrocycles
            .sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)
            .map((cycle: MicrocycleProps, index) => {
              return <Microcycle key={index} {...cycle} handleAddMicrocycle={handleAddMicrocycle} />
            })
          : undefined
      }
    </MesocycleAccordion>
  )
}

export default Mesocycle;
