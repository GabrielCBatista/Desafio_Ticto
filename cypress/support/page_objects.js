class LoginPage {
  visit() {
    cy.visit('https://qa-test.ticto.io/')
  }

  fillName(name) {
    cy.get('#name').type(name)
  }

  fillEmail(email) {
    cy.get('#email').type(email)
  }

  fillPassword(password) {
    cy.get('#password').type(password)
  }

  submitForm() {
    cy.get('form > .btn').click()
  }

  checkInvalidNameError() {
    cy.get('.form-text').should('contain.text', 'Insira um Nome e Sobrenome válido')
  }

  checkEmailRequiredError() {
    cy.get('.form-text').should('contain.text', 'O campo Email é obrigatório.')
  }

  checkPasswordLengthError() {
    cy.get('.form-text').should('contain.text', 'O campo Password deve ter no minimo 8 caracteres')
  }

  checkSuccessMessage() {
    cy.get('.alert').should('contain.text', 'Usuário cadastrado com sucesso')
  }

  checkUserInTable(name, email) {
    cy.get('tbody > tr > :nth-child(2)').contains(name)
    cy.get('tbody > tr > :nth-child(3)').contains(email)
  }

  editUser(userName) {
    cy.get('tbody > tr > :nth-child(2)').contains(userName).parent('tr').then($row => {
      const userId = $row.find('th').text()
      cy.get('.btn-group > .btn').click()
      cy.get(`[href="#modalEdit${userId}"]`).click()
    })
  }

  fillEditName(name, userId) {
    cy.get('.modal-body > :nth-child(4) > label').should('be.visible')
    cy.get(`#e_name${userId}`).clear().type(name)
  }

  fillEditEmail(email, userId) {
    cy.get(':nth-child(5) > label').should('be.visible')
    cy.get(`#e_email${userId}`).clear().type(email)
  }

  saveUser() {
    cy.get('.modal-footer > .btn-primary').click()
  }

  checkEditNameError() {
    cy.get('.form-text').should('contain.text', 'Insira um Nome e Sobrenome válido.')
  }
  screenshot() {
    cy.screenshot()
  }

  editar(){
    cy.get('.btn-group > .btn').click()
  }

  dell(){
    cy.get('.modal-body > .modal-title').should('contain.text', 'Deseja realmente excluir?')
  }
  deleter(){
    cy.get('.modal-footer > .btn-danger').click()
  }

  deletera(){
    cy.get('.alert').should('contain.text', 'Usuário removido com sucesso.')
  }
  
}

export default LoginPage