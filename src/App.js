import './App.css';
import Navbar from './components/header/navbar';
import Footer from './components/footer';
import { BrowserRouter } from 'react-router-dom'; // <-- add this

function App() {
  return (
    <BrowserRouter> {/* <-- wrap here */}
      <Navbar />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
