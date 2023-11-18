<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alimentandoesperancas";

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$data_nasc = $_POST['data_nasc'];
$telefone = $_POST['telefone'];
$cep = $_POST['cep'];
$endereco = $_POST['endereco'];
$numero = $_POST['numero'];
$estado = $_POST['estado'];
$pais =  $_POST['pais'];

$PDO = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

$sql = "INSERT INTO usuario (nome, email, senha, data_nasc, telefone, cep, endereco, numero_endereco, estado, pais) VALUES (?,?,?,?,?,?,?,?,?,?)";

$stmt = $PDO->prepare($sql);

$stmt->bindParam(1, $nome);
$stmt->bindParam(2, $email);
$stmt->bindParam(3, $senha);
$stmt->bindParam(4, $data_nasc);
$stmt->bindParam(5, $telefone);
$stmt->bindParam(6, $cep);
$stmt->bindParam(7, $endereco);
$stmt->bindParam(8, $numero);
$stmt->bindParam(9, $estado);
$stmt->bindParam(10, $pais);

if ($stmt->execute()) {
if ($stmt->rowCount() > 0) {
echo "Perfil criado com sucesso";
} else {
 echo "Erro ao tentar efetivar cadastro";
}
}

?>
