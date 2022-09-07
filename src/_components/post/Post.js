import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import {Image, Text, Button} from '@fluentui/react-components'
import { ArrowLeftRegular, ArrowDownloadRegular, DeleteRegular, EditRegular } from '@fluentui/react-icons';
import { Row, Col } from 'react-simple-flex-grid';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import axios from 'axios';
import { API_LINK, HOSTNAME } from '../../Constants';
import Loading from '../status/Loading';
import Failure from '../status/Failure';
import { AuthContext } from '../../_contexts/AuthProvider';
import CustomDialog from './CustomDialog';



function Post(props) {
  const navigate = useNavigate();
  const params = useParams();
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
  const {auth, isLogin} = useContext(AuthContext)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
  const [message, setMessage] = useState("Loading");
  
  const getPost = async () => {
    axios.get(HOSTNAME + API_LINK.GETPOSTBYID + "/" + params.postID).then(
      (response) => {
        if (response.data.status === "Success") {
          setPost(response.data.data); 
          setStatus(response.data.status);
        } else if (response.data.status === "Failed") {
          setStatus(response.data.status);
          setMessage(response.data.error);
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

  const onDeletePost = async () => {
    setStatus("Loading");
    axios.delete(HOSTNAME + API_LINK.GETPOSTBYID + "/" + params.postID+"/delete", {
      headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer "+ auth.token
      }}).then(
      (response) => {
        if (response.data.status === "Success") {
          setStatus("Deleted");
          setMessage(response.data.message)
        } else if (response.data.status === "Failed") {
          setStatus(response.data.status);
          setMessage(response.data.error);
          console.log(response.data.error);
        }
      }
    )
  }

  const onRequestDownload = async () => {
    axios.get(HOSTNAME + API_LINK.GETPOSTBYID + "/" + params.postID+"/export").then(
      (response) => {
        console.log(response)
        if (response.data.status === "Success") {
          const url = window.URL
          .createObjectURL(new Blob([response.data.message]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', "bbs_00000"+post.id+".csv")
                document.body.appendChild(link);
                link.click();
        } else if (response.data.status === "Failed") {
          alert(response.data.error)
        }
      }
    )
  }


  if (status == "Success") {
    return (   
      <div>
          <div style={boxStyle}>
            <div>
            <Image src={HOSTNAME+API_LINK.ASSET_IMAGES+post.thumbnail} style={{width:"100%", borderRadius: "8px", aspectRatio:"16 / 6", position: 'relative',
                zIndex: '100'}} fit="cover"></Image>
            </div>
            <div align="start" style= {{boxSizing:"border-box", padding:30}}>
                <Row>
                    <Col style={{textAlign:"left", width:"60%"}}>
                        <Button icon={<ArrowLeftRegular />} onClick={() => navigate("/")} style = {toolbarStyle}>
                            Back to Board
                        </Button>
                        { isLogin && <>
                          {post.author.id===auth.user.id &&
                          <>
                              <Button icon={<EditRegular />} onClick={() => {navigate("/post/"+post.id+"/edit", {post:post})}} style = {{marginRight:10, marginBottom:10, color:"#5c2e91"}}>
                                  Edit
                              </Button>
                              <Button  icon={<DeleteRegular/>} onClick={() => setOpenDeleteDialog(true)} style = {{marginRight:10, marginBottom:10, color:"#bc2f32"}}>
                                  Delete
                              </Button>
                          </>
                        }
                        </>
                        }
                        <Button icon={<ArrowDownloadRegular />} onClick={() => onRequestDownload()} style = {{marginRight:10, marginBottom:10, color:"#0078d4"}}>
                            Download as CSV
                        </Button>
                    </Col>
                    <Col style={{textAlign:"right", width:"40%"}}>
                        <Image src="https://pjsekai.sega.jp/assets/images/special/download/sns-icon/unit03/icon_05_unit03_miku.png" style={thumbnailStyle}></Image>
                        <Text>Author</Text><br/>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{post.author.username}</Text>
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
          <CustomDialog 
            open={openDeleteDialog} 
            handleClose={()=> setOpenDeleteDialog(false)} 
            onSubmit={onDeletePost}
            dialogTitle={"Delete post"}
            dialogBody={"Are you sure you want to delete this post?\nThere is no way to recover it."}
            dialogSubmit={"Delete"}
            alert={true}
          ></CustomDialog>
      </div>
    );
  } 
  else if (status === "Loading") {
    return (<Loading/>)
  } else if (status === "Failed" || status === "Deleted") {
    return (<>
      <Failure message={message}/>
      <Button color="#c989e8" icon={<ArrowLeftRegular />}
      onClick={() => navigate("/")}>Back to Board</Button>
    </>)
  } 
} 


  
  const toolbarStyle = {
    marginRight:10, 
    marginBottom:10
  }
  
  const thumbnailStyle = {
    width: 40, 
    height:40, 
    float:"right", 
    objectFit:"cover", 
    borderRadius:"50%", 
    marginLeft:15
  }

  const boxStyle={textAlign:"left", marginTop:15, backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }

export default Post;