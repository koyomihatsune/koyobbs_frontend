
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate} from 'react-router-dom';
import { API_LINK, HOSTNAME } from '../../Constants';
import { AuthContext } from '../../_contexts/AuthProvider';
import PostCardList from "../post/PostCardList";
import Failure from '../status/Failure';
import Loading from '../status/Loading';

import { Button} from '@fluentui/react-components';
import { Select, Option} from '@fluentui/react-components/unstable';
import { Row, Col } from 'react-simple-flex-grid';
import { ArrowPreviousRegular, ArrowNextRegular } from '@fluentui/react-icons';

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
  
  const {page, setPage} = useContext(AuthContext)
  const [status, setStatus] = useState("Loading");
  const [pageCount, setPageCount] = useState(1);
  const [pageArray, setPageArray] = useState([1]);

  const getAllPost = async () => {
    axios.get(HOSTNAME + API_LINK.GETPOSTPAGINATION+"/"+page).then(
      (response) => {
        if (response.data.status === "Success") {
          setPostListData(response.data.data.posts); 
          setStatus(response.data.status);
          setPageCount(response.data.data.pageCount);
          generatePageArray(response.data.data.pageCount);
        } else if (response.data.status === "Failed") {
          setStatus(response.data.error);
        }
      }
    )
  }

  const generatePageArray = (a) => {
    let c = [];
    for(let i = 1; i <= a; i++) c.push(i);
    setPageArray(c);
  }

  const handlePageClick = (e) => {
    setPage(e.target.selectedIndex+1)
  }

  useEffect(() => {
    getAllPost()
  }, [page, pageCount]);

  if (status === "Success") {
    return  (
      <>
        <PostCardList postList={postListData}/>
        <div style= {{justifyContent: "center", display: "flex"}}>
          <Row>
          <Button appearance="primary" icon={<ArrowPreviousRegular/>}  onClick={()=>{setPage(page-1)}} disabled={page==1} >
            Previous
          </Button> 
          <Select
            defaultValue={"Page " + page.toString()}
            value={"Page " + page.toString()}
            onChange={handlePageClick}
            style={{width:150, marginRight:5, marginLeft:5}}
          >
            {pageArray.map(page => 
              <option key={page}>{"Page " + page.toString()}</option>
            )}
          </Select>   
          <Button appearance="primary" icon={<ArrowNextRegular/>} iconPosition="after" onClick={()=>{setPage(page+1)}} disabled={page==pageCount}>
            Next
          </Button>
          </Row>
        </div>
             
      </>
      
    )
    } else if (status === "Loading") {
      return (<Loading/>)
    } else {
      return (<Failure error={status}/>)
    }
  }

export default AllPost;