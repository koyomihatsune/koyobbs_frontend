import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Text, Input, Button} from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSignInPressed = data => console.log(data);

  return (
      <>
        <div style= {{justifyContent: "center", display: "flex"}}>
          <div style={{backgroundColor: "white", color: "white", width: "300px", height: "300px", textAlign: "center", borderRadius: "5px", boxShadow: "1px 1px 11px #ccc", padding:"40px 40px 40px 40px" }}>
              <Text style={{color:"black", fontWeight: "bold", fontSize: "20px"}}>Login</Text><br/><br/>
              <Text style={{color:"black", fontSize: "13px"}}>Login to Boring Bulletin Site with your email and password.</Text><br/>
              <br/>
              <form onSubmit={handleSubmit(onSignInPressed)}>
                  <Input {...register("email")} appearance="underline" style={{width: "300px"}} placeholder="Email"/><br/>
                  <br/>
                  <Input {...register("password")} appearance="underline" style={{width: "300px"}} type="password" placeholder="Password"/>
                  <br/><br/>
                  {errors.exampleRequired && <span>This field is required</span>}
                  <Button type ="submit" appearance="primary" color="#c989e8" onPressed={{onSignInPressed}}>Login</Button>
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