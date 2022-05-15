import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import RecipeReviewCard from '../../components/card'
import { useEffect, useState } from 'react'

function Posts() {
  const [posts, setPosts] = useState()
  //get list of posts whene page start rendering
  useEffect(() => {
    fetch('https://dummyapi.io/data/v1/post?limit=10', {
      headers: { 'app-id': '627b956fb058dc4fa16fa1b9' },
    })
      .then((response) => response.json())
      .then((json) => setPosts(json.data))
  }, [])
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {posts?.map((post, index) => (
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
