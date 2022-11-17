import { wait } from '@testing-library/user-event/dist/utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../_contexts/AuthProvider'
import PostForm from './PostForm'
describe('Test PostForm', () => {
  let stub = {}
  let authStub = {}
  before(() => {
      cy.fixture('component/PostStub').then(postCard => {
          stub = postCard
          cy.log(stub)
      })
      cy.fixture('component/ProfileStub').then(authJson => {
        authStub = authJson
        cy.log(authStub)
    })
      cy.intercept("GET", "/assets/images/normal_post_thumbnail.png", {
        fixture: "images/normal_post_thumbnail.png",
      }).as("getNormalThumbnail");
  })

   it("Test PostForm Normal", () => {
     cy.intercept(
       {
         url: "/api/posts/post/2",
         middleware: true,
       },
       (req) => {
         req.reply({
           body: stub["get_post_response"],
         });
       }
     ).as("getNormalPostResponse");
     cy.mount(
       <MemoryRouter initialEntries={["/post/2/edit"]}>
         <Routes>
           <Route
             path={"/post/:postID/edit"}
             element={
               <AuthContext.Provider value={authStub["logged_in"]}>
                 <PostForm status="Edit"></PostForm>
               </AuthContext.Provider>
             }
           ></Route>
         </Routes>
       </MemoryRouter>
     );
     cy.wait("@getNormalPostResponse");
     cy.get("#titleField")
       .invoke("val")
       .then((val) => {
         expect(val).equal("This is sample post");
       });
     cy.get("#contentField")
       .invoke("val")
       .then((val) => {
         expect(val).equal("This is sample post. This is sample post");
       });
     // cy.get('[style="padding-top: 30px; position: relative;"] > .fui-Image').trigger('mouseenter')
     // cy.get('#tooltip-5').should('exist')
   });

  // it('Test PostForm Loading', () => {
  //   cy.intercept({
  //       url: '/api/posts/post/2',
  //       middleware: true,
  //     },
  //     (req) => {
  //       req.reply({
  //           delay: 100000
  //       })
  //     }).as('getNormalPostResponse')
  //   cy.mount(
  //       <MemoryRouter initialEntries={["/post/2/edit"]}>
  //       <Routes>
  //           <Route path={'/post/:postID/edit'} element={
  //               <AuthContext.Provider value={authStub['logged_in']}>
  //                   <PostForm status='Edit'></PostForm>
  //               </AuthContext.Provider>
  //           }></Route>
  //       </Routes>
        
  //     </MemoryRouter>
  //   )
  //   cy.get('.fui-Spinner__spinner').should('exist')
    
  // })

 

  it('Test PostForm Get Post Fail', () => {
    cy.intercept('GET', '/assets/images/normal_post_thumbnail.png', {fixture: 'images/normal_post_thumbnail.png'}).as('getNormalThumbnail')
    cy.intercept({
        url: '/api/posts/post/2',
        middleware: true,
      },
      (req) => {
        req.reply({
            body: {
                "status": "Failed",
                "error": "Not Found"
            }
        })
      }).as('getNormalPostResponse2')
    cy.mount(
        <MemoryRouter initialEntries={["/post/2/edit"]}>
          <Routes>
              <Route path={'/post/:postID/edit'} element={
                  <AuthContext.Provider value={authStub['logged_in']}>
                      <PostForm status='Edit'></PostForm>
                  </AuthContext.Provider>
              }></Route>
          </Routes>
        </MemoryRouter>
    )
    cy.wait('@getNormalPostResponse2')
    // cy.wait('@getNormalThumbnail')
    cy.get('.fui-Text').should('contains.text', 'Not Found')
  })
})