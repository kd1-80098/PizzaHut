import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from "./pages/customer/Home";
import Loginregister from "./pages/customer/Loginregister";


function App() {
  return (
    <div className="page-container">
     <div className="content-wrap">
        <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Loginregister}></Route>
        
        </Router>
        
     </div>
    </div>
  );
}

export default App;
