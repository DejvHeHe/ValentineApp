import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import DatePickPage from './DatePickPage';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/date-pick" element={<DatePickPage />} />
          
          
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;