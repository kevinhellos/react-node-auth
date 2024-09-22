import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/">
          <Index/>
        </Route>

        <Route exact path="/dashboard">
          <Dashboard/>
        </Route>
        
      </Switch>
    </Router>
  )
}
