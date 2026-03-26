import ui from './ui.js'
import api from './api.js';

//Responsável por inicializar a aplicação, ou seja, renderizar os pensamentos na tela e configurar os eventos de submit do formulário e clique do botão cancelar. Cada função é assíncrona e lida com erros, alertando o usuário em caso de falhas.

document.addEventListener('DOMContentLoaded', ()=>{
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById('pensamento-form')
    const btnCancelar = document.getElementById('botao-cancelar')

    formularioPensamento.addEventListener('submit', manipularSubmitFormulario)
    btnCancelar.addEventListener('click', manipularCancelamento)

})

async function manipularSubmitFormulario(event){
    event.preventDefault();

    // O Id a api json-server ficarar encarregada de criar 
    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value

    // Verificar se o id existe, se existir é porque o pensamento já existe e deve ser editado, caso contrário, é um novo pensamento que deve ser salvo. Após a operação, a lista de pensamentos é renderizada novamente para refletir as mudanças. Em caso de erro, um alerta é exibido para o usuário.
    try {
        if(id){
            await api.editarPensamento({ id, conteudo, autoria })
        }else {
            await api.salvarPensamento({ conteudo, autoria })
        }
        ui.renderizarPensamentos();
    } catch (error) {
        alert("Erro ao salvar pensamento")
        throw error; 
    }
}

function manipularCancelamento(){
    ui.limparFormulario();
}