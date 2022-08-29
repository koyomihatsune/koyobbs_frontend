import { Text } from '@fluentui/react-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import PostCardList from "../post/PostCardList";


function Failure() {
  
  return (
      <>
        <br/>
        <br/>
            <Text style={{fontSize:16}}> 
                Failed To Load.
            </Text>
        <br/>
        <br/>
      </>
    );
  }

export default Failure;