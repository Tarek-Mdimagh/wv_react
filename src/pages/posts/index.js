import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { Link } from 'react-router-dom'
import RecipeReviewCard from '../components/card'

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
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc' }}>
          <RecipeReviewCard />
        </Box>
      </Container>
    </>
  )
}
export default Posts
