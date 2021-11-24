import styled from '@emotion/styled'
import { PhaseInterface } from '../../../interface'

export type PhaseProps = {
  phase: PhaseInterface
  children: any
}

const Phase = ({ phase, children }: PhaseProps) => (
  <PhaseContainer>
    {/* <Typography variant="h5" style={{ textAlign: 'center' }}>{phase.name}</Typography> */}
    {children}
  </PhaseContainer>
)

export default Phase

const PhaseContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  justifyContent: 'space-evenly',
})
