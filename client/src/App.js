import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
