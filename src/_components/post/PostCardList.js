import React from 'react';
import { useNavigate} from 'react-router-dom';
import PostCard from "./PostCard";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";

function PostCardList() {
  const examplePostList = [{
    title: "SEGA Announces Decision to Launch iOS/Android Game Project SEKAI COLORFUL STAGE! feat. Hatsune Miku Worldwide with U.S., Europe, and Asia as Target Regions",
    content: "SEGA CORPORATION (hereinafter SEGA, HQ: Shinagawa, Tokyo, President and COO: Yukio Sugino) has decided to launch localized editions of Project SEKAI COLORFUL STAGE! feat. Hatsune Miku (hereinafter Project SEKAI) for iOS/Android, which it runs in partnership with Colorful Palette Inc., mainly aimed at the U.S., Europe, and Asia, but also worldwide.",
    thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg"
  }, {
    title: "SEGA Announces Decision to Launch iOS/Android Game Project SEKAI COLORFUL STAGE! feat. Hatsune Miku Worldwide with U.S., Europe, and Asia as Target Regions",
    content: "SEGA CORPORATION (hereinafter SEGA, HQ: Shinagawa, Tokyo, President and COO: Yukio Sugino) has decided to launch localized editions of Project SEKAI COLORFUL STAGE! feat. Hatsune Miku (hereinafter Project SEKAI) for iOS/Android, which it runs in partnership with Colorful Palette Inc., mainly aimed at the U.S., Europe, and Asia, but also worldwide.",
    thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg"
  }, {
    title: "SEGA Announces Decision to Launch iOS/Android Game Project SEKAI COLORFUL STAGE! feat. Hatsune Miku Worldwide with U.S., Europe, and Asia as Target Regions",
    content: "SEGA CORPORATION (hereinafter SEGA, HQ: Shinagawa, Tokyo, President and COO: Yukio Sugino) has decided to launch localized editions of Project SEKAI COLORFUL STAGE! feat. Hatsune Miku (hereinafter Project SEKAI) for iOS/Android, which it runs in partnership with Colorful Palette Inc., mainly aimed at the U.S., Europe, and Asia, but also worldwide.",
    thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg"
  }]
  const navigate = useNavigate();
  
  return (
      <>
          <Row gutter={40}>
            <div>
              {examplePostList.map(co =>
                <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4 }}>
                  <PostCard data={co}></PostCard>
                </Col>
              )}
            </div>
          </Row>
      </>
    );
  }

export default PostCardList;