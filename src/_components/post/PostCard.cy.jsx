import { MemoryRouter, Router } from 'react-router-dom'
import PostCard from './PostCard'
describe('PostCard.cy.jsx', () => {
  let data = {
    id: "0",
    title: "Sample Post",
    thumbnail: "https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2020/03/20031004000866.jpg",
    content: "This is Sample post",
    author: {
      id: "5",
      email: "anh_nv@flinters.vn",
      username: "koyomihatsune"
    },
    created_at: "2022-08-19T15:10:40.000+07:00",
    updated_at: "2022-08-19T15:10:48.000+07:00"
  }
  it('playground', () => {
    cy.mount(
      <MemoryRouter initialEntries={["/users/2"]}>
    <PostCard data={data}></PostCard>
    </MemoryRouter>
    )
    cy.get('button').should('contains.text', 'Click me!')
  })
})