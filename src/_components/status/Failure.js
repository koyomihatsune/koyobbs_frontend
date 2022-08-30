import { Text } from '@fluentui/react-components';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import PostCardList from "../post/PostCardList";


function Failure(props) {
  
  return (
      <>
        <br/>
        <br/>
            <ErrorCircleFilled style={{fontSize: 60}}></ErrorCircleFilled>
        <br/>
        <br/>
            <Text style={{fontSize:16}}> 
                {(props.error != null) ? props.error : "Failed to load." }
            </Text>
        <br/>
        <br/>
      </>
    );
  }

export default Failure;