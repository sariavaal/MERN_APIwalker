import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Person() {
  const { id } = useParams();
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.py4e.com/api/people/${id}`)
      .then(response => response.json())
      .then(data => {
        setPersonData(data);
      })
      .catch(error => {
        console.error('Error fetching person data:', error);
      });
  }, [id]);

  if (!personData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{personData.name}</h1>
      <p>Height: {personData.height}</p>
      <p>Mass: {personData.mass}</p>
    </div>
  );
}

export default Person;