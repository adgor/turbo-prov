import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
// import Jobs from "./Jobs";
import { useSelector, useDispatch } from "react-redux";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";
import changeLocationo from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";

const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];

const SearchParams = () => {
  const animal = useSelector((state) => state.animal);
  const location = useSelector((state) => state.location);
  const breed = useSelector(({ breed }) => breed);
  const theme = useSelector((state) => state.theme);
  const dispach = useDispatch();

  // const location = "debar";
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  // const [jobs, setJobs] = useState([]);

  useEffect(() => {
    requestPets();
    // requestJobs();
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
    const json = await res.json();

    setPets(json.pets);
  }
  // console.log(pets);

  return (
    <div className="text-red-500 search-params ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => dispach(changeLocationo(e.target.value))}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              dispach(changeAnimal(e.target.value));
            }}
            onBlur={(e) => {
              dispach(changeAnimal(e.target.value));
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
              dispach(changeBreed(e.target.value));
            }}
            onBlur={(e) => {
              dispach(changeBreed(e.target.value));
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
            onChange={(e) => dispach(changeTheme(e.target.value))}
            onBlur={(e) => dispach(changeTheme(e.target.value))}
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
