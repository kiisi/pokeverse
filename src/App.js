import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(pokeApi);
      const data = await response.json();
      setPokemons(data.results);
      setFilteredPokemons(data.results);
    }
    fetchData();
  }, []);

    function handleChange(e) {
    // grab input value
    const value = e.target.value;
    // regex to match input value
    const regex = new RegExp(value, 'gi');
    // filter matches from placesRaw
    const filtered = pokemons.filter((pokemon) => {
      return pokemon.name.match(regex);
    });
    // set filteredPlaces to matches
    setFilteredPokemons(filtered);
  }


  return (
    <div data-testid="app">
      <Navigation />

      <Container className='mt-5 mb-5 search-container'>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          placeholder="Enter pokemon name"
          aria-label="Enter pokemon name"
          aria-describedby="basic-addon1"
          onChange={handleChange}
        />
      </InputGroup>
      </Container>

      

      <Container className='pokemon-layout'>
        {
          filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={index} url={pokemon.url} name={pokemon.name} />
          ))
        }
      </Container>

    </div>
  );
}

export { App };
