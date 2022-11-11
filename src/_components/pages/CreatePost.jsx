import React from 'react';
import { useNavigate} from 'react-router-dom';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import Failure from '../status/Failure';
import PostForm from '../post/PostForm';

function CreatePost(props) {
  const navigate = useNavigate();
  
  return (
      <>
          <PostForm status="Create"></PostForm>
      </>
    );
  }

export default CreatePost;