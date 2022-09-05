import React from 'react';
import { useNavigate} from 'react-router-dom';
import {Image, Text, Button, useId, Textarea, Input, Tooltip} from '@fluentui/react-components'
import { ArrowLeftRegular, ArrowRightRegular, DeleteRegular, SaveRegular } from '@fluentui/react-icons';
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

function CreatePost(props) {
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext)
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [form, setForm] = useState({
    thumbnail: null,
    title: "",
    content: ""
  })

  const [photo, setPhoto] = useState(null)
  const [status, setStatus] = useState("Inputting");
  const [message, setMessage] = useState("");
  const [uploadButtonShow, setUploadButtonShow] = useState(false);

  const onSubmit = (e) => {
    setStatus("Loading")
    console.log(form)
    axios.post(HOSTNAME+API_LINK.CREATE_POST, form, {
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
        } else alert("System error.")
        
      }).catch(err => {
        setStatus("Failed")
        setMessage(err.response.data.statusText)
    })
  }

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const onPhotoChange = (e) => {
    if(e.target.files.length !== 0){
      setPhoto(URL.createObjectURL(e.target.files[0]))
      setForm({...form, thumbnail: e.target.files[0]})
    }
  }

  return (
      <div style={{textAlign:"left", marginTop:15}}>
          <div style={{backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }}>
            <div align="start" style= {{boxSizing:"border-box", padding:30}}>
                <div style={{paddingBottom:30}}>
                {(status==="Inputting") && <>
                  <Text style={{fontSize:30, lineHeight: 1.2, fontWeight:"bold", paddingBottom:30}}>
                      New Post
                  </Text>
                  <div style={{paddingTop:30, position: 'relative'}}>
                  <Tooltip
                    content={(photo)?"Click to change photo" :"Click to upload photo"}
                    relationship="label"
                    showDelay="0"
                    withArrow="true"
                  >
                    <Image src={(photo)?photo:"https://www.peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"} style={{width:"100%", borderRadius: "8px", aspectRatio:"16 / 6", position: 'relative', zIndex: '1', cursor: "pointer"}} fit="cover" 
                                        onClick={() => {document.getElementById("thumbnailUploader").click();}}
                    />
                  </Tooltip>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("thumbnail")} id="thumbnailUploader" type="file" style={{visibility:"hidden"}} onChange={onPhotoChange}></input>
                    <Input {...register("title")} fontSize="40px" placeholder="Type your title here..." style={{width:"100%"}} onChange={onChange}/>
                    <br/><br/>
                    <Textarea {...register("content")}  placeholder="Type your content here..." style={{width:"100%"}} onChange={onChange}/>
                    <div height="300"></div>
                    <Row style={{marginTop:20}}>
                      <Col style={{textAlign:"left", width:"50%"}}>
                          <Button color="#c989e8" icon={<DeleteRegular />} onClick={() => navigate("/")} style = {{marginRight:10}}>
                              Throw away
                          </Button>
                          <Button color="#c989e8" appearance='primary' icon={<SaveRegular />} type ="submit" onPressed={onSubmit} disabled={!photo || !form.title || !form.content}>
                              Post
                          </Button>
                      </Col>
                      <Col style={{textAlign:"right", width:"50%"}}>
                          <Image src="https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg" style={{width: 40, height:40, float:"right", objectFit:"cover", borderRadius:"50%", marginLeft:15}}></Image>
                          <div>
                            <ResponsiveEllipsis
                            text={auth.user.username}
                            maxLine='1'
                            ellipsis='...'
                            trimRight
                            basedOn='letters' style={{fontSize: 15, fontWeight: "bold"}}
                          />
                            <Text>Just now</Text>
                          </div>
                      </Col>
                    </Row>
                  </form>
                </>
                }
                {(status==="Loading") && <>
                  <Loading/>
                </>}
                {(status==="Success") && <div style= {{justifyContent: "center"}}>
                    <Success message={message}/>
                    <br/>
                    <Button color="#c989e8" icon={<ArrowLeftRegular />}
                    onClick={() => navigate("/")}>Back to Board</Button>
                </div>}   
                {(status==="Failed") && <div style= {{justifyContent: "center", display:"contnets"}}>
                    <Failure message={message}/>
                    <br/>
                    <Button color="#c989e8" icon={<ArrowLeftRegular />}
                    onClick={() => setStatus("Inputting")}>Back to editing</Button><br/>
                    <Button color="#c989e8" icon={<DeleteRegular />}
                    onClick={() => navigate("/")}>Throw away</Button>
                </div>}          
               
                </div>
            </div>
          </div>
      </div>
    );
  }

export default CreatePost;