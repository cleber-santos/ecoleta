
// () => {} isso é uma arrow function, inves de colocar a função (function var () {})

// API do IBGE para Estados e cidades (Cadastro da entidade)

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => { return res.json() })
    .then( states => {
        for( const state of states ) {
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }
    })// modo curto, o mesmo de .then( (state) => {} )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json())
        .then( cities => {            
            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")//Seletor de elementos.
    .addEventListener("change", getCities)  //adiona um "Ouvidor" de eventos.

// Itens de coleta

const itemsToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=itens]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    // Adicionar ou remover uma classe com Javascript
    itemLi.classList.toggle("selected") /* toggle -> Adiciona ou remove (Se o item tiver a classe select ele remove, se o item NÃO tiver a classe selected ele adiciona) */

    const itemId = itemLi.dataset.id

    //Verificar se existem itens selecionados
    //se SIM, pegar os itens selecionados.
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // Isso será true ou false
        return itemFound
    })

    //Se JÁ estiver selecionado 
    if(alreadySelected >= 0){
        //tirar da seleção.
        const filteredItems = selectedItems.filter( item => {
            const itemDifferent = item !== itemId
            return itemDifferent
        })
        selectedItems = filteredItems    
    } else {
        //Se NÃO estiver selecionado, adicionar à seleção.
        selectedItems.push(itemId)
    }    

    //Atualizar o campo escondido com os itens selecionados.
    collectedItems.value = selectedItems
}