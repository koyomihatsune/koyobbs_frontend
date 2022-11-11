import React, { useEffect } from 'react';
import { Route, useNavigate, useParams, useRoutes} from 'react-router-dom';
import {Image, Text, Button, useId, Textarea, tokens, Input, Tooltip, makeStyles} from '@fluentui/react-components'
import { ArrowCounterclockwiseRegular, ArrowLeftRegular, ArrowRightRegular, DeleteRegular, SaveRegular, WindowSettings20Filled } from '@fluentui/react-icons';
import { Row, Col } from 'react-simple-flex-grid';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Loading from '../status/Loading';
import { useContext } from 'react';
import { AuthContext } from '../../_contexts/AuthProvider';
import { API_LINK, HOSTNAME } from '../../Constants';
import axios from 'axios';
import Success from '../status/Success';
import Failure from '../status/Failure';
// import { DialogActions, DialogBody, DialogSurface, DialogTitle, DialogTrigger, Dialog} from '@fluentui/react-components/unstable';
// import PostDialog from './CustomDialog';
// import CustomDialog from './CustomDialog';

function PostForm(props) {
  const navigate = useNavigate();
  const params = useParams();
  const {auth} = useContext(AuthContext)
  const [status, setStatus] = useState(props.status);
  const isEditing = (status==="Edit")

  const [message, setMessage] = useState("");
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

  const { register, handleSubmit, formState: { errors }, setValue} = useForm();
  const [form, setForm] = useState({
    thumbnail: null,
    title: "",
    content: ""
  })
  const [photo, setPhoto] = useState(null)
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (status == "Edit") {
      getPost();
    }
  },[]);

  const getPost = async () => {
    setStatus("Loading")
    axios.get(HOSTNAME + API_LINK.GETPOSTBYID + "/" + params.postID).then(
      (response) => {
        if (response.data.status === "Success") {
          setData(response.data.data)
          setStatus("Edit")            
        } else if (response.data.status === "Failed") {
          setStatus(response.data.error);
        }
      }
    )
}

  const setData = (data) => {
    setForm({
      title: data.title,
      content: data.content
    })
    setValue("title", data.title);
    setValue("content", data.content);
    setPhoto(HOSTNAME+API_LINK.ASSET_IMAGES+data.thumbnail)
  }

  const resetData = () => {
    setForm({
      thumbnail: null,
      title: "",
      content: ""
    })
    setValue("thumbnail", null);
    setValue("title", "");
    setValue("content", "");
    setPhoto(null)
  }

  const onSubmit = (e) => {
    setOpenSubmitDialog(false)
    setStatus("Loading")
    console.log(form)
    axios.post(isEditing? HOSTNAME+API_LINK.GETPOSTBYID+"/"+params.postID+"/update": HOSTNAME+API_LINK.CREATE_POST, form, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer "+ auth.token
        },
    }).then(res => {
        if (res.data.status === "Success") {
          setStatus("Success")
          setMessage(res.data.message)
        } else if (res.data.status === "Failed") {
          setStatus("Failed")
          setMessage(res.data.error)
        } else {
          alert("System error.")
        }
      }).catch(err => {
        setStatus("Failed")
        setMessage(err.response.statusText)
    })
  }

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    console.log(form)
  }

  const onPhotoChange = (e) => {
    if(e.target.files.length !== 0){
      setPhoto(URL.createObjectURL(e.target.files[0]))
      setForm({...form, thumbnail: e.target.files[0]})
      console.log(form)
    }
  }

  return (
      <>
        <div style={boxStyle}>
            <div align="start" style= {{boxSizing:"border-box", padding:30}}>
                {(status==="Create" || status==="Edit") && <>
                  <Text style={titleStyle}> {isEditing? "Edit Post":"New Post"} </Text>
                  <div style={{paddingTop:30, position: 'relative'}}>
                  <Tooltip
                    content={(photo)?"Click to change photo" :"Click to upload photo"}
                    relationship="label" showDelay="0" withArrow="true"
                  >
                    <Image src={(photo)?photo:"https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} style={thumbnailStyle} fit="cover" 
                                        onClick={() => {document.getElementById("thumbnailUploader").click();}}
                    />
                  </Tooltip>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("title")} id="titleField" placeholder="Type your title here..." value={form.title} style={{width:"100%", marginBottom:15}} onChange={onChange} size="large"/>
                    <Textarea {...register("content")} id="contentField" placeholder="Type your content here..." value={form.content} textarea={{className: styles.textarea}} style={{width:"100%"}} onChange={onChange} size="large"/>
                    <input {...register("thumbnail")} id="thumbnailUploader" type="file" style={{visibility:"hidden"}} onChange={onPhotoChange}></input>
                  </form>
                    <Row style={{marginTop:20}}>
                      <Col style={{textAlign:"left", width:"50%"}}>
                          <Button icon={<DeleteRegular />} onClick={() => setOpenCancelDialog(true)} style = {{marginRight:10, color:"red"}}>
                              Dismiss post
                          </Button>
                          {status=="Edit" && <Button icon={<ArrowCounterclockwiseRegular/>} onClick={() => getPost()} style = {{marginRight:10}}>Reset</Button>}
                          <Button appearance='primary' icon={<SaveRegular />} onClick={()=> setOpenSubmitDialog(true)} disabled={!photo || !form.title || !form.content}>
                                {isEditing?"Save post":"Submit"}
                          </Button> 
                      </Col>
                      <Col style={{textAlign:"right", width:"50%"}}>
                          <Image src="https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg" style={avatarStyle}></Image>
                          <div>
                            <Text>Author</Text>
                            <br/>
                            <Text style={{fontSize: 15, fontWeight: "bold"}} >{auth.user.username}</Text>
                          </div>
                      </Col>
                    </Row>
                </>
                }
                {(status==="Loading") &&<Loading/>}
                <div style= {{display:"flex", flexDirection:"column", alignItems:"center"}}>
                {(status==="Success") &&  <>
                    <Success message={message}/>
                    <br/>
                    <Button color="#c989e8" icon={<ArrowLeftRegular />}
                    onClick={() => navigate("/")}>Back to Board</Button>
                    </>
                }   
                {(status==="Failed") && <>
                    <Failure message={message}/>
                    <Button color="#c989e8" icon={<ArrowLeftRegular />}
                    onClick={() => setStatus(isEditing ? "Edit": "Create")}>Back to editing</Button><br/>
                    <Button style={{backgroundColor:"#bc2f32"}} appearance="primary" icon={<DeleteRegular />}
                    onClick={() => setOpenCancelDialog(true)}>Dismiss post</Button>
                </>}    
                </div>
                      
            </div>
          </div>
          {/* <CustomDialog 
            open={openCancelDialog} 
            handleClose={()=> setOpenCancelDialog(false)} 
            onSubmit={isEditing?()=> navigate(-1): ()=> navigate("/")}
            dialogTitle={"Dismiss post"}
            dialogBody={"Are you sure you want to dismiss this post? Your changes won't be saved."}
            dialogSubmit={"Dismiss"}
            alert={true}
          ></CustomDialog> */}
          {/* <CustomDialog 
            open={openSubmitDialog} 
            handleClose={()=> setOpenSubmitDialog(false)} 
            onSubmit={onSubmit}
            dialogTitle={isEditing?"Save post":"Submit post"}
            dialogBody={isEditing?"Are you sure you want to save this post?\nYour post will be updated and there is no way to recover your old post.":"Are you sure you want to submit this post?"}
            dialogSubmit={isEditing?"Save":"Submit"}
            alert={false}
          ></CustomDialog> */}
      </>
    );
  }

const avatarStyle={width: 40, height:40, float:"right", objectFit:"cover", borderRadius:"50%", marginLeft:15}
const thumbnailStyle={width:"100%", borderRadius: "8px", aspectRatio:"16 / 6", position: 'relative', zIndex: '1', cursor: "pointer", marginBottom:15}
const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      display: 'block',
      marginBottom: tokens.spacingVerticalMNudge
    },
  },
  textarea: {
    height: '200px',
  }
});
const titleStyle={fontSize:30, lineHeight: 1.2, fontWeight:"bold", paddingBottom:30};
const boxStyle={textAlign:"left", marginTop:15, backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }

export default PostForm;