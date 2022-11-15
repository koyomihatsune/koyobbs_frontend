import { wait } from '@testing-library/user-event/dist/utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Post from './Post'
describe('Test Post', () => {
  let stub = {}
  before(() => {
      cy.fixture('component/PostStub').then(post => {
          stub = post
          cy.log(stub)
      })
      
  })

  it('Normal Post', () => {
    cy.intercept('GET', '/api/posts/post/2', stub.get_post_response).as('getNormalPostResponse')
    cy.intercept('GET', '/assets/images/normal_post_thumbnail.png', {fixture: 'images/normal_post_thumbnail.png'}).as('getNormalThumbnail')
    
    cy.mount(
      <MemoryRouter initialEntries={["/post/2"]}>
        <Routes>
            <Route path={'/post/:postID'} element={<Post data={stub.normal_post_card}></Post>}></Route>
        </Routes>
        
      </MemoryRouter>
    )
    cy.wait('@getNormalPostResponse')
    cy.wait('@getNormalThumbnail')
    cy.get('[style="font-size: 15px; font-weight: bold;"]').should('contains.text', 'miaht95')
    cy.get('[style="font-size: 20px; line-height: 1.3; white-space: pre-line;"]').should('contains.text', 'This is sample post. This is sample post')
    cy.get('[align="start"] > :nth-child(10)').should('contains.text', 'Created:  2022-11-14 at 14:21 ')
    cy.get('[align="start"] > :nth-child(12)').should('contains.text', 'Updated:  2022-11-14 at 14:21')
  })
  
  it('Test Post Loading', () => {
    
    cy.intercept({
        url: '/api/posts/post/2',
        middleware: true,
      },
      (req) => {
        req.reply({
            delay: 100000
        })
      }).as('getNormalPostResponse')
    cy.intercept('GET', '/assets/images/normal_post_thumbnail.png', {fixture: 'images/normal_post_thumbnail.png'}).as('getNormalThumbnail')
    
    cy.mount(
      <MemoryRouter initialEntries={["/post/2"]}>
        <Routes>
            <Route path={'/post/:postID'} element={<Post data={stub.normal_post_card}></Post>}></Route>
        </Routes>
        
      </MemoryRouter>
    )
    cy.get('.fui-Spinner__spinner').should('exist')
  })
  it('Test Post Load Fail', () => {
    
    cy.intercept({
        url: '/api/posts/post/2',
        middleware: true,
      },
      (req) => {
        req.reply({
            body: {
                "status": "Failed"
            }
        })
      }).as('getNormalPostResponse')
    cy.intercept('GET', '/assets/images/normal_post_thumbnail.png', {fixture: 'images/normal_post_thumbnail.png'}).as('getNormalThumbnail')
    
    cy.mount(
      <MemoryRouter initialEntries={["/post/2"]}>
        <Routes>
            <Route path={'/post/:postID'} element={<Post data={stub.normal_post_card}></Post>}></Route>
        </Routes>
        
      </MemoryRouter>
    )
    cy.get('.fui-Text').should('contains.text', 'Failed to load')
  })
})