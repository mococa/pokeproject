import React, {useState, useEffect} from 'react';
import PokemonRow from './components/PokemonRow';
import Pokemon from './components/Pokemon';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/default.css';
import './styles/mobile.css';

function App() {
    
    const [page, setPage] = useState(0)
    const [pokemons, setPokemons] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null)
    const [loading, setLoading] = useState(false);
    const [list, showList] = useState(true) // For when we click on a pokémon. The list turns invisible, and the pokémon we clicked, turns visible.

    // Paginating
    /*
        I take the pokémons count, divide by the number of pokémons
        I want in a page, but I round it upwards, in case the
        result is not an integer.
        No pokémon left!
     */
    const [pokeCount, setPokeCount] = useState(1118);
    const itemsPerPage = 10;
    



    async function fetchPokemonNames(){
        setLoading(true);
        const api_url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${page*itemsPerPage}`
        const response = await fetch(api_url)
        const data = await response.json()
        setPokeCount(data.count)
        setLoading(false);
        setPokemons(data.results)
    }
    async function showPoke(pokemon){
        const response = await fetch(pokemon.url)
        const pokemon_data = await response.json()
        setCurrentPokemon(pokemon_data);
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