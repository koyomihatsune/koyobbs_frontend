import React from 'react';
import { useNavigate, Prompt} from 'react-router-dom';
import {Image, Text, Button} from '@fluentui/react-components'
import { ArrowLeftRegular, ArrowDownloadRegular } from '@fluentui/react-icons';
import { Row, Col } from 'react-simple-flex-grid';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

function Post(props) {
  const navigate = useNavigate();
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

  const examplePost = {
    title: "SEGA Announces Decision to Launch iOS/Android Game Project SEKAI COLORFUL STAGE! feat. Hatsune Miku Worldwide with U.S., Europe, and Asia as Target Regions",
    content: "SEGA CORPORATION (hereinafter SEGA, HQ: Shinagawa, Tokyo, President and COO: Yukio Sugino) has decided to launch localized editions of Project SEKAI COLORFUL STAGE! feat. Hatsune Miku (hereinafter Project SEKAI) for iOS/Android, which it runs in partnership with Colorful Palette Inc., mainly aimed at the U.S., Europe, and Asia, but also worldwide.",
    thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg"
  }

  return (
    
      <div style={{textAlign:"left", marginTop:15}}>
          <div style={{backgroundColor: "white", color: "black", width: "100%", borderRadius: "8px", boxShadow: "1px 1px 11px #ccc" }}>
            <div>
            <Image src={examplePost.thumbnail} style={{width:"100%", borderRadius: "8px", aspectRatio:"16 / 6", position: 'relative',
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
                        <Image src="https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg" style={{width: 40, height:40, float:"right", objectFit:"cover", borderRadius:"50%", marginLeft:15}}></Image>
                        <div>
                          <ResponsiveEllipsis
                          text='Hatsune Miku'
                          maxLine='1'
                          ellipsis='...'
                          trimRight
                          basedOn='letters' style={{fontSize: 15, fontWeight: "bold"}}
                        />
                          <Text>5h ago</Text>
                        </div>
                    </Col>
                </Row>
                <br/><br/>
                <Text style={{fontSize:30, lineHeight: 1.2, fontWeight:"bold"}}>
                    {examplePost.title}
                </Text>
                <br/><br/>
                <Text style={{fontSize:20, lineHeight: 1.3}}>
                    {examplePost.content}
                </Text>
            </div>
          </div>
      </div>
    );
  }

export default Post;