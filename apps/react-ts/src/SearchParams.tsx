import { useState, useEffect, useContext, FunctionComponent } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import ThemeContext from "./ThemeContext";
// import Jobs from "./Jobs";
import { PetAPIResponse, Animal, Pet } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "dog", "cat", "rabbit", "reptile"];

const SearchParams: FunctionComponent = () => {
  // const location = "debar";
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("" as Animal);
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([] as Pet[]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);
  // const [jobs, setJobs] = useState([]);

  useEffect(() => {
    void requestPets();
    // void requestJobs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // async function requestJobs() {
  //   //
  //   const res = await fetch(`http://localhost:3002/api/jobs`);

  //   const json = await res.json();
  //   // console.log('e para   ->', json)

  //   setJobs(json);
  // }

  // console.log("e ditaaa -> ", jobs);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = (await res.json()) as PetAPIResponse;

    setPets(json.pets);
  }
  // console.log(pets);

  return (
    <div className="text-red-500 search-params ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            name="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="darkblue">Dark Blue</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      {/* <Jobs jobs={jobs} /> */}
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
