import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Person from './components/Person';
import DropDownMenu from './components/DropDownMenu'
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DropDownMenu />} />
        <Route path="/:id" element={<Person />} />
      </Routes>
    </Router>
  )
}

export default App
