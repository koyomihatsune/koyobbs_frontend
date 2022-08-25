import React from 'react';
import { useNavigate} from 'react-router-dom';
import PostCardList from "../post/PostCardList";


function AllPost() {
  const navigate = useNavigate();
  return (
      <>
            <PostCardList/>
      </>
    );
  }

export default AllPost;