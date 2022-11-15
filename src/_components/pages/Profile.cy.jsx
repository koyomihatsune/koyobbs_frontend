import Profile from './Profile'
import { AuthContext } from '../../_contexts/AuthProvider';
import { MemoryRouter } from 'react-router-dom'
describe('Unit Testing Component: Profile', () => {
    let stub = {}
    before(() => {
        cy.fixture('component/ProfileStub').then(authJson => {
            stub = authJson
            cy.log(stub)
        })
    })
    it('Test Profile Logged In', () => {
        cy.mount(
        <MemoryRouter initialEntries={["/me"]}>
            <AuthContext.Provider value={stub['logged_in']}>
                <Profile></Profile>
            </AuthContext.Provider>
        </MemoryRouter>
        )
        cy.get('.fui-Button').should('contains.text', 'Logout')
        cy.get('[align="start"] > :nth-child(3)').should('contains.text', stub['logged_in'].auth.user.username)
        cy.get('[align="start"] > :nth-child(8)').should('contains.text', stub['logged_in'].auth.user.email)
    })
    it('Test Profile Not Logged In', () => {
        cy.mount(
        <MemoryRouter initialEntries={["/me"]}>
            <AuthContext.Provider value={stub['not_logged_in']}>
                <Profile></Profile>
            </AuthContext.Provider>
        </MemoryRouter>
        )
        cy.get('[href="/login"] > .fui-Button').should('contains.text', 'Login')
        cy.get('[href="/register"] > .fui-Button').should('contains.text', 'Register')
        cy.get('.fui-Text').should('contains.text', 'Log in or register to write post and view your own profile')
    })
})