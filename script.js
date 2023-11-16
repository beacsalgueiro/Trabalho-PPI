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
            </div>
        `;

        coluna.appendChild(card);
        galeriaLocais.appendChild(coluna);
    });
}

// Função para buscar locais do banco de dados
function buscarLocais() {
    // Realiza uma solicitação AJAX para buscarLocais.php
    fetch('buscarLocais.php', {
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
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        filtrarLocais();
    }
});

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

