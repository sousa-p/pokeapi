// Constantes
const url = 'https://pokeapi.co/api/v2/pokemon/'

const inputPesquisar = document.getElementById('input__pesquisar')
const btnBuscar = document.getElementById('btn__buscar');

const loading = document.querySelector('.spinner-border');
// Objeto Pokemon
const pokemon = {
    container: document.querySelector('.pokemon'),
    wrapper_atributos: document.querySelector('.wrapper_atributos'),
    name: document.getElementById('name'),
    img: document.getElementById('img__pokemon'),
    habilidades: document.getElementById('habilidades'),
    formas: document.getElementById('formas'),
    especie: document.getElementById('especie'),
    tipos: document.getElementById('tipos'),
    experiencia: document.getElementById('experiencia'),
    altura: document.getElementById('altura'),

    setName: (text) => {
        pokemon.name.innerText = text;
    },

    setImg: (path) => {
        pokemon.img.setAttribute('src', path);
    },

    setHabilidades: (habilidades) => {
        this.habilidades.innerHTML = '';
        habilidades.forEach((habilidade) => {
            let elHabilidade;
            elHabilidade = document.createElement('li');
            elHabilidade.innerText = primeiraLetraMaiusculo(habilidade.ability.name);
            this.habilidades.appendChild(elHabilidade);
        })
    },

    setFormas: (formas) => {
        this.formas.innerHTML = '';
        formas.forEach((forma) => {
            let elForma;
            elForma = document.createElement('li');
            elForma.innerText = primeiraLetraMaiusculo(forma.name);
            this.formas.appendChild(elForma);
        })
    },

    setEspecie: (especie) => {
        this.especie.innerText = primeiraLetraMaiusculo(especie.name);
    },

    setTipos: (tipos) => {
        this.tipos.innerHTML = '';
        tipos.forEach((tipo) => {
            let elTipo;
            elTipo = document.createElement('li');
            elTipo.innerText = primeiraLetraMaiusculo(tipo.type.name);
            this.tipos.appendChild(elTipo);
        })
    },

    setExperiencia: (experiencia) => {
        this.experiencia.innerText = experiencia;
    },

    setAltura: (altura) => {
        this.altura.innerText = altura;
    }
}

// Funções
function primeiraLetraMaiusculo (text) {
    return text[0].toUpperCase() + text.substring(1)
}

function tratarPesquisa (pesquisa) {
    return pesquisa.toLowerCase().trim();
}

function attPokemon (data) {
    pokemon.setName(primeiraLetraMaiusculo(data.name));
    pokemon.setImg(data.sprites.other.home.front_default);
    pokemon.setHabilidades(data.abilities);
    pokemon.setFormas(data.forms);
    pokemon.setEspecie(data.species);
    pokemon.setTipos(data.types);
    pokemon.setExperiencia(data.base_experience);
    pokemon.setAltura(data.height);
    pokemon.wrapper_atributos.classList.remove('d-none');
}

// Evento de clicar para pesquisar
btnBuscar.addEventListener('click', () => {
    let pesquisa;
    pesquisa = tratarPesquisa(inputPesquisar.value);

    pokemon.container.classList.add('d-none');
    loading.classList.remove('d-none');

    fetch (`${url}${pesquisa}`)
    .then ((response) => {
        return response.json()
    })
    .then ((data) => {
        attPokemon(data);
    })
    .catch(() => {
        pokemon.setName('');
        pokemon.wrapper_atributos.classList.add('d-none');
        pokemon.setImg('./assets/image/default.svg');
    })
    .finally (() => {
        pokemon.container.classList.remove('d-none');
        loading.classList.add('d-none');
    })
});