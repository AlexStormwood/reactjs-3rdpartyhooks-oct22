import { useEffect, useState } from "react";
import { useFavicon, useLocalStorage, useTitle } from "react-use";

function App() {


	// pokemonName must be lowercase
	const [pokemonName, setPokemonName] = useState("");
	const [pokemonImageUrl, setPokemonImageUrl] = useState("");
	
	const [storedPokemonName, setStoredPokemonName, removeStoredPokemonName] = useLocalStorage("pokemonName", pokemonName);

	const [pokemonFormInput, setPokemonFormInput] = useState("");

	// useLocalStorage(pokemonImageUrl);
	useFavicon(pokemonImageUrl);


	useTitle(pokemonName ? 
		pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) 
		: 
		"Cool Pokemon Website"
	);

	useEffect(() => {
		setPokemonName(storedPokemonName);
	}, []);

	useEffect(() => {
		// p
		// pi
		// pik
		if (pokemonName){

			setStoredPokemonName(pokemonName);

			fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(response => response.json())
			.then(data => {
				setPokemonImageUrl(data.sprites.front_default);
			});
		}
	}, [pokemonName]);

	// Does not work:
	// useEffect(() => {
	// 	if (pokemonImageUrl){
	// 		// useFavicon(pokemonImageUrl);
	// 	}
	// }, [pokemonImageUrl]);

	// Does not work:
	//useEffect(() => useFavicon(pokemonImageUrl), [pokemonImageUrl]);

	const submitNewPokemon = () => {
		console.log("Submitting name to state.");
		setPokemonName(pokemonFormInput);
	}

	return (
		<div className="App">
			{/* Does not work: */}
			{/* {pokemonName && useTitle(pokemonName)} */}

			<form>
				<label>Pokemon name:</label>
				<input type="text" value={pokemonFormInput} onChange={(event) => {setPokemonFormInput(event.target.value)}} />
				{/* <input type="submit" onSubmit={submitNewPokemon}/> */}
			</form>
			<button onClick={submitNewPokemon} >Submit Pokemon Name</button>

		</div>
	);
}

export default App;
