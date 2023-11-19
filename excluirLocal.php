<?php
// Verifica se a solicitação é um pedido DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $localId = $_GET['id'];

    if (!is_numeric($localId)) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'ID selecionada não é um número válido']);
        exit;
    }

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alimentandoesperancas";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "DELETE FROM locais_doacao WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $localId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode('Local excluído com sucesso', JSON_UNESCAPED_UNICODE);
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(['error' => 'Erro ao excluir local']);
        }
    } catch (PDOException $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Erro na conexão com o banco de dados: ' . $e->getMessage()]);
    } finally {
        // Fecha a conexão ao final
        $conn = null;
    }
} else {
    // Se a solicitação não for um pedido DELETE, retorna uma mensagem de erro
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método não permitido']);
}
?>
