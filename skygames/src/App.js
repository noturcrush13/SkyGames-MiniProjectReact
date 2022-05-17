import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from './pages/Homepage';
import Games from './pages/Games';
import Games_Detail from './pages/Games_Detail';
import Games_F2P from './pages/Games_F2P';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/games" component={Games} />
          <Route exact path="/games/:id" component={Games_Detail} />
          <Route exact path="/freetoplay" component={Games_F2P} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
