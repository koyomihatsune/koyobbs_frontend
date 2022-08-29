import React from 'react';
import { useNavigate, Prompt} from 'react-router-dom';
import {Image, Text, Button} from '@fluentui/react-components'
import { SignOutRegular } from '@fluentui/react-icons';
import { Row, Col } from 'react-simple-flex-grid';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

function Profile(props) {
  const navigate = useNavigate();

  const exampleUser = {
    id: 5,
    username: "anh_nv",
    email: "anh_nv@flinters.vn"
  }

  return (
    
      <div style={{textAlign:"left", marginTop:15}}>
          <div style={{backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }}>
            <div align="start" style= {{boxSizing:"border-box", padding:30}}>
                
                <Text style={{fontSize:20, lineHeight: 1.3}}>
                    Username
                </Text><br/>
                <Text style={{fontSize:28, lineHeight: 1.2, fontWeight:"bold"}}>
                  {exampleUser.username}
                </Text>
                <br/><br/>
                <Text style={{fontSize:20, lineHeight: 1.3}}>
                    Email
                </Text><br/>
                <Text style={{fontSize:28, lineHeight: 1.2, fontWeight:"bold"}}>
                    {exampleUser.email}
                </Text>
                <br/><br/>
                <Col style={{textAlign:"left", width:"50%"}}>
                        <Button color="#c989e8" icon={<SignOutRegular />} onClick={() => navigate("/")} style = {{marginRight:10}}>
                            Logout
                        </Button>
                    </Col>
            </div>
          </div>
      </div>
    );
  }

export default Profile;