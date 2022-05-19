import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import RecipeReviewCard from '../../components/card'
import { useEffect, useState } from 'react'
import { CircularProgress, Skeleton } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'

function Posts() {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false)

  const [currentStep, setCurrentStep] = useState(10)
  const [totalPosts, setTotalPosts] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  //fetchPosts
  const fetchPosts = (page) => {
    setLoading((previous) => (previous = true))

    fetch(
      'https://dummyapi.io/data/v1/post?limit=' +
        currentStep +
        '&page=' +
        page,
      {
        headers: { 'app-id': '627b956fb058dc4fa16fa1b9' },
      },
    )
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.data)
        setTotalPosts(json.total)
        setIsFetching(false)
        setLoadingAll((previous) => (previous = false))

        setLoading((previous) => (previous = false))
      })
  }

  //get list of posts whene page start rendering
  useEffect(() => {
    fetchPosts(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () =>
      window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching])
  const handleScroll = () => {
    let bottomOfWindow =
      document.documentElement.scrollTop +
        window.innerHeight >
      document.documentElement.offsetHeight - 1

    if (bottomOfWindow && currentStep <= 49) {
      setIsFetching(true)
      setCurrentStep(currentStep + 5)
    }
  }

  const handleChangePage = (event, newPage) => {
    setLoadingAll((previous) => (previous = true))

    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <>
      {!loadingAll ? (
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
            {loading &&
              [1, 2, 3, 4, 5].map((e, i) => {
                return (
                  <Skeleton
                    sx={{ margin: 2 }}
                    variant="rectangular"
                    width={270}
                    height={500}
                  />
                )
              })}
          </Box>
          <TablePagination
            count={totalPosts}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </>
  )
}
export default Posts
