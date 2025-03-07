import React from 'react';
import { useState } from 'react';
import { FirstForm } from './FirstForm';
import { SecondForm } from './SecondForm';
export const MainPage = () => {
    const [flag, setFlag] = useState(true);
  return (
    <div>
        {  flag ? <FirstForm setFlagValue={setFlag}/> : <SecondForm /> }
        

    </div>
  )
}
