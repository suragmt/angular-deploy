describe('Home page visited', ()=>{
it('successfully loaded the home page', ()=>{
    cy.visit('http://localhost:4200')
})

it('test input',()=>{
    cy.visit('http://localhost:4200')

    cy.get('input[id="testid"]').type('surag')
    cy.get('input[id="testid"]').should('have.value', 'surag')
})
})