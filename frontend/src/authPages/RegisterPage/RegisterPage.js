import React,{useState,useEffect} from 'react'
import AuthBox from '../../shared/components/AuthBox'
import RegisterPageHeader from './RegisterPageHeader'
import RegisterPageInput from './RegisterPageInputs'
import RegisterPageFooter from './RegisterPageFooter'
import { validateRegisterForm } from '../../shared/utils/validators'
import { useNavigate } from 'react-router-dom'
import { getActions } from '../../store/actions/authActions'
import { connect } from 'react-redux'

const RegisterPage = ({register}) => {

  const history=useNavigate();
  const [username,setUsername]=useState('');
  const [mail,setMail]=useState('');
  const [password,setPassword]=useState('');

  const [isFormValid,setIsFormValid]=useState(false);

  useEffect(()=>{
    setIsFormValid(validateRegisterForm({username,mail,password}))
  },[username,mail,password,setIsFormValid])

  const handleRegister=()=>{
    const userDetails={
      username,mail,password
    }
    register(userDetails,history);
  }

  return (
    <AuthBox>
      <RegisterPageHeader/>
      <RegisterPageInput 
      username={username}
      setUsername={setUsername}
      mail={mail}
      setMail={setMail}
      password={password}
      setPassword={setPassword}
      />
      <RegisterPageFooter
      isFormValid={isFormValid}
      handleRegister={handleRegister}
      />
    </AuthBox>
  )
}
const mapActionsToProps=(dispatch)=>{
  return{
    ...getActions(dispatch),
  };
};

export default connect(null,mapActionsToProps)(RegisterPage);