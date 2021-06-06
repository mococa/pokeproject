import React, {useState, useEffect} from 'react';
import PokemonRow from './components/PokemonRow';
import Pokemon from './components/Pokemon';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/default.css';
import './styles/mobile.css';
//<Pokemon pokedata={currentPokemon}/>
function App() {
    
    const [page, setPage] = useState(0)
    const [pokemons, setPokemons] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null)
    const [loading, setLoading] = useState(false);
    const [list, showList] = useState(true)

    const itemsPerPage = 10;
    const pokeCount = 1118; // As it says in https://pokeapi.co/api/v2/pokemon



    async function fetchPokemonNames(){
        setLoading(true);
        const api_url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${page*itemsPerPage}`
        const response = await fetch(api_url)
        const data = await response.json()
        setLoading(false);
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
        <>
        <Header/>
        <main className="main">
            {
                list?
                    <>
                        <div className="pokemon-container">
                            {
                                pokemons.map(x=> <PokemonRow onClick={async()=>await showPoke(x)} key={x.name} pokemonName={x.name}/>)
                            }
                        </div>
                        <div className="page-btns">
                            {page?<button disabled={loading?true:""} onClick={()=>paginate(-1)}>Prev</button>:null}
                            <button disabled={loading?true:""} onClick={()=>paginate(1)}style={{marginLeft: 'auto'}}>Next</button>
                        </div>
                        <span style={{marginBottom:'30px'}}>Page {page+1}/{Math.ceil(pokeCount/itemsPerPage)}</span>
                    </> :
                    <>
                        <span onClick={()=>showList(true)}className="back-btn">Voltar</span>
                        <Pokemon pokedata={currentPokemon}/>
                   </>
            }
            
        </main>
        <Footer/>
        </>
    );
}

export default App;