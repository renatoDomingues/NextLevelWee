
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json())
    .then(states=>{
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        /*ufSelect.innerHTML= ufSelect.innerHTML + `<option value="1">Valor</option>`*/
        
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    //console.log(event.target.value)
    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text 

    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option> "
    citySelect.disabled = true
    fetch(url)
    .then(res=>res.json())
    .then(cities=>{
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false     
    })
}

document
   .querySelector("select[name=uf]")
   .addEventListener("change", getCities)

   //.then(()=>{return res.json()})

//Itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')
for(const item of itemsToCollect)
{
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []
function handleSelectedItem(event)
{
    const itemLi = event.target
    //add and remove a class with javaScript
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    console.log('ITEM ID:', itemId)
    /*console.log(event.target)*/
    /*console.log(event.target.dataset.id)*/
    
    //(1)check if there are selected items, if yes,pick up selected items
    const alreadySelected = selectedItems.findIndex(function(item)
    {
        const itemFound = item == itemId /*this will be true or false*/  
        return itemFound
    })

    //(2)if already selected, uncheck
    if(alreadySelected >= 0)
    {
        const filteredItems = selectedItems.filter(item=>{
            const itemIsDifferent = item != itemId /*false*/
            return itemIsDifferent
        })
        selectedItems = filteredItems
        //console.log(filteredItems)

    //(3)if not selected, select the selection
    }else{
        selectedItems.push(itemId)
    }
    //console.log(selectedItems)
    //console.log('selectedItems: ', itemId)


    //(4)update the hidden fields of the selected data
    collectedItems.value = selectedItems
}