<!DOCTYPE html>
<html lang="pt-BR">
<meta charset="UTF-8">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Local</title>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
</head>

<body>

<header>
    <h1 id="titulo">Alimentando Esperanças</h1>
</header>

<nav class="navbar navbar-expand-lg navbar-light custom-navbar sticky-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Home</a>
        <!-- botão de responsividade: -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Sair</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="locaisLogado.html">Locais</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="sobreLogado.html">Quem somos</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alimentandoesperancas";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$id = $_GET['id'];
$sql = "SELECT * FROM locais_doacao WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $dadosDoBanco = $result->fetch_assoc();

    // Extrair os dados para variáveis individuais (pega pelo nome da coluna)
    extract($dadosDoBanco);
} else {
    echo "Nenhum resultado encontrado";
}
?>

<div class="main_aside">
    <main class="main_logado">
        <div class="container mt-5">
            <h2>Editar Informações do Local</h2>
            <form action="" method="post" enctype="multipart/form-data">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="nomeLocal" id="nomeLocal" placeholder="Nome do Local"
                           value="<?php echo $nome; ?>">
                    <label for="nomeLocal">Nome do Local:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" name="dataInicio" id="dataInicio" value="<?php
                    echo $data_inicio; ?>">
                    <label for="dataInicio">Data de início de abertura para doações:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" name="dataFinal" id="dataFinal" value="<?php
                    echo $data_final; ?>">
                    <label for="dataFinal">Data de fechamento do local para doações:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="name" id="name" placeholder="Nome Completo"
                           value="<?php echo $responsavel; ?>">
                    <label for="name">Nome do responsável:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" name="email" id="email" placeholder="exemplo@gmail.com"
                           value="<?php echo $email; ?>">
                    <label for="email">E-mail de Contato:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="cep" id="cep" placeholder="CEP">
                    <label for="cep">Digite seu CEP novamente:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="adress" class="form-control" name="endereco" id="endereco" placeholder="Endereço"
                           value="<?php echo $endereco; ?>">
                    <label for="endereco">Endereço:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" name="numero" id="numero" placeholder="Número">
                    <label for="numero">Número:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="bairro" id="bairro" placeholder="Bairro">
                    <label for="bairro">Bairro:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="cidade" id="cidade" placeholder="Cidade">
                    <label for="cidade">Cidade:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="estado" id="estado" placeholder="Estado">
                    <label for="estado">Estado:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="pais" id="pais" placeholder="País">
                    <label for="pais">País:</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" name="telefone" id="telefone" placeholder="Telefone"
                           value="<?php echo $telefone; ?>">
                    <label for="telefone">Telefone de Contato:</label>
                </div>

                <label for="fotoPerfil" class="form-label">Foto do Local:</label>
                <div class="form-floating mb-3 col-sm-6">
                    <img id="imagePreview" class="img-thumbnail" src="" alt="Foto do Local"
                         width="250" height="250">
                </div>
                <div class="form-floating mb-3 col-sm-6">
                    <input type="file" class="form-control" name="fotoPerfil" id="fotoPerfil" accept="image/*">
                </div>
                <button type="submit" class="btn btn-primary mb-3" onclick="exibeAlerta()">Salvar Alterações</button>
                <script>
                    function exibeAlerta() {
                        alert("Cadastro atualizado com sucesso!");
                        location.reload()
                    }
                </script>
            </form>
        </div>

    </main>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = $_POST['nomeLocal'];
        $dataInicio = $_POST['dataInicio'];
        $dataFinal = $_POST['dataFinal'];
        $responsavel = $_POST['name'];

        $enderecoComponents = array(
            $_POST['endereco'],
            $_POST['numero'],
            $_POST['bairro'],
            $_POST['cidade'],
            $_POST['estado'],
            $_POST['pais']
        );
        $enderecoComponents = array_filter($enderecoComponents, function ($value) {
            return !empty($value);
        });

        $endereco = implode(', ', $enderecoComponents);

        $telefone = $_POST['telefone'];
        $email = $_POST['email'];
        $imagem = $_FILES['fotoPerfil']['name'];
        $targetDir = "fotos/";
        $targetFilePath = $targetDir . $imagem;
        move_uploaded_file($_FILES["fotoPerfil"]["tmp_name"], $targetFilePath);
    }
    $sql = "UPDATE locais_doacao SET";
    if (!empty($nome)) $sql .= " nome = '$nome',";
    if (!empty($dataInicio)) $sql .= " data_inicio = '$dataInicio',";
    if (!empty($dataFinal)) $sql .= " data_final = '$dataFinal',";
    if (!empty($responsavel)) $sql .= " responsavel = '$responsavel',";
    if (!empty($endereco)) $sql .= " endereco = '$endereco',";
    if (!empty($telefone)) $sql .= " telefone = '$telefone',";
    if (!empty($email)) $sql .= " email = '$email',";
    if (!empty($imagem)) $sql .= " imagem = '$imagem',";
    // Remove a última vírgula, se houver
    $sql = rtrim($sql, ',');
    $sql .= " WHERE id = $id";


    // Executar a consulta somente se houver algo para atualizar
    if (!empty($nome) || !empty($dataInicio) || !empty($dataFinal) || !empty(responsavel) || !empty(endereco) ||
        !empty(telefone) || !empty(email) || !empty(imagem)){
        if ($conn->query($sql) === TRUE) {
        } else {
            echo "Erro ao cadastrar: " . $conn->error;
        }
    } else {
        echo "Nada para atualizar. Variáveis estão vazias.";
    }


    $conn->close();
    ?>


    <aside>
        <div class="d-flex flex-column flex-shrink-0 p-3" >
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="indexLogado.html" class="nav-link active" aria-current="page">
                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
                        Home
                    </a>
                </li>
                <li>
                    <a href="meusLocais.html" class="nav-link link-dark">
                        <svg class="bi me-2" width="16" height="16"><use xlink:href=""></use></svg>
                        Meus Locais de Doação
                    </a>
                </li>
                <li>
                    <a href="editarPerfil.html" class="nav-link link-dark">
                        <svg class="bi me-2" width="16" height="16"><use xlink:href=""></use></svg>
                        Editar Perfil
                    </a>
                </li>
            </ul>
            <hr>
        </div>

    </aside>

</div>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="scriptMeusLocais.js"></script>
<script src="buscaCEP.js"></script>

<footer class="footer mt-auto py-3">
    <div class="Footer LogoTexto">
        <img src="fotos/logo.png" alt="Logo da Empresa" height="30">
        <p>Para entrar em contato, envie um email para: <a href="mailto:contato@example.com">contato@example.com</a></p>
        <p>&copy; 2023 Alimentando Esperança. Todos os direitos reservados.</p>
    </div>
</footer>

</body>
</html>


