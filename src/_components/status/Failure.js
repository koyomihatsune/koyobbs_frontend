import { Text } from '@fluentui/react-components';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import PostCardList from "../post/PostCardList";


function Failure(props) {
  
  return (
      <div width="100" style= {{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <br/>
            <ErrorCircleFilled style={{fontSize: 60, color:"red", marginBottom:30, marginTop:30}}></ErrorCircleFilled>
        <br/>
            <Text style={{fontSize:20, fontWeight:"bold"}}> 
                {(props.message != null) ? props.message : "Failed to load" }
            </Text>
        <br/>
      </div>
    );
  }

export default Failure;