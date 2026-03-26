import api from "./api.js";

//Responsável por toda a manipulação do DOM, ou seja, criar os elementos html dinamicamente, preencher os formulários e limpar os campos. Cada função é assíncrona e lida com erros, alertando o usuário em caso de falhas.

const ui = {
    async renderizarPensamentos() {
        //Buscar a lista html 
        const listaPensamentos = document.getElementById('lista-pensamentos');
        listaPensamentos.innerHTML = '';
        
        try {
            // Buscar objetos(pensamentos) no 'baco de dados' com a api criada.
            const pensamentos = await api.buscarPensamentos();
            // Iterar os itens encontrados os transformando em <li>
            if(pensamentos.length === 0) {
                const containerListaPensamentos = document.getElementById('lista-pensamentos-container');
                containerListaPensamentos.innerHTML = `<div class="nenhum-pensamento-container">
                    <p class="nenhum-pensamento">Nenhum pensamento por aqui ainda. Que tal compartilhar alguma ideia?</p> 
                    <img src="./assets/imagens/memoteca-cerebro.png" alt="cartoon de um cerebro pensante">
                </div>
                `
                return;
            } else {
                pensamentos.forEach(pensamento => ui.adicionarPensamentoNaLista(pensamento));
            }
        } catch (error) {
            alert('Erro ao renderizar pensamentos')
            throw error;
        }
    },

    // Maneira dinâmica de criar os elementos html que representarão o pensamento nas listas de pensamentos.
    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const li = document.createElement('li')
        li.classList.add('li-pensamento')
        li.setAttribute('data-id', pensamento.id)

        const imgAspas = document.createElement('img')
        imgAspas.classList.add('icone-aspas')
        imgAspas.src = './assets/imagens/aspas-azuis.png'
        imgAspas.alt = 'Aspas azuis'

        const pensamentoConteudo = document.createElement('div')
        pensamentoConteudo.classList.add('pensamento-conteudo')
        pensamentoConteudo.textContent = pensamento.conteudo

        const pensamentoAutoria = document.createElement('div')
        pensamentoAutoria.classList.add('pensamento-autoria')
        pensamentoAutoria.textContent = pensamento.autoria

        const iconesContainer = document.createElement('div')
        iconesContainer.classList.add('icones')

        const linkBtnEditar = document.createElement('a')
        linkBtnEditar.href = `#main-titulo`
        
        const btnEditar = document.createElement('button')
        btnEditar.classList.add('botao-editar')
        btnEditar.onclick = () => ui.preecherFormulario(pensamento.id)
        
        const btnExcluir = document.createElement('button')
        btnExcluir.classList.add('botao-excluir')
        btnExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id)
                        .then(() => ui.renderizarPensamentos());
            
            } catch (error) {
                alert('Erro ao excluir pensamento')
                throw error;
            }
        }
                    
        const iconeEditar = document.createElement('img')
        iconeEditar.src = './assets/imagens/icone-editar.png'
        iconeEditar.alt = 'Editar pensamento'
        
        const iconeExcluir = document.createElement('img')
        iconeExcluir.src = './assets/imagens/icone-excluir.png'
        iconeExcluir.alt = 'Excluir pensamento'
              
        btnEditar.appendChild(iconeEditar)
        btnExcluir.appendChild(iconeExcluir)
        
        linkBtnEditar.appendChild(btnEditar)
        iconesContainer.appendChild(linkBtnEditar)
        iconesContainer.appendChild(btnExcluir)
        
        li.appendChild(iconesContainer)
        li.appendChild(imgAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        
        listaPensamentos.appendChild(li)
    },

    limparFormulario(){
        document.getElementById('pensamento-form').reset();
    },

    async preecherFormulario(pensamentoId){ 
        try {
            const pensamento = await api.buscarPensamentosPorId(pensamentoId);
            document.getElementById('pensamento-id').value = pensamento.id
            document.getElementById('pensamento-conteudo').value = pensamento.conteudo
            document.getElementById('pensamento-autoria').value = pensamento.autoria

        } catch (error) {
            alert('Erro ao preencher formulário')
            throw error;
        }
    }
}

export default ui;