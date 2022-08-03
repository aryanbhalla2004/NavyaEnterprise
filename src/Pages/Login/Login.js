import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "./Login.css";

export const Login = (props) => {
  //const [loginMessage, setLoginMessage] = useOutletContext();
  const [message, setMessage] = useState('');
  const history = useNavigate();
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);

  const [fieldError, setFieldError] = useState({
    email: false,
    password: false,
    message: "",
  });

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));

    setFieldError(prevInput => ({
      ...prevInput, [e.target.name]: false
    }));

    setFieldError(prevInput => ({
      ...prevInput, message: ""
    }));
  }

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();    
    if(userInput.email != "" && userInput.password != "") {
      if(userInput.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        try {
          let userDetails = await props.Login(userInput.email, userInput.password);
          console.log("found user");
          history("/dashboard");

        } catch (e) {
          setLoading(false);
          setMessage(e.message);
        }
      } else {
        setLoading(false);

        setFieldError(prevInput => ({
          ...prevInput, email: true
        }));

        setFieldError(prevInput => ({
          ...prevInput, message: "Your email appears to be in the wrong format."
        }));
      }
    } else {
      setLoading(false);

      if(userInput.email == "") {
        setFieldError(prevInput => ({
          ...prevInput, email: true
        }));
      } 

      if(userInput.password == "") {
        setFieldError(prevInput => ({
          ...prevInput, password: true
        }));
      }

      setFieldError(prevInput => ({
        ...prevInput, message: "Invalid Email/Password"
      }));
    }
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='center-container-login'>
        <h1>Bill of Sales</h1>
        <div className='login-form-container'>
          <h1>NAVYA ENTERPRISES</h1>
          <p>Please enter you login cridential below.</p>
          <form onSubmit={onSubmit} className="mt-3">
          {message && <div className="alert alert-danger mt-0" role="alert">{message}</div>}
          {fieldError.message && <div className="alert alert-danger mt-0" role="alert">{fieldError.message}</div>}
            <div class="form-outline mb-2">
              <label class="form-label" for="form2Example1">Email address</label>
              <input type="email" className={fieldError.email ? 'form-control is-invalid' : 'form-control'} id="emailAddress" required="" name="email" value={userInput.email} onChange={updateUserInput} placeholder="Enter Your Email"/>
              {fieldError.email && <div id="validationServer03Feedback" className="invalid-feedback mt-0 mb-0">Please provide a valid email.</div>}
            </div>
            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example2">Password</label>
              <input type="password" className={fieldError.password ? 'form-control is-invalid' : 'form-control'} id="password" required="" name="password" value={userInput.password} onChange={updateUserInput} placeholder="Enter Password"/>
              {fieldError.password && <div id="validationServer03Feedback" className="invalid-feedback mt-0 mb-0">Please provide a valid password.</div>}
            </div>
            <button className="btn btn-primary full-width height-10px" type="submit" disabled={loading ? true : false}>
            { 
              loading ? 
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div> : "Login"
            }
          </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Login