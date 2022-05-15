import './App.css'
import { Routes, Route } from 'react-router-dom'
import Posts from './pages/posts'
import Details from './pages/details'
function App() {
  return (
    <div className="App">
      <h1>Welcome </h1>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route
          path="details/:postID"
          element={<Details />}
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  )
}

export default App
