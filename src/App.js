import './App.css';
import Navbar from './components/header/navbar';
import Footer from './components/footer';
import Hero from './components/header/Hero';
import { BrowserRouter } from 'react-router-dom'; // <-- add this

function App() {
  return (
    <BrowserRouter> {/* <-- wrap here */}
      <Navbar />
      <Hero />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
