const cadastrar = document.getElementById('cadastrar')
const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const estado = document.getElementById('estado')
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const numero = document.getElementById('numero')
const racaPet = document.getElementById('racaPet')
const nomePet = document.getElementById('nomePet')
const title = document.getElementById('title')


cadastrar.addEventListener('click', async () => {
    const response = await fetch(`http://localhost:3001/usuarios`)
    const data = await response.json()

    const cadastro = {
        nome: nome.value,
        email: email.value,
        cep: cep.value,
        rua: rua.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        racaPet: racaPet.value,
        nomePet: nomePet.value
    }

    const verificar = data.some((item) => item.email.toUpperCase() === email.value.toUpperCase())
    if (verificar) {
        alert('Email ja cadastrado.')
    }
    else {
        await fetch('http://localhost:3001/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastro)
        });
    }
})



cep.addEventListener('blur', async () => {
    const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
    const data = await response.json()
    rua.value = data.logradouro
    bairro.value = data.bairro
    cidade.value = data.localidade
    estado.value = data.estado
})

function getIdUsuario() {
    const params = new URLSearchParams(window.location.search);
    const idUsuario = params.get('idUsuario')

    return idUsuario
}

function renderizarBotoes() {
    const botao = document.getElementById('cadastrar')
    getIdUsuario() ? botao.textContent = 'Editar Cadastro' : botao.textContent = 'Cadastrar'
}

async function buscarUsuarioPorId() {
    const idUsuario = getIdUsuario()
    const res = await fetch(`http://localhost:3001/usuarios/${idUsuario}`)
    const data = await res.json()
    return data
}

async function setarCamposFormulario() {
    const usuario = await buscarUsuarioPorId()
    document.getElementById('nome').value = usuario.nome
    document.getElementById('email').value = usuario.email
    document.getElementById('cep').value = usuario.cep
    document.getElementById('rua').value = usuario.rua
    document.getElementById('numero').value = usuario.numero
    document.getElementById('bairro').value = usuario.bairro
    document.getElementById('cidade').value = usuario.cidade
    document.getElementById('estado').value = usuario.estado
    document.getElementById('racaPet').value = usuario.racaPet
    document.getElementById('nomePet').value = usuario.nomePet
}

function inicializarFuncoes() {
    renderizarBotoes()
    buscarUsuarioPorId()
    setarCamposFormulario()
}

inicializarFuncoes()

//json-server --watch db.json --port 3001 - Abrir o banco de dados.