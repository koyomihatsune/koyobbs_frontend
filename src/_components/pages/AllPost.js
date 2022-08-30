import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import PostCardList from "../post/PostCardList";
import Failure from '../status/Failure';
import Loading from '../status/Loading';


function AllPost() {
  const navigate = useNavigate();
  const [postListData, setPostListData] = useState([
    {
      id: "0",
      title: "Sample Post",
      thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg",
      content: "This is Sample post",
      author: {
        id: "5",
        email: "anh_nv@flinters.vn",
        username: "koyomihatsune"
      },
      created_at: "2022-08-19T15:10:40.000+07:00",
      updated_at: "2022-08-19T15:10:48.000+07:00"
    }
  ]);
  
  const [status, setStatus] = useState("Loading");

  const getAllPost = async () => {
    axios.get(HOSTNAME + API_LINK.ALLPOSTS).then(
      (response) => {
        if (response.data.status === "Success") {
          setPostListData(response.data.data); 
          setStatus(response.data.status);
        } else if (response.data.status === "Failed") {
          setStatus(response.data.error);
        }
      }
    )
  }

  useEffect(() => {
    getAllPost()
  }, []);

  if (status === "Success") {
    return  (<PostCardList postList={postListData}/>)
    } else if (status === "Loading") {
      return (<Loading/>)
    } else {
      return (<Failure error={status}/>)
    }
  }

export default AllPost;