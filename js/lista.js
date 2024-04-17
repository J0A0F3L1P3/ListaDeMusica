listarMusicas()
// felipe

function listarMusicas() {
    const url = "https://etec24-d5e05-default-rtdb.firebaseio.com/musicas.json"

    const options = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    fetch(url, options)
        .then(response => response.json())
        .then(
            dados => {
                let lista = document.querySelector("#listaMusicas")
                let tbody = lista.querySelector('tbody')

                tbody.innerHTML = '';

                for (let chave in dados) {
                    let item = dados[chave]
                    // console.log(chave, item.faixa)

                    let linha = document.createElement('tr')
                    linha.innerHTML = `
                    <td>${item.faixa}</td>
                    <td>${item.cantor}</td>
                    <td>${item.estrelas}</td>
                    <td>${item.album}</td>
                    <td class="btn-group"></td>
                    `

                    // editar
                    const btnEdit = document.createElement('button')
                    btnEdit.classList.add("btn", "btn-primary")
                    btnEdit.innerHTML = `<i class="fa-solid fa-edit"></i>`

                    btnEdit.addEventListener("click", () => {
                        openEditMusModal(chave)
                    })

                    // apagar
                    const btnDelete = document.createElement('button')
                    btnDelete.classList.add("btn", "btn-danger")
                    btnDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`

                    btnDelete.addEventListener("click", () => {
                        removerItem(chave)
                    })

                    // anexar
                    linha.querySelector('.btn-group').appendChild(btnEdit)
                    linha.querySelector('.btn-group').appendChild(btnDelete)
                    tbody.appendChild(linha)
                }
            }
        )
}

// Remover itens

function removerItem(chave) {
    const url = `https://etec24-d5e05-default-rtdb.firebaseio.com/musicas/${chave}.json`

    const options = {
        method: "DELETE",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    fetch(url, options)
        .then(response => response.json())
        .then(
            () => {
                location.reload()
            }
        )
}

// Filtrar as musicas

document.getElementById('filName').addEventListener('input', function () {
    let input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("filName");
    filter = input.value.toUpperCase();
    table = document.getElementById("listaMusicas");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                j = 5;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});

// Adicionar musicas

const addMusModal = document.querySelector('.addMusModal')
const closeMusModal_btn = document.querySelector("#closeAddMusModal")
const createMus_btn = document.querySelector("#createMus")

const faixa = document.querySelector("#faixa")
const artista = document.querySelector("#artista")
const estrelas = document.querySelector("#estrelas")
const album = document.querySelector("#album")

function openCreateMusModal() {
    addMusModal.classList.add("active")

    console.log('clicado')

    faixa.value = ""
    artista.value = ""
    album.value = ""
    estrelas.value = 1
}

function closeCreateMusModal() {
    addMusModal.classList.remove("active")
}

createMus_btn.addEventListener('click', () => {
    createMusica()
})

function createMusica() {
    const faixa = document.querySelector("#faixa").value
    const artista = document.querySelector("#artista").value
    const estrelas = document.querySelector("#estrelas").value
    const album = document.querySelector("#album").value

    const url = "https://etec24-d5e05-default-rtdb.firebaseio.com/musicas.json"

    const options = {
        method: "POST",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        },
        body: `{
            "faixa": "${faixa}",
            "cantor": "${artista}",
            "estrelas": "${estrelas}",
            "album": "${album}",
            "status": "1" 
            } `
    }

    fetch(url, options)
        .then(response => response.json())
        .then(
            data => {
                location.reload()
            }

        )
}

// Editar musicas

const activeEditMusModal_btn = document.querySelector(".activeEditMusModal")
const editMusModal = document.querySelector('.editMusModal')
const editMus_btn = document.querySelector("#editMus")

const editFaixa = document.querySelector("#editFaixa")
const editArtista = document.querySelector("#editArtista")
const editEstrelas = document.querySelector("#editEstrelas")
const editAlbum = document.querySelector("#editAlbum")

function openEditMusModal(chave) {
    editMusModal.classList.add("active");

    console.log(chave)

    const elemento = document.querySelector(".chave");
    elemento.setAttribute('alt', chave);

    const url = "https://etec24-d5e05-default-rtdb.firebaseio.com/musicas.json";

    const options = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const item = data[chave];
            if (item) {
                editFaixa.value = item.faixa;
                editArtista.value = item.cantor;
                editEstrelas.value = item.estrelas;
                editAlbum.value = item.album;
            } else {
                console.log('Não encontrada na API.');
            }
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function closeEditMusModal() {
    editMusModal.classList.remove("active")
}

editMus_btn.addEventListener("click", async () => {
    const elemento = document.querySelector(".chave").getAttribute('alt');
    console.log(elemento)
    await editarMusica(elemento);
    closeEditMusModal()
});

function editarMusica(chave) {
    console.log(chave);

    const dadosAtualizados = {
        faixa: editFaixa.value,
        cantor: editArtista.value,
        estrelas: editEstrelas.value,
        album: editAlbum.value
    };

    const url = `https://etec24-d5e05-default-rtdb.firebaseio.com/musicas/${chave}.json`;

    const options = {
        method: "PATCH",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(dadosAtualizados)
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erro na atualização dos dados (status ${response.status})`);
            }
        })
        .then(dados => {
            console.log('Dados atualizados com sucesso:', dados);
            listarMusicas();
        })
        .catch(error => console.error('Erro ao atualizar os dados:', error));
}