import { wait } from '@testing-library/user-event/dist/utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../_contexts/AuthProvider'
import PostCardList from './PostCardList'
describe('Test PostCardList', () => {
  let stub = {}
  let authStub = {}
  
  before(() => {
      cy.fixture('component/PostCardListStub').then(postCard => {
          stub = postCard
          cy.log(stub)
      })
      cy.fixture('component/ProfileStub').then(authJson => {
        authStub = authJson
        cy.log(authStub)
    })
    cy.viewport(1200, 900)
  })
  beforeEach(() => {
    cy.intercept('GET', '/assets/images/normal_post_thumbnail.png', {fixture: 'images/normal_post_thumbnail.png'}).as('getNormalThumbnail')
  })
  it('Count PostCardListItem 1 page', () => {
    cy.intercept({
        url: '/api/posts/post/*',
        middleware: true,
      },
      (req) => {
        req.reply({
            delay: 100000
        })
      }).as('getNormalPostResponse')
    cy.mount(
        <MemoryRouter initialEntries={["/"]}>
        <PostCardList postList={stub['one_page']}></PostCardList>
        
      </MemoryRouter>
    )
    cy.get('.fui-Card').should('have.length', 8)
    
  })

  it('Count PostCardListItem 2 pages', () => {
    cy.intercept({
        url: '/api/posts/post/*',
        middleware: true,
      },
      (req) => {
        req.reply({
            delay: 100000
        })
      }).as('getNormalPostResponse')
    cy.mount(
        <MemoryRouter initialEntries={["/"]}>
        <PostCardList postList={stub['two_pages']}></PostCardList>
        
      </MemoryRouter>
    )
    cy.get('.fui-Card').should('have.length', 9)
    
  })
})