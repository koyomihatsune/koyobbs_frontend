import { Text } from '@fluentui/react-components';
import { CheckmarkCircleRegular, ErrorCircleFilled } from '@fluentui/react-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import PostCardList from "../post/PostCardList";


function Success(props) {
  
  return (
      <div width="100" style= {{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <br/>
            <CheckmarkCircleRegular style={{fontSize: 60, color:"green", marginBottom:30, marginTop:30}}></CheckmarkCircleRegular>
        <br/>
            <Text style={{fontSize:20, fontWeight:"bold"}}> 
                {(props.message != null) ? props.message : "Successfully" }
            </Text>
        <br/>
      </div>
    );
  }

export default Success;