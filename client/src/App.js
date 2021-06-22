import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Location_ from "./screens/Location_"
import Current from "./screens/Current"
import Forecast from "./screens/Forescast"
import Error from './screens/Error';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/location" component={Location_} />
        <Route exact path="/current" component={Current} />
        <Route exact path="/forecast" component={Forecast} />
        <Route path="/" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
