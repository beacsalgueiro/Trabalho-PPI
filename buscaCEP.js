//função para localizar o CEP, utilizando a API do VIACEP
document.addEventListener("DOMContentLoaded", getCep);
function getCep() {
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const cidade = document.getElementById("cidade");
    const bairro = document.getElementById("bairro");
    const estado = document.getElementById("estado");
    const pais = document.getElementById("pais");

    cep.addEventListener("blur", function () {
        const cep = this.value;

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    if (endereco) endereco.value = data.logradouro;
                    if (cidade) cidade.value = data.localidade;
                    if (bairro) bairro.value = data.bairro;
                    if (estado) estado.value = data.uf;
                    if (pais) pais.value = "Brasil";
                }
            })
        .catch(error => console.error("Error fetching address data: ", error));
    });
    }