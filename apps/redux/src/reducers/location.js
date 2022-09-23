// old state = Seatle
// action: {type: "CHANGE_LOCATION", payload: "NewYork"}

// new state = "NewYork"

export default function location(state = "seattle, WA", action) {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return action.payload;
    default:
      return state;
  }
}
