
listarMusicas()

function listarMusicas() {
    const url="https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json"

    const options ={
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    fetch(url,options)
    .then(response => response.json())
    .then(
        dados => {
            console.log(dados)

            let lista = document.querySelector("#listaMusicas")
            let tbody = lista.querySelector('tbody')

            tbody.innerHTML='';

            for (let chave in dados) {
                let item = dados[chave]

                let linha = document.createElement('tr')
                linha.innerHTML = `
                <td>${item.faixa}</td>
                <td>${item.cantor}</td>
                <td>${item.estrelas}</td>
                <td>${item.album}</td>

                `

                tbody.appendChild(linha)

            }
        }
    )
}