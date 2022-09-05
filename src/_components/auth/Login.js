import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Text, Input, Button} from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useForm } from "react-hook-form";
import { API_LINK, HOSTNAME } from '../../Constants';
import axios from 'axios';
import { AuthContext } from '../../_contexts/AuthProvider';

function Login() {
  const navigate = useNavigate();
  const {setAuth, setIsLogin, isLogin, auth} = useContext(AuthContext)
  const [login, setLogin] = useState({email: '', password: ''})
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
      axios.post(HOSTNAME + API_LINK.LOGIN, login, {
          headers: {
              "Content-Type": "application/json"
          }
          })
          .then((res) => {
            console.log(res.data.data.token)
            if (res.data.status === "Success") {
              setAuth(res.data.data)
              setIsLogin(true)
              localStorage.setItem("authUser", JSON.stringify(res.data.data))
              console.log("Set item")
              alert("Login successfully.")
              navigate("/")
            } else if (res.data.status === "Failed") {
              alert(res.data.error)
            } else alert("System error.")
          })
  }

  return (
      <>
        <div style= {{justifyContent: "center", display: "flex"}}>
          <div style={{backgroundColor: "white", color: "white", width: "300px", height: "300px", textAlign: "center", borderRadius: "5px", boxShadow: "1px 1px 11px #ccc", padding:"40px 40px 40px 40px" }}>
              <Text style={{color:"black", fontWeight: "bold", fontSize: "20px"}}>Login</Text><br/><br/>
              <Text style={{color:"black", fontSize: "13px"}}>Login to Boring Bulletin Site with your email and password.</Text><br/>
              <br/>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <Input {...register("email")} appearance="underline" style={{width: "300px"} } placeholder="Email" onChange={onChange}/><br/>
                  <br/>
                  <Input {...register("password")} appearance="underline" style={{width: "300px"}} type="password" placeholder="Password" onChange={onChange}/>
                  <br/><br/>
                  {errors.exampleRequired && <span>This field is required</span>}
                  <Button type ="submit" appearance="primary" color="#c989e8" onPressed={{onSubmit}}>Login</Button>
              </form>
              <br/><br/>
              <Text style={{color:"black", fontSize: "13px"}}>No account? <Link to="/register">Create one!</Link></Text><br/>
              <br/>
          </div>
        </div> 
        <nav>
        <br/>
        <Button color="#c989e8" icon={<ArrowLeftRegular />}
        onClick={() => navigate("/")}>Back to Board</Button>
        </nav>
        <br/>
      </>
    );
  }

export default Login;