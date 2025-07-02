async function deletarCadastro(id) {
    await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: "DELETE"
    })
}

async function buscarUsuarios() {
    const response = await fetch(`http://localhost:3001/usuarios`)
    const usuarios = await response.json()
    return usuarios
}

function redirecionarParaEdicao(idUsuario) {
    const url = `index.html?idUsuario=${idUsuario}`
    window.location.href = url
}

async function popularTabela() {
    const usuarios = await buscarUsuarios()

    usuarios.forEach((usuario) => {
        const tabela = document.getElementById('tabela-usuarios')
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.cep}</td>
        <td>${usuario.rua}</td>
        <td>${usuario.numero}</td>
        <td>${usuario.bairro}</td>
        <td>${usuario.cidade}</td>
        <td>${usuario.estado}</td>
        <td>${usuario.racaPet}</td>
        <td>${usuario.nomePet}</td>
        <td class="actions">
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
        </td>
        `
        const botaoExcluir = tr.querySelector('.delete-btn')
        botaoExcluir.addEventListener('click', () => deletarCadastro(usuario.id))

        const botaoEditar = tr.querySelector('.edit-btn')
        botaoEditar.addEventListener('click', () => redirecionarParaEdicao(usuario.id))

        tabela.appendChild(tr)
    });
}

popularTabela()

