import './App.css';
import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

function App() {
  const [pets, setPets] = useState([])

  useEffect(() => {
    axios.get('https://pet-post.herokuapp.com/api/users')
    .then(users => {
      setPets(users.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      <h1>🐹🦎 Pet Post 🐱🐶</h1>
      <Switch>
        <Route exact path='/'>
          <h1>Welcome!</h1>
        </Route>
        <Route path='/animals'>
          <h1>Animals!</h1>
          {
            pets.map(pet => {
              return(
              <div>
                <h2>{pet.user_username}</h2>
                <h3>{pet.user_species}</h3>
                <p>{pet.user_email}</p>
              </div>
              )
            })
          }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
