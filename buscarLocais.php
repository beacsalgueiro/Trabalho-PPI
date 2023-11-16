<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testebruno";

$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT * FROM locais_doacao";
$result = $conn->query($sql);

if (!$result) {
    die("Erro na consulta: " . $conn->error);
}

$locais = [];
while ($row = $result->fetch_assoc()) {
    if (isset($row['imagem']) && !empty($row['imagem'])) {
        $row['imagem'] = 'fotos/' . $row['imagem'];
    }
    $locais[] = $row;
}

$conn->close();

// Retorna os dados como JSON
header('Content-Type: application/json');
echo json_encode($locais);
?>
