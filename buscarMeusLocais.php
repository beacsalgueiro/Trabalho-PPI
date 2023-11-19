<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alimentandoesperancas";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//    $responsavel = $_GET['responsavel']; // PEGAR NOME DO USUARIO RESPONSAVEL E SUBSTITUIR EM BAIXO NA QUERY

    $sql = "SELECT * FROM locais_doacao";// WHERE responsavel = 'Jose Carlos Silveira'"; // <- AQUI
    $result = $conn->query($sql);

    $locais = $result->fetchAll(PDO::FETCH_ASSOC);
    foreach ($locais as &$row) {
        if (isset($row['imagem']) && !empty($row['imagem'])) {
            $row['imagem'] = 'fotos/' . $row['imagem'];
        }
    }

    // Retorna os dados como JSON
    header('Content-Type: application/json');
    echo json_encode($locais);
} catch (PDOException $e) {
    die("Erro na consulta: " . $e->getMessage());
} finally {
    $conn = null;
}
?>
