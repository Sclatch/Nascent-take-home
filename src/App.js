import { useState } from 'react';
import Form from './Form';
import Landing from './Landing';
import Result from './Result';

function App() {

  const [number, setNumber] = useState(0);
  const [type, setType] = useState("");

  return (
    <div>
      <Landing/>
      <Form getNumber={(e)=>{setNumber(e)}} getType={(e)=>{setType(e)}}></Form>
      <Result number={number} type={type}></Result>
    </div>
  );
}

export default App;
