// Exemplo de dados para locais de doação (com URLs para imagens)
const locaisDeDoacao = [
    { nome: "Local1", endereco: "Endereço 1", telefone: "123-456-7890", imagem: "fotos/local1.jpg" },
    { nome: "Local2", endereco: "Endereço 2", telefone: "234-567-8901", imagem: "fotos/local2.jpg" },
    { nome: "Local3", endereco: "Endereço 3", telefone: "234-567-8901", imagem: "fotos/local3.jpg" },
    { nome: "Local3", endereco: "Endereço 3", telefone: "234-567-8901", imagem: "fotos/local3.jpg" },
    // Adicione mais locais conforme necessário
];

// Função para exibir locais de doação na galeria
function exibirLocais() {
    const galeriaLocais = document.getElementById("galeria-locais");
    galeriaLocais.innerHTML = "";
    locaisDeDoacao.forEach(local => {
        const coluna = document.createElement("div");
        coluna.className = "col-md-4 mb-4";

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${local.imagem}" class="card-img-top" alt="Imagem do Local">
            <div class="card-body">
                <h5 class="card-title">${local.nome}</h5>
                <a href="detalhesLocais.html?nome=${local.nome}&endereco=${local.endereco}&telefone=${local.telefone}"
                class="btn btn-primary">Mais Informações</a>
                
                <button class="btn btn-danger">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;

        coluna.appendChild(card);
        galeriaLocais.appendChild(coluna);
    });
}

// Chame a função para exibir locais quando a página carregar
document.addEventListener("DOMContentLoaded", exibirLocais);

function filtrarLocais() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const galeriaLocais = document.getElementById("galeria-locais");
    galeriaLocais.innerHTML = "";

    const filteredLocais = locaisDeDoacao.filter(local => local.nome.toLowerCase().includes(searchTerm));

    if (filteredLocais.length === 0) {

        const noResultsMessage = document.createElement("div");
        noResultsMessage.textContent = "No results found.";
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
                <a href="detalhesLocais.html?nome=${local.nome}&endereco=${local.endereco}&telefone=${local.telefone}"
                class="btn btn-primary">Mais Informações</a>
                
                <button class="btn btn-danger">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;

            coluna.appendChild(card);
            galeriaLocais.appendChild(coluna);
        });
    }
}

//função para localizar o CEP, utilizando a API do VIACEP
document.addEventListener("DOMContentLoaded", getCep);

function getCep() {

    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const estado = document.getElementById("estado");
    const pais = document.getElementById("pais");

    cep.addEventListener("blur", function () {
        const cep = this.value;

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    endereco.value = data.logradouro;
                    estado.value = data.uf;
                    pais.value = "Brasil";
                }
            })
            .catch(error => console.error("Error fetching address data: ", error));
    });
}