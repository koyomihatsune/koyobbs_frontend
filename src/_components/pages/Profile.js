import React from 'react';
import { useNavigate} from 'react-router-dom';
import PostCardList from "../post/PostCardList";


function Profile() {
  const navigate = useNavigate();
  return (
      <>
           <span>
            Profile
           </span>
      </>
    );
  }

export default Profile;