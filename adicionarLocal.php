<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alimentandoesperancas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
$idusuario = $_SESSION;

$nome = $_POST['nomeLocal'];
$dataInicio = $_POST['dataInicio'];
$dataFinal = $_POST['dataFinal'];
$responsavel = $_POST['name'];
$email = $_POST['email'];
$endereco = $_POST['endereco'] . ', ' . $_POST['numero'] . ', ' . $_POST['bairro'] . ', ' . $_POST['cidade'] . ', ' . $_POST['estado']. ', ' . $_POST['pais'];
$telefone = $_POST['telefone'];
$imagem = $_FILES['fotoPerfil']['name'];

$targetDir = "fotos/";
$targetFilePath = $targetDir . $imagem;
// Move a foto para a pasta
move_uploaded_file($_FILES["fotoPerfil"]["tmp_name"], $targetFilePath);

$sql = "INSERT INTO locais_doacao (nome, usuario_idusuario, data_inicio, data_final, responsavel, endereco, telefone, email, imagem)
        VALUES
            ('$nome', '' , '$dataInicio', '$dataFinal', '$responsavel', '$endereco', '$telefone','$email','$imagem')";

if ($conn->query($sql) === TRUE) {
    echo '<script>
        alert("Perfil criado com sucesso");
        location.href = "index.html";
        </script>';
} else {
    echo "Erro ao cadastrar: " . $conn->error;
}

$conn->close();
?>
