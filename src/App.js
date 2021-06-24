import './App.css';
import { Route, Link, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>🐹🦎 Pet Post 🐱🐶</h1>
      <Switch>
        <Route exact path='/'>
          <h1>Welcome!</h1>
        </Route>
        <Route path='/animals'>
          <h1>Animals!</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
