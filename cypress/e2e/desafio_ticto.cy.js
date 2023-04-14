import '../support/index'
import LoginPage from '../support/page_objects'
import userData from '../fixtures/user.json';
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
describe('Nome da sua descrição', () => {
  const userPage = new LoginPage ()

  it('Insira um Nome e Sobrenome válido', () => {
    userPage.visit()
    // Quando preencho um nome inválido
    userPage.fillName(userData.nameInvalido)
    userPage.fillEmail(userData.email)
    userPage.fillPassword(userData.password)
    // E clico no botão "Cadastrar"
    userPage.submitForm()
    //Então a mensagem de erro "Nome inválido" deve ser exibida
    userPage.checkInvalidNameError()
    userPage.screenshot()
  })
  it('O campo Email é obrigatório', () => {
    userPage.visit()
    // Dado que estou na página de cadastro
    // Quando não preencho o e-mail
    userPage.fillName(userData.name)
    userPage.fillPassword(userData.password)
    // E clico no botão "Cadastrar"
    userPage.submitForm()
    // Então a mensagem de erro "O campo E-mail é obrigatório" deve ser exibida
    userPage.checkEmailRequiredError()
    userPage.screenshot()
  })
  it('O campo Password deve ter no minimo 8 caracteres', () => {
    userPage.visit()
    // Quando preencho um nome válido, um e-mail válido e uma senha com menos de 8 caracteres
    userPage.fillName(userData.name)
    userPage.fillEmail(userData.email)
    userPage.fillPassword(userData.passwordInvalido)
    // E clico no botão "Cadastrar"
    userPage.submitForm()
    // Então a mensagem de erro "O campo Password deve ter no mínimo 8 caracteres" deve ser exibida
    userPage.checkPasswordLengthError()
    // Tira um screenshot
    userPage.screenshot()
  })
  it('Usuário cadastrado com sucesso', () => {
    userPage.visit()
    //Quando eu preencheu todos os campos válidos e enviou o formulário
    userPage.fillName(userData.name)
    userPage.fillEmail(userData.email)
    userPage.fillPassword(userData.password)
    // E clico no botão "Cadastrar"
    userPage.submitForm()
    // E o nome do usuário cadastrado deve ser exibido na tabela de usuários
    userPage.checkSuccessMessage()
    // Tira um screenshot
    userPage.screenshot()
  })
  it('Insira um Nome e Sobrenome válido', () => {
    userPage.visit()
    const userName = (userData.name)
    // busca o usuário Gabriel Batista na tabela de usuários
    cy.get('tbody > tr > :nth-child(2)').contains(userName).parent('tr').then($row => {
      // obtém o número do ID do usuário
      const userId = $row.find('th').text()
      // clica no botão de editar do usuário
      userPage.editar()
      cy.get(`[href="#modalEdit${userId}"]`).click()
      // verifica se o campo de nome está visível na modal de edição
      cy.get('.modal-body > :nth-child(4) > label').should('be.visible')
      // insere o nome inválido '1234'
      cy.get(`#e_name${userId}`).clear().type('1234')
      // clica no botão de salvar
      userPage.saveUser()
      // verifica se a mensagem de erro é exibida
      userPage.checkEditNameError()
    // Tira um screenshot
    userPage.screenshot()
    })
  })
  it('Editar campo Email é obrigatório', () => {
    userPage.visit()
    // busca o usuário Gabriel Batista na tabela de usuários
    cy.get('tbody > tr > :nth-child(3)').contains(userData.email).parent('tr').then($row => {
      // obtém o número do ID do usuário
      const userId = $row.find('th').text()
      // clica no botão de editar do usuário
      userPage.editar()
      cy.get(`[href="#modalEdit${userId}"]`).click()
      // verifica se o campo de e-mail está visível na modal de edição
      cy.get(':nth-child(5) > label').should('be.visible')
      // insere o e-mail inválido vazio ''
      cy.get(`#e_email${userId}`).clear()
      // clica no botão de salvar
      userPage.saveUser()
      // verifica se a mensagem de erro é exibida
      userPage.checkEmailRequiredError()
    // Tira um screenshot
    userPage.screenshot()
    })
  })
  it('Nome editado com sucesso', () => {
    userPage.visit()
    const userName = (userData.name)
    // busca o usuário Gabriel Batista na tabela de usuários
    cy.get('tbody > tr > :nth-child(2)').contains(userName).parent('tr').then($row => {
      // obtém o número do ID do usuário
      const userId = $row.find('th').text()
      // clica no botão de editar do usuário
      userPage.editar()
      cy.get(`[href="#modalEdit${userId}"]`).click()
      // verifica se o campo de nome está visível na modal de edição
      cy.get('.modal-body > :nth-child(4) > label').should('be.visible')
      // insere o nome válido 'Gabriel Contreras'
      cy.get(`#e_name${userId}`).clear().type(userData.newName)
      // clica no botão de salvar
      userPage.saveUser()
      // volta na tabela de usuários e verifica se o nome foi alterado
      cy.get('tbody > tr > :nth-child(2)').contains(userData.newName).should('be.visible')
      // Tira um screenshot
      userPage.screenshot()
    })
  })
  it('E-mail editado com sucesso', () => {
    userPage.visit()
    // busca o usuário gabriel@ticto.com na tabela de usuários
    cy.get('tbody > tr > :nth-child(3)').contains(userData.email).parent('tr').then($row => {
      // obtém o número do ID do usuário
      const userId = $row.find('th').text()
      // clica no botão de editar do usuário
      userPage.editar()
      cy.get(`[href="#modalEdit${userId}"]`).click()
      // verifica se o campo de e-mail está visível na modal de edição
      cy.get(':nth-child(5) > label').should('be.visible')
      // insere o novo e-mail 'ticto@gabriel.com'
      cy.get(`#e_email${userId}`).clear().type(userData.newEmail)
      // clica no botão de salvar
      cy.get('.modal-footer > .btn-primary').click()
      // volta na tabela de usuários e verifica se o e-mail foi alterado
      cy.get('tbody > tr > :nth-child(3)').contains(userData.newEmail).should('be.visible')
    })
      // Tira um screenshot
      userPage.screenshot()
  })
  it('Usuário removido com sucesso', () => {
    userPage.visit()
    // Seleciona o usuário Gabriel Contreras
    cy.get('tbody > tr > :nth-child(2)').contains('Gabriel Contreras').click()
    cy.get('tbody > tr > th').invoke('text').then((text) => {
      const id = text.trim();
      // Abre o modal de edição do usuário
      userPage.editar()
      // cy.get(`[href="#modalEdit${id}"]`).click()
      // Abre o modal de exclusão do usuário
      cy.get(`[href="#modalDelete${id}"]`).click()
      // Verifica se a mensagem de confirmação de exclusão está presente
      userPage.dell()
      // Confirma a exclusão do usuário
      userPage.deleter()
      // Verifica se a mensagem de sucesso está presente
      userPage.deletera()
      // Tira um screenshot
      userPage.screenshot()
    })
  })
})