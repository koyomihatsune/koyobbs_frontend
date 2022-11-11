import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardFooter, CardPreview } from "@fluentui/react-components/unstable";
import { Body1, Text , Caption1, Button, Image} from "@fluentui/react-components";
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import axios from 'axios';
import { API_LINK, HOSTNAME } from '../../Constants';
import { CompassNorthwestFilled } from '@fluentui/react-icons';
// import timeToNFormat from '../../_utils/DateTimeConverter';

export default function PostCard(props) {
  const navigate = useNavigate();
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

  function timeToNFormat(j) {
    return j.substring(0 ,10) + " at " + j.substring(11, 16);
  };  

  const cardLinkClick = () => {
    navigate("post/" + props.data.id)
  }

  return (
      <>
          <div style={{padding:"5px 5px 5px 5px" }}>
            <Card appearance="filled" onClick={cardLinkClick} >
            <CardFooter>
                    <div style={{width:"100%"}}>
                       <Image src="https://pjsekai.sega.jp/assets/images/special/download/sns-icon/unit03/icon_05_unit03_miku.png" style={{width: 40, height:40, float:"left", objectFit:"cover", borderRadius:"50%"}}></Image>
                       <div>
                          <ResponsiveEllipsis
                          text={props.data.author.username}
                          maxLine='1'
                          ellipsis='...'
                          trimRight
                          basedOn='letters' style={{fontSize: 15, fontWeight: "bold"}}
                        />
                          <Text>{timeToNFormat(props.data.updated_at)}</Text>
                        </div>
                  </div>
              </CardFooter>
              <CardPreview>
                <Image src={HOSTNAME+API_LINK.ASSET_IMAGES+props.data.thumbnail} style={{width:"100%", borderRadius: "0px", aspectRatio:"16 / 9", objectFit:"cover"}}></Image>
              </CardPreview>
              <CardFooter>
                    <div style= {{width: "100%"}}>
                    <LinesEllipsis
                      text= {props.data.title}
                      maxLine='1'
                      ellipsis='...'
                      trimRight
                      basedOn='letters' style={{fontSize: 15, fontWeight: "bold",marginBottom:"10px", width: "100%"}}
                    />
                    <LinesEllipsis
                      text={props.data.content}
                      maxLine='3'
                      ellipsis='...'
                      trimRight
                      basedOn='letters' style={{fontSize: 14, width: "100%", height:"60px"}}
                    />
                    </div>
              </CardFooter>
            </Card>
              <br/>
          </div>
      </>
    );
  }

// export default PostCard;