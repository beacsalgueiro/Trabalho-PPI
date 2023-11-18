let locaisDeDoacao = [];
function exibirLocais(locais) {
    const galeriaLocais = document.getElementById("galeria-locais");
    galeriaLocais.innerHTML = "";

    locais.forEach(local => {
        const coluna = document.createElement("div");
        coluna.className = "col-md-4 mb-4";

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${local.imagem}" class="card-img-top" alt="Imagem do Local">
            <div class="card-body">
                <h5 class="card-title">${local.nome}</h5>
                <p class="card-text"><strong>Endereço:</strong> ${local.endereco}</p>
                <a href="detalhesLocais.html?id=${local.id}" class="btn btn-primary">Mais Informações</a>
                <a href="editarLocal.html?id=${local.id}" onclick="editarLocal(${local.id})" class="btn btn-primary">Editar</a> 
                <button class="btn btn-danger mt-2" onclick="excluirLocal(${local.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;

        coluna.appendChild(card);
        galeriaLocais.appendChild(coluna);
    });
}



// Função para buscar locais do banco de dados
function buscarLocais() {
    // Realiza uma solicitação AJAX para buscarLocais.php
    fetch('buscarMeusLocais.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // Adiciona um timeout de 10 segundos
        timeout: 10000,
    })
        .then(response => {
            // Verifica se a resposta é bem-sucedida (status 200)
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            locaisDeDoacao = data;
            exibirLocais(data);
        })
        .catch(error => {
            console.error('Erro na solicitação AJAX:', error.message);
            if (error instanceof TypeError && error.message.includes('timeout'))
                console.error('Tempo limite de solicitação atingido. Verifique a conexão com o servidor.');
        });
}

// exibir locais quando a página carregar
document.addEventListener("DOMContentLoaded", buscarLocais);



// FUNCOES PARA ATUALIZAR UM LUGAR (DANDO ERRO)

// function carregarDados(localId) {
//     // Faça uma solicitação AJAX para obter os dados do local
//     fetch(`locaisEspecificos.php?id=${localId}`)
//         .then(response => response.json())
//         .then(data => {
//             preencherFormulario(data);
//         })
//         .catch(error => console.error('Erro ao obter dados do local:', error));
// }
//
// function preencherFormulario(local) {
//     // Preencher os campos do formulário com os dados obtidos
//     document.getElementById('nomeLocal').value = local.nome;
//     document.getElementById('dataInicio').value = local.data_inicio;
//     document.getElementById('dataFinal').value = local.data_final;
//     document.getElementById('responsavel').value = local.responsavel;
//     document.getElementById('endereco').value = local.endereco;
//     document.getElementById('telefone').value = local.telefone;
//     document.getElementById('email').value = local.email;
//     document.getElementById('imagem').value = local.imagem;
// }
//
// function salvarEdicao() {
//     // Obtenha os dados do formulário
//     const formData = new FormData(document.getElementById('localForm'));
//
//     // Converta os dados do formulário para um objeto JSON
//     const jsonData = {};
//     formData.forEach((value, key) => {
//         jsonData[key] = value;
//     });
//
//     // Faça uma solicitação AJAX para salvar as alterações no local
//     fetch('atualizarLocal.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(jsonData),
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Faça algo com a resposta, se necessário
//             console.log('Local atualizado:', data);
//         })
//         .catch(error => console.error('Erro ao salvar alterações:', error));
// }