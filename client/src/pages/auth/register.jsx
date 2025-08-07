import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from '../../components/comman/form'
import { registerFormControls } from "@/config";

const initialState = {
    userName : '',
    email:'',
    password:''
}

function AuthRegister() {

       const [formData,setFormData] = useState(initialState)

       function onSubmit() {
            return <h1>MNakkuy</h1>
       }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3x1 font-bold tracking-tight text-foreground ">
          Create New Account
        </h1>
        <p>
          Already have an accout{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
        <div>
            <CommonForm 
            formControls={registerFormControls}
            buttonText={'Sing Up'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
