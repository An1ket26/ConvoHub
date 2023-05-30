import React from "react";
import CustomButton from "../../shared/components/CustomPrimaryButton";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RedirectInfo from "../../shared/components/RedirectInfo";

const RegisterPageFooter = (props) => {
    const history=useNavigate();
    const handlePushToLoginPage = () => {
        history("/login");
      };
  const getFormNotValidMessage = () => {
    return "Enter Correct E-mail address \n password should contains between 6 and 12 characters \n username should contains between 3 and 15 characters";
  };

  const getFormValidMessage = () => {
    return "Press to Register";
  };

  return (
    <>
      <Tooltip
        title={
          !props.isFormValid ? getFormNotValidMessage() : getFormValidMessage()
        }
      >
        <div>
            <CustomButton
          label='Sign Up'
          additionStyles={{ marginTop: "30px" }}
          disabled={!props.isFormValid}
          onClick={props.handleRegister}
        />
        </div>
        
      </Tooltip>
      <RedirectInfo 
      text="Already have an account? "
      redirectText="Log In"
      additionalStyles={{marginTop: "15px"}}
      redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
