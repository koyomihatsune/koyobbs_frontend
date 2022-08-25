import React from 'react';
import { useNavigate} from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Post from "./post/Post"


function Test() {
  const navigate = useNavigate();
  return (
      <>
           <CreatePost/>
      </>
    );
  }

export default Test;