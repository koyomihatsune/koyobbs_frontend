import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import {Image, Text, Button} from '@fluentui/react-components'
import { ArrowLeftRegular, ArrowDownloadRegular } from '@fluentui/react-icons';
import { Row, Col } from 'react-simple-flex-grid';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import axios from 'axios';
import { API_LINK, HOSTNAME } from '../../Constants';
import Loading from '../status/Loading';
import Failure from '../status/Failure';

function Post(props) {
  const navigate = useNavigate();
  const params = useParams();
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

  const [post, setPost] = useState({
      id: "0",
      title: "Hello",
      thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg",
      content: "This is Hello post by User 5",
      author: {
        id: "5",
        email: "anh_nv@flinters.vn",
        username: "koyomihatsune"
      },
      created_at: "2022-08-19T15:10:40.000+07:00",
      updated_at: "2022-08-19T15:10:48.000+07:00"
  });
  const [status, setStatus] = useState("Loading");
  
  const getPost = async () => {
    axios.get(HOSTNAME + API_LINK.GETPOSTBYID + "/" + params.postID).then(
      (response) => {
        if (response.data.status === "Success") {
          setPost(response.data.data); 
          setStatus(response.data.status);
        } else if (response.data.status === "Failed") {
          setStatus(response.data.error);
        }
      }
    )
  }

  useEffect(() => {
    getPost();
  }, []);

  function timeToNFormat(j) {
    return j.substring(0 ,10) + " at " + j.substring(11, 16);
  };  

  if (status == "Success") {
    return (   
      <div style={{textAlign:"left", marginTop:15}}>
          <div style={{backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }}>
            <div>
            <Image src={HOSTNAME+API_LINK.ASSET_IMAGES+post.thumbnail} style={{width:"100%", borderRadius: "8px", aspectRatio:"16 / 6", position: 'relative',
                zIndex: '100'}} fit="cover"></Image>
            </div>
            <div align="start" style= {{boxSizing:"border-box", padding:30}}>
                <Row>
                    <Col style={{textAlign:"left", width:"50%"}}>
                        <Button color="#c989e8" icon={<ArrowLeftRegular />} onClick={() => navigate("/")} style = {{marginRight:10}}>
                            Back to Board
                        </Button>
                        <Button color="#c989e8" icon={<ArrowDownloadRegular />} onClick={() => navigate("/")} style = {{position: 'relative',zIndex: '2'}}>
                            Download as CSV
                        </Button>
                    </Col>
                    <Col style={{textAlign:"right", width:"50%"}}>
                        <Image src="https://pjsekai.sega.jp/assets/images/special/download/sns-icon/unit03/icon_05_unit03_miku.png" style={{width: 40, height:40, float:"right", objectFit:"cover", borderRadius:"50%", marginLeft:15}}></Image>
                        <Text> Author</Text>
                        <div>
                          <ResponsiveEllipsis
                          text={post.author.username}
                          maxLine='1'
                          ellipsis='...'
                          trimRight
                          basedOn='letters' style={{fontSize: 15, fontWeight: "bold"}}
                        />
                        </div>
                    </Col>
                </Row>
                <br/><br/>
                <Text style={{fontSize:30, lineHeight: 1.2, fontWeight:"bold"}}>
                    {post.title}
                </Text>
                <br/><br/>
                <Text style={{fontSize:20, lineHeight: 1.3, "white-space": "pre-line"}} >
                    {post.content}
                </Text>
                <br/>
                <br/>
                <Text style= {{color:"gray"}}>Created:  {timeToNFormat(post.created_at)} </Text> <br/>
                <Text style= {{color:"gray"}}>Updated:  {timeToNFormat(post.updated_at)}</Text>
            </div>
          </div>
      </div>
    );
  } 
  else if (status === "Loading") {
    return (<Loading/>)
  } else {
    return <Failure error={status}/>
  }
  } 
  

export default Post;