document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const localId = urlParams.get("id");

    // Faça uma solicitação AJAX para obter os dados do local
    fetch(`buscarLocaisEspecificos.php?id=${localId}`)
        .then(response => response.json())
        .then(data => {
            const detalhesLocal = document.getElementById("detalhes-local");
            detalhesLocal.innerHTML = `
                    <img src="${data.imagem}" class="img-fluid mb-2 img-detalhes" alt="Foto do Local">
                    <p><strong>Nome:</strong> ${data.nome}</p>
                    <p><strong>Data Início:</strong> ${data.data_inicio}</p>
                    <p><strong>Data Final:</strong> ${data.data_final}</p>          
                    <p><strong>Responsavel:</strong> ${data.responsavel}</p>          
                    <p><strong>E-mail:</strong> ${data.email}</p>
                    <p><strong>Endereço:</strong> ${data.endereco}</p>
                    <p><strong>Telefone de contato:</strong> ${data.telefone}</p>
                `;
        })
        .catch(error => console.error('Erro ao obter dados do local:', error));
});