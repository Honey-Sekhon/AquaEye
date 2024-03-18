import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const PlayersList: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/players')
      .then(response => setPlayers(response.data))
      .catch(error => console.error("Could not fetch players:", error));
  }, []);

  return (
    <ListGroup>
      {players.map(player => (
        <ListGroup.Item key={player.id}>{player.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default PlayersList;
