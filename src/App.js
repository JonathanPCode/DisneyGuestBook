import './App.css';
import React from 'react';

const guestbook = {};
let highestVisitCount = 0;

function App() {
  // Initial state of guestbook, and function to change guestbook
  const [guests, setGuests] = React.useState([]);

  // Takes key and returns built list item of guestbook
  function createListItem(key) {
    if (guestbook[key].visits >= highestVisitCount) {
      return <li class="highest-visits">{guestbook[key].initials} - {guestbook[key].name} - {guestbook[key].visits}</li>;
    } 
    return <li>{guestbook[key].initials} - {guestbook[key].name} - {guestbook[key].visits}</li>;
  }

  // Builds object containing name, initials, and visits, then adds to guestbook and updates guestbook.
  function handleSubmit() {
    const input = document.getElementById("name");
    const name = input.value;
    if (!name) return;
    input.value = "";
    if (guestbook[name] == null) {
      const arr = name.split(" ");
      let temp = "";
      arr.forEach(e => {
        // [...e][0] instead of e[0] to handle unicode (emoji's 🤙)
        temp += [...e][0];
      });
      guestbook[name] = {name: name, initials: temp, visits: 1};
    }
    else {
      guestbook[name].visits++;
    }
    if (guestbook[name].visits > highestVisitCount) {
      highestVisitCount = guestbook[name].visits;
    }
    setGuests(
      Object.keys(guestbook).map(createListItem)
    )
  }

  // Sorts guestbook alphabetically, ascending
  function sortAsce() {
    setGuests(
      Object.keys(guestbook).sort((a, b) => a.localeCompare(b)).map(createListItem)
    )
  }

  // Sorts guestbook alphabetically, descending
  function sortDesc() {
    setGuests(
      Object.keys(guestbook).sort((a, b) => b.localeCompare(a)).map(createListItem)
    )
  }

  // Submits if "Enter" key is pressed.
  function handleKey(e) {
    if (e.key !== "Enter") return;
    handleSubmit();
    e.preventDefault();
  }

  return (
    <div className="App">
      <div id="enter-guest-book">
        <h3>Welcome, Vice Presidents!</h3>
        <h3>Please sign in.</h3>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" onKeyUp={handleKey}/>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div id="sort-buttons">
        <button type="button" onClick={sortAsce} id="asce-button">Asce</button>
        <button type="button" onClick={sortDesc}>Desc</button>
      </div>
      <div id="display-guest-book">
        <ul>{guests}</ul>
      </div>
    </div>
  );
}

export default App;
