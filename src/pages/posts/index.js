import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import RecipeReviewCard from '../../components/card'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

function Posts() {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)
  //get list of posts whene page start rendering
  useEffect(() => {
    setLoading((previous) => (previous = true))
    fetch('https://dummyapi.io/data/v1/post?limit=10', {
      headers: { 'app-id': '627b956fb058dc4fa16fa1b9' },
    })
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.data)
        setLoading((previous) => (previous = false))
      })
  }, [])
  return (
    <>
      {!loading ? (
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
      ) : (
        <CircularProgress />
      )}
    </>
  )
}
export default Posts
