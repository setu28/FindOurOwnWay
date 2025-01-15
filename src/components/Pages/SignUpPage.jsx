import React from 'react';
import { useState } from 'react';
import VerifyEmail from '../core/Auth/VerifyEmail';

//Logic will be First getting the email verified.
//Get the password created
//Move the logic to Signup page for student or Mentor
//Get the details of the address

const SignUpPage = () => {
  const [flagone, setFlagone] = useState(false);
  const [flagtwo, setFlagtwo] = useState(false); //Will be later setting to account type
   
    
   
    

  return (
    <div className="grid gap-y-24 place-items-center">
        <h1>You are in SignUp Page</h1>
        {flagone ? 
            (<div>
                <VerifyEmail />
            </div>)
            :
            (flagtwo ? 
                (<div>
                    <h2>Get the password created</h2>
                </div>)
                :
                (<div>
                    <h2>Get the details of the address</h2>
                </div>)
            )
        }



       
        
        <div>
        <h2>ENd of Sign Up Page</h2>

        </div>
        
    </div>
    
    
  )
}

export default SignUpPage