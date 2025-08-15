import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/comman/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      }else{
        toast.success(data?.payload?.message)
      }
    });
  }

  console.log(formData);

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
            buttonText={"Sing Up"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
