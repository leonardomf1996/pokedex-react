import React, { useState } from 'react';
import GlobalStyles from './styles/global';
import { Wrapper, Welcome, Instructions, Form, Input, Button, PokemonCard, PokemonDetails, Avatar, AvatarWrapper, PokemonName } from './styles/styles';
import pokeball from './assets/pokeball.svg';
import api from './services/api';
import Spinner from './components/Spinner';

function App() {
  const [pokemon, setPokemon] = useState(null); // Armazena o resultado da busca na API
  const [error, setError] = useState(null); // Responsável pelos erros
  const [typedPokemon, setTypedPokemon] = useState(''); // Responsável pelo input
  const [isLoading, setIsLoading] = useState(false); // Responsável pelo carregamento

  const handleChange = (event) => {
    setTypedPokemon(event.target.value.toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!typedPokemon) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.get(`/pokemon/${typedPokemon}`);
      setPokemon(response.data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError('Pokemon não encontrado!');
      setIsLoading(false);
      setPokemon(null);
    }
  };

  return (

    <Wrapper>
      <Welcome>Seja bem-vindo à pokedex!</Welcome>
      <Instructions>
        Digite o nome ou ID de um pokemon para começar!
        </Instructions>

      <Form onSubmit={handleSubmit}>
        <Input
          value={typedPokemon}
          placeholder='Nome/ID do Pokemon'
          onChange={handleChange}
        />
        <Button type="submit">
          {isLoading ? (
            <span>carregando...</span>
          ) : (
            <>
              Buscar <img src={pokeball} alt="pokeball" />{' '}
            </>
          )}
        </Button>
      </Form>

      {error && <span>{error}</span>}
      {pokemon && (
        <PokemonCard key={pokemon.id}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <AvatarWrapper>
                <PokemonName>{pokemon.name}</PokemonName>
                <Avatar
                  src={pokemon.sprites['front_default']}
                  alt={pokemon.name}
                />
              </AvatarWrapper>
              <PokemonDetails>
                <span>
                  <strong>Height</strong>: {pokemon.height * 10} cm
                </span>
                <span>
                  <strong>Weight</strong>: {pokemon.weight / 10} kg
                </span>
                <span>
                  <strong>Type</strong>: {pokemon.types[0].type.name}
                </span>
                <span>
                  <strong>id</strong>: {pokemon.id}
                </span>
              </PokemonDetails>
            </>
          )}
        </PokemonCard>
      )}

      <GlobalStyles />

    </Wrapper>

  );
}

export default App;
