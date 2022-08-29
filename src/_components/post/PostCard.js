import React from 'react';
import { useNavigate} from 'react-router-dom';
import { Card, CardFooter, CardHeader, CardPreview, ASSET_URL } from "@fluentui/react-components/unstable";
import { Body1, Text , Caption1, Button, Image} from "@fluentui/react-components";
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import axios from 'axios';
import { API_LINK, HOSTNAME } from '../../Constants';

function PostCard(props) {
  const examplePostData = {
    id: "2",
    title: "Hello",
    thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg",
    content: "This is Hello post by User 5",
    authorid: "5",
    created_at: "2022-08-19T15:10:40.000+07:00",
    updated_at: "2022-08-19T15:10:48.000+07:00"
  }

  const navigate = useNavigate();
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

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
                <Image src="https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg" style={{width:"100%", borderRadius: "0px", aspectRatio:"16 / 9",}}></Image>
              </CardPreview>
              <CardFooter>
                    <div style= {{width: "100%"}}>
                    <LinesEllipsis
                      text= {props.data.title}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters' style={{fontSize: 15, fontWeight: "bold",marginBottom:"10px", width: "100%"}}
                    />
                    <LinesEllipsis
                      text={props.data.content}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters' style={{fontSize: 14, width: "100%"}}
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