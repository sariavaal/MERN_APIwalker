import { useState, useEffect } from "react";
import axios from "axios";

function DropDownMenu() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    async function fetchData() {
      const filmsResponse = await axios.get(
        "https://swapi.py4e.com/api/films/"
      );
      const peopleResponse = await axios.get(
        "https://swapi.py4e.com/api/people/"
      );
      const planetsResponse = await axios.get(
        "https://swapi.py4e.com/api/planets/"
      );
      const speciesResponse = await axios.get(
        "https://swapi.py4e.com/api/species/"
      );
      const starshipsResponse = await axios.get(
        "https://swapi.py4e.com/api/starships/"
      );
      const vehiclesResponse = await axios.get(
        "https://swapi.py4e.com/api/vehicles/"
      );

      const [films, people, planets, species, starships, vehicles] =
        await Promise.all([
          filmsResponse.data,
          peopleResponse.data,
          planetsResponse.data,
          speciesResponse.data,
          starshipsResponse.data,
          vehiclesResponse.data,
        ]);

      setOptions([
        {
          label: "Films",
          options: films,
        },
        {
          label: "People",
          options: people,
        },
        {
          label: "Planets",
          options: planets,
        },
        {
          label: "Species",
          options: species,
        },
        {
          label: "Starships",
          options: starships,
        },
        {
          label: "Vehicles",
          options: vehicles,
        }
      ])
    }
    fetchData();
  }, []);
  //handlers for select and input
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://swapi.py4e.com/api/${selectedOption}/${inputValue}`
      );
      if (response.data) {
        if (selectedOption === "films") {
          setDetails({
            title: response.data.title,
            episode_id: response.data.episode_id,
            director: response.data.director,
            producer: response.data.producer,
            release_date: response.data.release_date,
          });
        } else if (selectedOption === "people") {
          setDetails({
            name: response.data.name,
            height: response.data.height,
            hair_color: response.data.hair_color,
            birth_year: response.data.birth_year,
            eye_color: response.data.eye_color,
            gender: response.data.gender,
          });
        } else if (selectedOption === "planets") {
          setDetails({
            name: response.data.name,
            climate: response.data.climate,
            terrain: response.data.terrain,
            population: response.data.population,
          });
        } else if (selectedOption === "species") {
          setDetails({
            name: response.data.name,
            classification: response.data.classification,
            designation: response.data.designation,
            average_height: response.data.average_height,
            skin_colors: response.data.skin_colors,
            hair_colors: response.data.hair_colors,
            eye_colors: response.data.eye_colors,
            average_lifespan: response.data.average_lifespan,
          });
        } else if (selectedOption === "starships") {
          setDetails({
            name: response.data.name,
            model: response.data.model,
            manufacturer: response.data.manufacturer,
            cost_in_credits: response.data.cost_in_credits,
            length: response.data.length,
            max_atmosphering_speed: response.data.max_atmosphering_speed,
          });
        } else if (selectedOption === "vehicles") {
          setDetails({
            name: response.data.name,
            model: response.data.model,
            manufacturer: response.data.manufacturer,
          });
        }
      } 
    } catch (error) {
      setDetails("No results found");
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="flex justify-center w-full">
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-5"
        >
          {options.map((option) => (
            <option key={option.label} value={option.label.toLowerCase()}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-5"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      {details !== "No results found" && (
      <div className="mt-5">
      <h2 className="text-2xl font-bold mb-4">{details.name}</h2>
      <ul>
        {Object.entries(details).map(([key, value]) => (
          <li key={key} className="text-gray-700" >
            <span className="font-bold">{key}:</span>{value}
          </li>
        ))}
      </ul>
    </div>
      )}
      {details === "No results found" && (
        <div>
          <p>{details}</p>
          <h2>Estos no son los droides que estas buscando</h2>
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHRuZHJiMGM4MmhyMWk0cHV5N2FrZmV4M3U1bTgzeTRpa2tya2R5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohuPcatcAKIYJCKBO/giphy.gif" alt="Obi-Wan Kenobi" />
        </div>
      )}
    </div>
  );
}


export default DropDownMenu;
