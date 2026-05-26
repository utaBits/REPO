import Login from "./login.jsx" ;
import Dashboard from "./dashboard.jsx" ;
import { BrowserRouter  , Routes , Router, Route} from 'react-router-dom' ;

function App() {
  return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/error" element={<div>Error: Page not found</div>} />
    <Route path="/*" element={<Dashboard />} />
   </Routes>
  </BrowserRouter>
  );
}

export default App;