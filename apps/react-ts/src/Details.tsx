import { Component, lazy } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
// import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { PetAPIResponse, Animal } from "./APIResponsesTypes";

const Modal = lazy(() => import("./Modal"));

class Details extends Component<{ params: { id?: string } }> {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: true };
  // }

  // replace the code above
  // from class properties
  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    if (!this.props.params.id) {
      return;
    }

    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = (await res.json()) as PetAPIResponse;

    // if possible call setState Once
    this.setState({ loading: false, ...json.pets[0] });

    // this.setState({
    //   loading: false,
    // });

    // this.setState(json.pets[0]);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h2>{name}</h2>
          <h3>
            {animal} - {breed} - {city}, {state}
          </h3>

          {/* old way */}
          {
            <ThemeContext.Consumer>
              {([theme]) => (
                <button style={{ backgroundColor: theme }}>Adopt {name}</button>
              )}
            </ThemeContext.Consumer>
          }

          {/* from Wrraper useContext */}
          {/* <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button> */}
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h2>Would you adopt {name}</h2>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}> No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams<{ id: string }>();
  // if use above from Wrraper useContext
  // const [theme] = useContext(ThemeContext);

  return (
    // check TS error
    // <ErrorBoundary>
    //   <Details params={params} />
    //   {/* if use above from Wrraper useContext */}
    //   {/* <Details theme={theme} params={params} /> */}
    // </ErrorBoundary>

    <>
      <Details params={params} />
      {/* if use above from Wrraper useContext */}
      {/* <Details theme={theme} params={params} /> */}
    </>
  );
};

export default WrappedDetails;
