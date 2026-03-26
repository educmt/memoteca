const URL_BASE = 'http://localhost:3000';

//Resposável por fazer as requisições para a API, utilizando o axios para facilitar as chamadas HTTP. Cada função é assíncrona e lida com erros, alertando o usuário em caso de falhas.

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            return await response.data;
        } catch (error) {
            alert('Erro ao buscar pensamentos')
            throw error;
        }
    },
    async salvarPensamento(pensamento) {
        try {
            const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento)
            return await response.data;
        } catch (error) {
            alert('Erro ao salvar pensamentos')
            throw error;
        }
    },
    async buscarPensamentosPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            return await response.data;
        } catch (error) {
            alert('Erro ao buscar o pensamento')
            throw error;
        }
    },
    async editarPensamento(pensamento) {
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento)
            return await response.data;
        } catch (error) {
            alert('Erro ao editar pensamento')
            throw error;
        }
    },
    async excluirPensamento(id) {
        try {
            await axios.delete(`${URL_BASE}/pensamentos/${id}`)
        } catch (error) {
            alert('Erro ao excluir pensamento')
            throw error;
        }
    }
}

export default api;