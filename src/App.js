import './App.css';
import { Home } from './Home';
import LogInSignUp from './LoginSignup';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- add this

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/account' element={<LogInSignUp/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
