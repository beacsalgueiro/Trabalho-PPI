//função para localizar o CEP, utilizando a API do VIACEP
document.addEventListener("DOMContentLoaded", getCep);
function getCep() {
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const bairro = document.getElementById("bairro");
    const estado = document.getElementById("estado");
    const pais = document.getElementById("pais");

    cep.addEventListener("blur", function () {
        const cep = this.value;

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    endereco.value = data.logradouro;
                    endereco.value = data.cidade;
                    bairro.value = data.bairro;
                    estado.value = data.uf;
                    pais.value = "Brasil";
                }
            })
        .catch(error => console.error("Error fetching address data: ", error));
    });
    }