import React from 'react';
import { useNavigate, NavLink} from 'react-router-dom';
import {Image, Text, Button} from '@fluentui/react-components'
import { SignOutRegular } from '@fluentui/react-icons';
import { Row, Col } from 'react-simple-flex-grid';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { Logout } from '../auth/Logout';
import { useContext } from 'react';
import { AuthContext } from '../../_contexts/AuthProvider';

function Profile(props) {
  const {setAuth, setIsLogin, isLogin, auth} = useContext(AuthContext);
  return (
    <>
      <div style={{textAlign:"left", marginTop:15}}>
            <div style={{backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }}>
              <div align="start" style= {{boxSizing:"border-box", padding:30}}>
                  {isLogin ? <LoggedinProfile auth={auth}/> : <NotLoggedinProfile/>}
              </div>
            </div>
      </div>
    </>
      
    );
  
}

function LoggedinProfile(props){
  
  const navigate = useNavigate();
  return(
    <>
      <Text style={{fontSize:20, lineHeight: 1.3}}>
        Username
      </Text><br/>
      <Text style={{fontSize:28, lineHeight: 1.2, fontWeight:"bold"}}>
        {props.auth.user.username}
      </Text>
      <br/><br/>
      <Text style={{fontSize:20, lineHeight: 1.3}}>
        Email
      </Text><br/>
      <Text style={{fontSize:28, lineHeight: 1.2, fontWeight:"bold"}}>
          {props.auth.user.email}
      </Text>
      <br/><br/>
      <Col style={{textAlign:"left", width:"50%"}}>
              <Button color="#c989e8" icon={<SignOutRegular />} onClick={() => {Logout()}} style = {{marginRight:10}}>
                  Logout
              </Button>
      </Col>
    </>
  );
}

function NotLoggedinProfile(props){
  const ButtonStyle = {textDecoration: 'none', paddingRight:"5px"}
  return(
    <>
      <Text style={{fontSize:22, fontWeight: "bold"}}> 
              Log in or register to write post and view your own profile
      </Text>
    
      <div style={{paddingTop:30}}>
            <NavLink to="/login" style={ButtonStyle}>
            <Button appearance="primary" >
                Login
            </Button>
            </NavLink>
            <NavLink to="/register" style={ButtonStyle}>
            <Button >
                Register
            </Button>
            </NavLink>
      </div>

    </>
  );
}

export default Profile;