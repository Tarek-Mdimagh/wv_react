import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { Link } from 'react-router-dom'
import RecipeReviewCard from '../../components/card'
import { staticPosts } from '../../utils/fakePosts'

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
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {staticPosts.data.map((post, index) => (
            <Box key={index} sx={{ margin: 2 }}>
              <RecipeReviewCard postInfo={post} />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
}
export default Posts
