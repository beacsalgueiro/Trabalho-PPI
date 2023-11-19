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
                <a href="editarLocal.php?id=${local.id}" class="btn btn-primary">Editar</a> 
                <button class="btn btn-danger mt-2" onclick="excluirLocal(${local.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;

        coluna.appendChild(card);
        galeriaLocais.appendChild(coluna);
    });
}

function excluirLocal(localId, nomeLocal) {
    // Pergunta ao usuário se ele realmente deseja excluir o local
    const confirmacao = window.confirm('Você realmente deseja excluir o local "'+nomeLocal+'"?');

    if (confirmacao) {
        // Se o usuário confirmar, será feita uma solicitação AJAX para excluir o local
        fetch(`excluirLocal.php?id=${localId}`, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(message => {
                alert(message);
                location.reload()
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
}

// function preencherFormulario() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const localId = urlParams.get("id");
//
//     // Fazer uma requisição HTTP para obter os dados do arquivo JSON
//     fetch('buscarLocaisEspecificos.php?id=' + localId)
//         .then(response => response.json())
//         .then(data => {
//             // Preencher o formulário com os dados obtidos do arquivo JSON
//             for (var campo in data) {
//                 if (data.hasOwnProperty(campo)) {
//                     document.getElementById(campo).value = data[campo];
//                 }
//             }
//         })
//         .catch(error => console.error('Erro ao obter dados do arquivo JSON:', error));
// }
//
// // Chamar a função quando a página carregar
// window.onload = preencherFormulario;


// Função para buscar locais do banco de dados
function buscarLocais() {
    // Realiza uma solicitação AJAX para buscarLocais.php
    fetch('buscarLocais.php', {     // FAZER MEUSLOCAIS.PHP FUNCIONAR!!!!!!!!
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
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
        });
}

document.addEventListener("DOMContentLoaded", buscarLocais);

function filtrarLocais() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const galeriaLocais = document.getElementById("galeria-locais");
    galeriaLocais.innerHTML = "";

    // Verifica se a busca está vazia
    if (searchTerm.trim() === "") {
        // Se estiver vazia, chama a função buscarLocais para exibir todos os locais
        buscarLocais();
        return;
    }

    // Realiza a filtragem dos locais obtidos da solicitação AJAX
    const filteredLocais = locaisDeDoacao.filter(local => local.nome.toLowerCase().includes(searchTerm));

    if (filteredLocais.length === 0) {
        const noResultsMessage = document.createElement("div");
        noResultsMessage.textContent = "Nenhum Local foi encontrado.";
        galeriaLocais.appendChild(noResultsMessage);
    } else {
        filteredLocais.forEach(local => {
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
                </div>
            `;

            coluna.appendChild(card);
            galeriaLocais.appendChild(coluna);
        });
    }
}

// aqui permite que a busca seja feita com o botão "enter"
// document.getElementById("searchInput").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         filtrarLocais();
//     }
// });

//Função para carregar imagem de perfil ao editar usuário
function displayImage(input) {
    const imagePreview = document.getElementById('imagePreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        imagePreview.src = "";
    }
    document.getElementById('fotoPerfil').addEventListener('change', function () {
        displayImage(this);
    });
}
