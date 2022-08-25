import React from 'react';
import { useNavigate} from 'react-router-dom';
import { Card, CardFooter, CardHeader, CardPreview, ASSET_URL } from "@fluentui/react-components/unstable";
import { Body1, Text , Caption1, Button, Image} from "@fluentui/react-components";
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

function PostCard(props) {
  const examplePost = {
    title: "SEGA Announces Decision to Launch iOS/Android Game Project SEKAI COLORFUL STAGE! feat. Hatsune Miku Worldwide with U.S., Europe, and Asia as Target Regions",
    content: "SEGA CORPORATION (hereinafter SEGA, HQ: Shinagawa, Tokyo, President and COO: Yukio Sugino) has decided to launch localized editions of Project SEKAI COLORFUL STAGE! feat. Hatsune Miku (hereinafter Project SEKAI) for iOS/Android, which it runs in partnership with Colorful Palette Inc., mainly aimed at the U.S., Europe, and Asia, but also worldwide.",
    thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg"
  }

  const navigate = useNavigate();
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
  
  return (
      <>
          <div style={{padding:"5px 5px 5px 5px" }}>
            <Card>
            <CardFooter>
                    <div style={{width:"100%"}}>
                       <Image src="https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg" style={{width: 40, height:40, float:"left", objectFit:"cover", borderRadius:"50%"}}></Image>
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
                  </div>
              </CardFooter>
              <CardPreview>
                <img src={props.data.thumbnail} alt="Preview of a Word document " />
              </CardPreview>
              <CardFooter>
                    <div>
                    <LinesEllipsis
                      text= {props.data.title}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters' style={{fontSize: 15, fontWeight: "bold",marginBottom:"10px"}}
                    />
                    <LinesEllipsis
                      text={props.data.content}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters' style={{fontSize: 14}}
                    />
                    </div>
              </CardFooter>
            </Card>
              <br/>
          </div>
      </>
    );
  }

export default PostCard;