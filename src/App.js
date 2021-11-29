import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home/Home'
import routes from './routes'
import VotingTable from "./pages/VotingTable/VotingTable";
function App() {
  return (

   <Routes>
     {routes.map((route, ind) => (
         <Route {...route} key={ind}/>
     ))}
   </Routes>

  );
}

export default App;
