import React from "react";
import CustomButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const history = useNavigate();
  const handlePushToRegisterPage = () => {
    history("/register");
  };

  const getFormNotValidMessage=()=>{
        return "Enter Correct E-mail address and password should contains between 6 and 12 characters"
  }

  const getFormValidMessage=()=>{
        return "Press to Log In"
}


  return (
    <>
      <Tooltip
      title={!isFormValid?getFormNotValidMessage():getFormValidMessage()}
      >
        <div>
          <CustomButton
            label='Log In'
            additionStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>

      <RedirectInfo
        text='Need an acount? '
        redirectText='Create an account'
        additionalStyles={{ marginTop: "15px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
