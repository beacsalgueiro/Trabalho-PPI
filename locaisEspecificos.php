<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testebruno";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$localId = $_GET['id'];

$sql = "SELECT * FROM locais_doacao WHERE id = $localId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Adiciona o caminho "fotos/" se a coluna for "imagem"
    if (isset($row['imagem'])) {
        $row['imagem'] = 'fotos/' . $row['imagem'];
    }

    // Envie os dados como JSON
    header('Content-Type: application/json');
    echo json_encode($row);
} else {
    echo json_encode(array('error' => 'Local não encontrado'));
}

// Fecha a conexão com o banco de dados
    $conn->close();
?>