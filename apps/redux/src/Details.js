import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import { connect } from "react-redux";

class Details extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { loading: true };
  // }

  // replace the code above
  // from class properties
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();

    // if possible call setState Once
    this.setState({ loading: false, ...json.pets[0] });

    // this.setState({
    //   loading: false,
    // });

    // this.setState(json.pets[0]);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

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

          <button style={{ backgroundColor: this.props.theme }}>
            Adopt {name}
          </button>

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

const mapStateToProps = ({ theme }) => ({ theme });

//  same as const above
// function(props) {
// return {theme: props.theme}
// }

const ReduxWrappedDetails = connect(mapStateToProps)(Details);

const WrappedDetails = () => {
  const params = useParams();

  return (
    <ErrorBoundary>
      <ReduxWrappedDetails params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
