import { Link } from 'react-router-dom'

function Posts() {
  return (
    <>
      <main>
        <h2>This will be a posts Page</h2>
        <p>soon ..</p>
      </main>
      <nav>
        <Link to="/detail">Details</Link>
      </nav>
    </>
  )
}
export default Posts
