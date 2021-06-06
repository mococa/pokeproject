import React, {useState, useEffect} from 'react';
import PokemonRow from './components/PokemonRow';
import Pokemon from './components/Pokemon';
import Header from './components/Header';
import './styles/default.css';
//<Pokemon pokedata={currentPokemon}/>
function App() {
    
    const [page, setPage] = useState(0)
    const [pokemons, setPokemons] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null)
    const [pokeVisible, setPokeVisible] = useState(false);
    const [list, showList] = useState(true)

    async function fetchPokemonNames(){
        const api_url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page*10}`
        const response = await fetch(api_url)
        const data = await response.json()
        setPokemons(data.results)
    }
    async function showPoke(pokemon){
        const response = await fetch(pokemon.url)
        const pokemon_data = await response.json()
        setCurrentPokemon(pokemon_data);
        console.log(pokemon_data)
        showList(false);
    }
    function paginate(x){
        setPage(page+x)
    }

    useEffect(async ()=>{
        await fetchPokemonNames()
    },[page])

    return (
        <main>
            <Header/>
            {
                list?
                    <>
                        <div className="pokemon-container">
                            {
                                pokemons.map(x=> <PokemonRow onClick={async()=>await showPoke(x)} key={x.name} pokemonName={x.name}/>)
                            }
                        </div>
                     <div className="page-btns">
                        {page?<button onClick={()=>paginate(-1)}>Prev</button>:null}
                        <button onClick={()=>paginate(1)}>Next</button>
                    </div> </>    :
                    <>
                    <span onClick={()=>showList(true)}>Voltar</span>
                    <Pokemon pokedata={currentPokemon}/>
                   </>
            }
            
        </main>
    );
}

export default App;