import React, { useEffect, useState } from "react"

function Result(props) {

    const [pokemonName,setPokemonName] = useState(null);
    const [pokemonImg, setPokemonImg] = useState(null);
    const [quantity, setQuantity] = useState(0);

    useEffect(()=>{
        const fetchData = async () => {
            const pokemonType = await fetch("https://pokeapi.co/api/v2/type/" + props.type);
            const TypeJson = await pokemonType.json();
            
            setQuantity(TypeJson.pokemon.length);

            let pokemonID = (Math.abs(props.number) % quantity);
            let pokemonName = TypeJson.pokemon[pokemonID].pokemon.name;

            const pokemonData = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
            const pokemonJson = await pokemonData.json();
            setPokemonName(pokemonJson.name.charAt(0).toUpperCase() + pokemonJson.name.slice(1));
            setPokemonImg(pokemonJson.sprites.other['official-artwork'].front_default);
        }
        if (props.number !== 0){
            fetchData();
        }
    },)

    return (
        <div id="result" 
        class={`flex flex-col justify-center items-center min-h-screen shadow-lg p-6 py-12
        border border-t-4 rounded-t-3xl border-gray-400
        ${props.number === 0 ? "hidden" : "block"}`}>
            <div class="text-center">
                <h1 class="sm:text-6xl text-4xl mb-12 font-mono">
                    Your Pokemon is:
                </h1>
                <h1 class="sm:text-6xl text-4xl font-bold">
                    {pokemonName}
                </h1>
                <p class="text-xl font-bold">
                    #{props.number}
                </p>
            </div>
            <img alt="Pokemon Official Artwork" class="w-72 my-6" src={pokemonImg}/>
            <a class=" py-2 px-3 rounded-xl
            bg-sky-400
            text-white font-bold text-md text-center" 
            href={`https://www.pokemon.com/us/pokedex/` + pokemonName}>
                Learn more about this Pokemon
            </a>
        </div>
    );
}

export default Result;