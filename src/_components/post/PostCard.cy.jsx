import { MemoryRouter, Router } from 'react-router-dom'
import PostCard from './PostCard'
describe('Test PostCard', () => {
  let stub = {}
  before(() => {
      cy.fixture('component/PostCardStub').then(postCard => {
          stub = postCard
          cy.log(stub)
      })
      cy.intercept('GET', '/assets/images/normal_post_thumbnail.png', {fixture: 'images/normal_post_thumbnail.png'}).as('getNormalThumbnail')
  })

  it('Normal PostCard', () => {
    cy.mount(
      <MemoryRouter initialEntries={["/posts/2"]}>
        <PostCard data={stub.normal_post_card}></PostCard>
      </MemoryRouter>
    )
    cy.wait('@getNormalThumbnail')
    cy.get('[style="font-size: 15px; font-weight: bold; margin-bottom: 10px; width: 100%;"]').should('contains.text', 'Sample Post')
    cy.get('[style="font-size: 14px; width: 100%; height: 60px;"]').should('contains.text', 'This is a sample post')
    cy.get('[style="width: 100%;"] > .fui-Image').invoke('attr', 'src').should('eq', 'https://pjsekai.sega.jp/assets/images/special/download/sns-icon/unit03/icon_05_unit03_miku.png')
  })
})