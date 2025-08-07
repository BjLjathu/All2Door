import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from '../../components/comman/form'
import { loginFormControls, registerFormControls } from "@/config";

const initialState = {
    email:'',
    password:''
}

function AuthLogin() {

       const [formData,setFormData] = useState(initialState)

       function onSubmit() {
            return <h1>MNakkuy</h1>
       }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3x1 font-bold tracking-tight text-foreground ">
          Sing in to your account
        </h1>
        <p>
          Don't you have an account{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
        <div>
            <CommonForm 
            formControls={loginFormControls}
            buttonText={'Sing In'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
