import React from 'react';
import { useNavigate} from 'react-router-dom';
import {Image, Text, Button, useId, Textarea, Input} from '@fluentui/react-components'
import { ArrowLeftRegular, SaveRegular } from '@fluentui/react-icons';
import { Row, Col } from 'react-simple-flex-grid';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

function CreatePost(props) {
  const navigate = useNavigate();
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

  const titleId = useId('title');
  const contentId = useId('content');

  return (
      <div style={{textAlign:"left", marginTop:15}}>
          <div style={{backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }}>
            <div align="start" style= {{boxSizing:"border-box", padding:30}}>
                <div style={{paddingBottom:30}}>
                <Text style={{fontSize:30, lineHeight: 1.2, fontWeight:"bold"}}>
                      Post something new
                  </Text>
                </div>
                <div style={{paddingBottom:30}}>
                  <Input id={contentId} fontSize="40px" placeholder="Type your title here..." style={{width:"100%"}}/>
                  <br/><br/>
                  <Textarea id={contentId} placeholder="Type your content here..." style={{width:"100%"}}/>
                </div>
                <div>
                <Row>
                    <Col style={{textAlign:"left", width:"50%"}}>
                        <Button color="#c989e8" icon={<ArrowLeftRegular />} onClick={() => navigate("/")} style = {{marginRight:10}}>
                            Throw away
                        </Button>
                        <Button color="#c989e8" appearance='primary' icon={<SaveRegular />}>
                            Post
                        </Button>
                    </Col>
                    <Col style={{textAlign:"right", width:"50%"}}>
                        <Image src="https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg" style={{width: 40, height:40, float:"right", objectFit:"cover", borderRadius:"50%", marginLeft:15}}></Image>
                        <div>
                          <ResponsiveEllipsis
                          text='Your Name'
                          maxLine='1'
                          ellipsis='...'
                          trimRight
                          basedOn='letters' style={{fontSize: 15, fontWeight: "bold"}}
                        />
                          <Text>Just now</Text>
                        </div>
                    </Col>
                </Row>
                </div>
            </div>
          </div>
      </div>
    );
  }

export default CreatePost;