import React from 'react';
import { useNavigate} from 'react-router-dom';
import PostCard from "./PostCard";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import Failure from '../status/Failure';

function PostCardList(props) {
  const navigate = useNavigate();
  
  return (
      <>
          <Row gutter={40} style={{minHeight: "200px"}}>
            <div>
              {props.postList && props.postList.map(postData =>
                <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4 }} >
                    <PostCard key={postData.id} data={postData}></PostCard>
                </Col>
              )}
            </div>
          </Row>
      </>
    );
  }

export default PostCardList;