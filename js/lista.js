listarMusicas()

function listarMusicas() {
    // const url = "https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json"
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
                console.log(dados)

                let lista = document.querySelector("#listaMusicas")
                let tbody = lista.querySelector('tbody')

                tbody.innerHTML = '';

                for (let chave in dados) {
                    let item = dados[chave]

                    let linha = document.createElement('tr')
                    linha.innerHTML = `
                    <td>${item.faixa}</td>
                    <td>${item.cantor}</td>
                    <td>${item.estrelas}</td>
                    <td>${item.album}</td>
                    <td class="btn"></td>
                    `
                    const tdBtn = document.createElement('td')

                    // editar
                    const btnEdit = document.createElement('button')
                    btnEdit.classList.add("btn", "btn-primary")
                    btnEdit.innerHTML = `<i class="fa-solid fa-edit"></i>`
                    tdBtn.appendChild(btnEdit)

                    btnEdit.addEventListener("click", () => {
                        editarMusica(chave)
                    })

                    // apagar
                    const btnDelete = document.createElement('button')
                    btnDelete.classList.add("btn", "btn-danger")
                    btnDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`
                    tdBtn.appendChild(btnDelete)

                    btnDelete.addEventListener("click", () => {
                        removerItem(chave)
                    })

                    // anexar
                    linha.querySelector('.btn').append(tdBtn)
                    tbody.appendChild(linha)
                }
            }
        )
}

// Remover itens

function removerItem(chave) {

    console.log(chave)
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
            data => {
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

const activeAddMusModal_btn = document.querySelector(".activeAddMudModal")
const addMusModal = document.querySelector('.addMusModal')
const closeMusModal_btn = document.querySelector("#closeAddMusModal")
const createMus_btn = document.querySelector("#createMus")

const faixa = document.querySelector("#faixa")
const artista = document.querySelector("#artista")
const estrelas = document.querySelector("#estrelas")
const album = document.querySelector("#album")

// activeAddMusModal_btn.addEventListener('click', () => {
//     openCreateMusModal()
// })

function openCreateMusModal() {
    addMusModal.classList.add("active")

    console.log('clicado')

    faixa.value = ""
    artista.value = ""
    album.value = ""
    estrelas.value = 1
}

closeMusModal_btn.addEventListener('click', closeCreateMusModal)

function closeCreateMusModal() {
    addMusModal.classList.remove("active")
}

createMus_btn.addEventListener('click', (e) => {
    e.preventDefault()
    //preventDefault serve para evitar o comportamento default do form
    //Form html sempre envia os dados via get se não aplicar esse método

    createMusica()
})

function createMusica() {
    const faixa = document.querySelector("#faixa").value
    const artista = document.querySelector("#artista").value
    const estrelas = document.querySelector("#estrelas").value
    const album = document.querySelector("#album").value

    //url da realtime database com collection musicas.json
    const url = "https://etec24-d5e05-default-rtdb.firebaseio.com/musicas.json"

    // opcoes de chamada REST usando 
    // método POST , mode cors (permite cruzar dados entre sites)
    // headers:  cabeçalho informa tipo de dados json UTF-8
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

function openEditMusModal() {
    editMusModal.classList.edit("active")

    console.log('clicado')

    faixa.value = ""
    artista.value = ""
    album.value = ""
    estrelas.value = 1
}

closeMusModal_btn.addEventListener('click', closeEditMusModal)

function closeEditMusModal() {
    addMusModal.classList.remove("active")
}





















function editarMusica(chave, dadosAtualizados) {
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
        .then(response => response.json())
        .then(dados => {
            console.log('Dados atualizados com sucesso:', dados);
            listarMusicas();
        })
        .catch(error => console.error('Erro ao atualizar os dados:', error));
}

// Exemplo de uso da função editarMusica:
// editarMusica('chaveDaMusica', { faixa: 'Nova Faixa', cantor: 'Novo Cantor', estrelas: 5, album: 'Novo Álbum' });
