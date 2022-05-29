$(document).ready(function () {
    login.eventos.init();
})

var login = {};

login.eventos = {

    init: () => {

        // cria o link dos eventos da página
        $("#btnLogin").on('click', () => {
            login.metodos.logar();
        });

        $("#btnSalvar").on('click', () => {
            login.metodos.validaModal();
        });

    },

}

login.metodos = {

    validaModal: () => {
        var name        = $("#txtName").val().trim();
        var login       = $("#txtLogin").val().trim();
        var password    = $("#txtPassword").val().trim();
        var email       = $("#txtEmail").val().trim();
        var cellphone   = $("#txtCellphone").val().trim();
        if (name == '' || name == undefined) {
            app.metodos.mensagem("Informe o NOME, por favor.")
            $("#txtName").focus();
            return;
        }
        if (login == '' || login == undefined) {
            app.metodos.mensagem("Informe o LOGIN, por favor.")
            $("#txtLogin").focus();
            return;
        }
        if (password == '' || password == undefined) {
            app.metodos.mensagem("Informe a SENHA, por favor.")
            $("#txtPassword").focus();
            return;
        }
        if (email == '' || email == undefined) {
            app.metodos.mensagem("Informe o E-MAIL, por favor.")
            $("#txtEmail").focus();
            return;
        }
        if (cellphone == '' || cellphone == undefined) {
            app.metodos.mensagem("Informe o TELEFONE, por favor.")
            $("#txtCellphone").focus();
            return;
        }

        var dados = {
            name: name,
            login: login,
            password: password,
            email: email,
            cellphone: cellphone
        };

        app.metodos.post('/user', JSON.stringify(dados),
            (response) => {
                console.log(response) 
                app.metodos.mensagem("Cadastrado.", "green");
                $("#modalFormlario").modal('toggle');                         
            },
            (xhr, ajaxOptions, error) => {
                if (xhr.status == 400) {
                    app.metodos.mensagem(xhr.responseJSON);
                    return;
                }else{
                    console.log('xhr', xhr);
                    console.log('ajaxOptions', ajaxOptions);
                    console.log('error', error);
                    app.metodos.mensagem("Falha ao realizar operação. Tente novamente.");
                    return;
                }
                
            }, 
            true
        );
    },

    abrirModal: () => {
        $("#txtName").val("");
        $("#txtLogin").val("");
        $("#txtPassword").val("");
        $("#txtEmail").val("");
        $("#txtCellphone").val("");
    },

    logar: () => {
        // valida os campos
        var usuario = $("#txtUsuario").val().trim();
        var senha = $("#txtSenha").val().trim();

        if (usuario == '' || usuario == undefined) {
            app.metodos.mensagem("Informe o usuário, por favor.")
            $("#txtUsuario").focus();
            return;
        }

        if (senha == '' || senha == undefined) {
            app.metodos.mensagem("Informe a senha, por favor.");
            $("#txtSenha").focus();
            return;
        }

        var dados = {
            login: usuario,
            password: senha
        }

        app.metodos.post('/login', JSON.stringify(dados),
            (response) => {

                app.metodos.gravarValorSessao(response.cellphone,   'cellphone');
                app.metodos.gravarValorSessao(response.email,       'email');
                app.metodos.gravarValorSessao(response.id,          'id');
                app.metodos.gravarValorSessao(response.login,       'login');
                app.metodos.gravarValorSessao(response.name,        'name');
                app.metodos.gravarValorSessao(response.token,       'token');
                
                window.location.href = './client/views/home/index.html';
                
            },
            (xhr, ajaxOptions, error) => {
                if (xhr.status == 404) {
                    app.metodos.mensagem(xhr.responseJSON);
                    return;
                }else{
                    console.log('xhr', xhr);
                    console.log('ajaxOptions', ajaxOptions);
                    console.log('error', error);
                    app.metodos.mensagem("Falha ao realizar operação. Tente novamente.");
                    return;
                }
                
            }, 
            true
        );

    }

}