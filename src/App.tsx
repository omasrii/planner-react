import styled from '@emotion/styled';
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './components/header';
import Mesocycle from './components/mesocycle';
import { MesocycleInterface } from './interface';
// import { mesocycles } from './data';

const App = () => {
  const [mesocycles, setMesocycles] = useState([])

  const fetchMesos = async () => {
    let resp = await axios.get('http://10.0.0.191:7000/mesocycles/omar')
    console.log(resp)
    setMesocycles(resp.data)
  }

  useEffect(() => {
    // console.log(mesocycles)
    fetchMesos()
  }, [])

  return (
    <>
      <Header />
      <MesocycleContainer>
        <AddMesoContainer>
          <Button color="primary" variant="outlined" size="large">Add Mesocycle</Button>
        </AddMesoContainer>
        {
          mesocycles
            ?.sort((a: MesocycleInterface, b: MesocycleInterface) => new Date(a.date) < new Date(b.date) ? 1 : -1)
            .map(mesocycle => {
              const { date } = mesocycle
              return (
                <Mesocycle key={date} {...mesocycle} />
              )
            })
        }
      </MesocycleContainer>
    </>
  )
}

export default App;

const MesocycleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // rowGap: '5px'
})


const AddMesoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5px',
  marginBottom: '15px'
})
