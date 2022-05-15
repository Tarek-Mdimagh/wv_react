import './App.css'
import { Routes, Route } from 'react-router-dom'
import Posts from './pages/posts'
import Details from './pages/details'
function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="about" element={<Details />} />
      </Routes>
    </div>
  )
}

export default App
