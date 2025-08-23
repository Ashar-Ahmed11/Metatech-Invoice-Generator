import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import AppContext from './components/context/appContext';
import { Switch, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Pdf from './pdf';
import Home from './home';
function App() {
  const context = useContext(AppContext)
  const { helloworld } = context
  console.log(helloworld);

  return (
    <>

    
      <div>


        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/pdf" exact>
            <Pdf />
          </Route>

        </Switch>
      </div>

    </>

  );
}

export default App;