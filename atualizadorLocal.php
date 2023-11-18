<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testebruno";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    echo "O valor de 'id' é: " . $id;
} else {
    echo "O parâmetro 'id' não está presente na URL.";
}

if (isset($_GET['from'])) {
    $fromUrl = $_GET['from'];
    echo "A URL da página HTML é: " . $fromUrl;
} else {
    echo "O parâmetro 'from' não está presente na URL.";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nomeLocal'];
    $dataInicio = $_POST['dataInicio'];
    $dataFinal = $_POST['dataFinal'];
    $responsavel = $_POST['name'];
    $email = $_POST['email'];
    $endereco = $_POST['endereco'] . ', ' . $_POST['numero'] . ', ' . $_POST['bairro'] . ', ' . $_POST['cidade'] . ', ' . $_POST['estado']. ', ' . $_POST['pais'];
    $telefone = $_POST['telefone'];

    // Verifica se um arquivo de imagem foi enviado
    if (!empty($_FILES['fotoPerfil']['name'])) {
        $imagem = $_FILES['fotoPerfil']['name'];
        $targetDir = "fotos/";
        $targetFilePath = $targetDir . $imagem;

        // Move a foto para a pasta fotos/
        move_uploaded_file($_FILES["fotoPerfil"]["tmp_name"], $targetFilePath);
    } else {
        // Se nenhum novo arquivo foi enviado, mantenha o valor existente
        $imagem = $_POST['imagemExistente'];
    }

    $sql = "UPDATE locais_doacao SET 
            nome = '$nome',
            data_inicio = '$dataInicio',
            data_final = '$dataFinal',
            responsavel = '$responsavel',
            endereco = '$endereco',
            telefone = '$telefone',
            email = '$email',
            imagem = '$imagem'
            WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo "Cadastro atualizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . $conn->error;
    }
}

$conn->close();
?>
