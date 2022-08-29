import { Text } from '@fluentui/react-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import PostCardList from "../post/PostCardList";
import Loading from '../status/Loading';


function AllPost() {
  const navigate = useNavigate();
  const [postListData, setPostListData] = useState([
    {
      id: "0",
      title: "Sample Post",
      thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg",
      content: "This is Sample post",
      authorid: "5",
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
        }
        setStatus(response.data.status);
      }
    )
  }

  useEffect(() => {
    getAllPost()
  }, []);

  return (
      <>
              {(status === "Loading") ? <Loading/> : 
              <div>
                <PostCardList postList={postListData}/>
              </div>}
      </>
    );
  }

export default AllPost;