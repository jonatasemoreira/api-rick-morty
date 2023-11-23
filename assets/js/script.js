//componente central
const containerApi = document.getElementById("container-api");

//filtro
const filtrarItens = document.getElementById("search");

//função assíncrona
async function getAll() {
  //requisicao a api
  const response = await fetch("https://rickandmortyapi.com/api/character");
  //convertendo em json
  const data = await response.json();
  //filtrando as informações na api
  const person = data.results;

  //atualizar a lista de personagens
  function updatePersonagens(filteredPerson) {
    //remover todos os elementos filhos do containerApi
    while (containerApi.firstChild) {
      containerApi.removeChild(containerApi.firstChild);
    }

    //loop para percorrer todos os personagens filtrados
    filteredPerson.map((person) => {
        //criando elementos
        const container = document.createElement("div");
        
        const nome = document.createElement("h3");
        const imagem = document.createElement("img");

        //adicionando classes
        container.classList.add("container-person");

        //adicionando valor aos elementos
        nome.textContent = person.name;
        imagem.src = person.image;

        //adicionando os filhos aos pais
        container.appendChild(nome);
        container.appendChild(imagem);

        //componente central
        containerApi.appendChild(container);
    });
  }

  //executar a função de atualização com todos os personagens
  updatePersonagens(person);

  //evento de input no filtro
  filtrarItens.addEventListener("input", () => {
    const filtro = filtrarItens.value.toLowerCase();

    //filtrar os personagens pelo nome
    const filteredPerson = person.filter((person) =>
      person.name.toLowerCase().includes(filtro)
    );

    //atualizar a lista de personagens
    updatePersonagens(filteredPerson);
  });
}

//executando a função principal
getAll()