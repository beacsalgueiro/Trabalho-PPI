document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    // const foto - urlParams.get("foto")
    const nome = urlParams.get("nome");
    const endereco = urlParams.get("endereco");
    const telefone = urlParams.get("telefone");

    const detalhesLocal = document.getElementById("detalhes-local");
    detalhesLocal.innerHTML = `
        <h3>${nome}</h3>
        <p><strong>Endereço:</strong> ${endereco}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <!-- Você pode adicionar mais informações sobre o local de doação aqui -->
    `;
});
