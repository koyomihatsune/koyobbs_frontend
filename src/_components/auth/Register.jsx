import React, { useState } from 'react';
import {Link,  useNavigate} from 'react-router-dom';
import {Text, Input, Button} from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { API_LINK, HOSTNAME } from '../../Constants';

function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [form, setForm] = useState({email: '', username: '', password: ''})
    const [status, setStatus] = useState("Input");
    const [message, setMessage] = useState("Input");

    const emailRegex = new RegExp(".+@.+\\..+");
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    const [emailValid, setEmailValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const onRegisterPressed = async (data) => {
      if(form.email=='') {setEmailValid(false); setUsernameValid(false); setPasswordValid(false);}
      else {
        setStatus("Loading");
        console.log(form);
        axios.post(HOSTNAME + API_LINK.REGISTER, form,{ headers: {
          "Content-Type": "application/json"
        }})
          .then((res) => {
            if (res.data.status === "Success") {
              alert(res.data.message)
              navigate("/")
            } else if (res.data.status === "Failed") {
              alert(res.data.error)
            } else alert("System error.")
          })
      }
    }

    const onEmailChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
      setEmailValid(emailRegex.test(e.target.value))
    }

    const onUsernameChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
      if (e.target.value.length<=50 && e.target.value.length>0) {
        setUsernameValid(true)
      } else setUsernameValid(false)
    }

    const onPasswordChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
      setPasswordValid(e.target.value.match(passwordRegex)!=null)
    }
  
    return (
        <>
          <div style= {{justifyContent: "center", display: "flex"}}>
            <div style={{backgroundColor: "white", color: "white", width: "300px", maxheight: "550px", textAlign: "center", borderRadius: "5px", boxShadow: "1px 1px 11px #ccc", padding:"40px 40px 40px 40px"}}>
                <Text style={{color:"black", fontWeight: "bold", fontSize: "20px"}}>Register</Text><br/><br/>
                <Text style={{color:"black", fontSize: "13px"}}>Register an account to create posts on Boring Bulletin Site.</Text><br/>
                <br/>
                <form onSubmit={handleSubmit(onRegisterPressed)}>
                    <Input {...register("email")} appearance="underline" onChange={onEmailChange} style={{width: "300px"}} placeholder="Email"/><br/>
                    {!emailValid ? <Text style={{color:"red"}} > Email should have form aaa@bbb.xyz</Text> : <br/>}

                    <Input {...register("username")} appearance="underline" onChange={onUsernameChange} style={{width: "300px"}} placeholder="Username"/><br/>
                    {!usernameValid ? <Text style={{color:"red"}} > {"Username length must be within range (1~50 characters)"}</Text> : <br/>}

                    <Input {...register("password")} appearance="underline" onChange={onPasswordChange} style={{width: "300px"}} type="password" placeholder="Password"/>
                    <br/>
                    {!passwordValid ? <Text style={{color:"red"}} > {"Password length must be within range (8~20 characters) with letters, numbers and special symbols."}</Text>  : <br/>}<br/>
                    <Button type ="submit" appearance="primary" color="#c989e8" disabled={!(emailValid && usernameValid && passwordValid ) }>Register</Button>
                </form>
                <br/><br/>
                <Text style={{color:"black", fontSize: "13px"}}>Already have an account? <Link to="/login">Login!</Link></Text><br/>
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

export default Register;