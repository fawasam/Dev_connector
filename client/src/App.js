import './App.css';
import { useEffect } from 'react';
import {BrowserRouter as Router ,Route,Switch} from "react-router-dom"

//Redux
import { loadUser } from './actions/authAction';
import setAuthToken from './utils/setAuthToken';
import store from "./store"

//Components
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';

if(localStorage.token){
   setAuthToken(localStorage.token)
}

function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return ( 
    <div className="App">
      <Router>
      <Navbar/>
      <Switch>
      <Route exact path="/" component={Landing} />
      <Routes component={Routes}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
