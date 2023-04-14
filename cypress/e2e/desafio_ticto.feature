Funcionalidade: Validação de Cadastro de Usuários

    Cenário: Insira um Nome e Sobrenome válido
        Dado que estou na página de cadastro
        Quando preencho um nome inválido
        E clico no botão "Cadastrar"
        Então a mensagem de erro "Nome inválido" deve ser exibida

    Cenário: O campo Email é obrigatório
        Dado que estou na página de cadastro
        Quando não preencho o e-mail
        E clico no botão "Cadastrar"
        Então a mensagem de erro "O campo E-mail é obrigatório" deve ser exibida

    Cenário: O campo Password deve ter no mínimo 8 caracteres
        Dado que estou na página de cadastro
        Quando preencho um nome válido, um e-mail válido e uma senha com menos de 8 caracteres
        E clico no botão "Cadastrar"
        Então a mensagem de erro "O campo Password deve ter no mínimo 8 caracteres" deve ser exibida

    Cenário: Usuário cadastrado com sucesso
        Dado que o usuário preencheu todos os campos válidos e enviou o formulário
        Então a mensagem de sucesso "Usuário cadastrado com sucesso" deve ser exibida
        E o nome do usuário cadastrado deve ser exibido na tabela de usuários
        E o e-mail do usuário cadastrado deve ser exibido na tabela de usuários

    Cenário: Insira um Nome e Sobrenome válido
        Dado que o usuário "Gabriel Batista" está cadastrado
        Quando eu edito o nome do usuário para "1234"
        Então eu devo ver a mensagem de erro "Insira um Nome e Sobrenome válido."

    Cenário: O campo Email é obrigatório
        Dado que o usuário "Gabriel Batista" está cadastrado com sucesso com e-mail "gabriel@ticto.com"
        Quando eu edito o e-mail do usuário para em branco
        Então eu devo ver a mensagem de erro "Insira um e-mail válido."

    Cenário: Nome editado com sucesso
        Dado que o usuário "Gabriel Batista" está cadastrado
        Quando eu edito o e-mail do usuário para "Gabriel Contreras"
        Então a mensagem de sucesso "Usuário cadastrado com sucesso" deve ser exibida

    Cenário: E-mail editado com sucesso
        Dado que o usuário "Gabriel Contreras" está cadastrado com sucesso com e-mail "gabriel@ticto.com"
        Quando eu edito o e-mail do usuário para "ticto@gabriel.com"
        Então a mensagem de sucesso "Usuário cadastrado com sucesso" deve ser exibida

    Cenário: Usuário removido com sucesso
        Dado que estou logado na página de gerenciamento de usuários
        E o nome do usuário é "Gabriel Batista"
        Quando eu clico no botão "Excluir" correspondente ao usuário
        E confirmo a ação na mensagem de confirmação exibida
        Então a mensagem "Usuário removido com sucesso." é exibida na tela.