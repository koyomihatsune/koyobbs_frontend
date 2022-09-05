import { Button } from '@fluentui/react-components';
import { ArrowLeftRegular, ArrowRightRegular } from '@fluentui/react-icons';
import React from 'react';
import { useNavigate} from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Post from "./post/Post"
import Failure from './status/Failure';
import Success from './status/Success';

function Test() {
  const navigate = useNavigate();
  return (
      <>
           <Success/>
                  <br/>
           <Button color="#c989e8" appearance="primary" icon={<ArrowRightRegular />} style={{marginBottom:10}}
           onClick={() => navigate("/")}>View Post</Button><br/>
           <Button color="#c989e8" icon={<ArrowLeftRegular />}
           onClick={() => navigate("/")}>Back to Board</Button>
      </>
    );
  }

export default Test;