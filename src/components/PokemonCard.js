import React from 'react';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function PokemonCard({ url, name }) {
  const [bg, setBg] = useState('');
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setBg(data.sprites.back_default);
      setAbilities(data.abilities);
    };

    fetchData();
  });


  return (
    <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src={bg} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>Abilities</ListGroup.Item>
          {
            abilities.map((ability, index)=>(
              <ListGroup.Item as="li" key={index}>{ability.ability.name}</ListGroup.Item>
            ))
          }
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export { PokemonCard };
