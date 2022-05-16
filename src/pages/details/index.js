import { useEffect, useState } from 'react'
// import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { Link, useParams } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
// import { staticPosts } from '../../utils/fakePosts'
import moment from 'moment'
import CircularProgress from '@mui/material/CircularProgress'
import { TextField } from '@mui/material'
import axios from 'axios'

export default function Details() {
  const [postInfo, setPost] = useState()
  const [comments, setComments] = useState(null)
  const [loading, setLoading] = useState(false)
  const [commentInput, setCommentInput] = useState(null)

  let { postID } = useParams()
  //get post details whene page start rendering
  useEffect(() => {
    setLoading((previous) => (previous = true))
    fetch(`https://dummyapi.io/data/v1/post/${postID}`, {
      headers: { 'app-id': '627b956fb058dc4fa16fa1b9' },
    })
      .then((response) => response.json())
      .then((json) => {
        setPost(json)
        setLoading((previous) => (previous = false))
      })
    // eslint-disable-next-line
  }, [])
  //get list of comment by post
  useEffect(() => {
    getCommentList()
    // eslint-disable-next-line
  }, [])
  const getCommentList = () => {
    setLoading((previous) => (previous = true))
    fetch(
      `https://dummyapi.io/data/v1/post/${postID}/comment`,
      {
        headers: { 'app-id': '627b956fb058dc4fa16fa1b9' },
      },
    )
      .then((response) => response.json())
      .then((json) => {
        setComments(json?.data)
        setLoading((previous) => (previous = false))
      })
  }
  const submitComment = (value, event) => {
    event.preventDefault()

    axios
      .post(
        `https://dummyapi.io/data/v1/comment/create`,
        {
          message: value,
          owner: '60d0fe4f5311236168a109ca',
          post: postID,
        },
        {
          headers: {
            'app-id': '627b956fb058dc4fa16fa1b9',
          },
        },
      )
      .then((res) => {
        getCommentList()
        console.log(res)
      })
  }
  const deleteComenet=(commmenet)=>{
    axios
    .delete(
      `https://dummyapi.io/data/v1/comment/${commmenet}`,
    
      {
        headers: {
          'app-id': '627b956fb058dc4fa16fa1b9',
        },
      },
    )
    .then((res) => {
      getCommentList()
      console.log(res)
    })
  }
  return !loading ? (
    <Container maxWidth="lg">
      <Link to={`/`}>
        <KeyboardBackspaceIcon
          sx={{ float: 'left', width: 60 }}
        />
      </Link>
      <Box sx={{ maxWidth: '90%' }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={postInfo?.owner?.picture}
            />
          }
          title={
            postInfo?.owner?.title +
            ' , ' +
            postInfo?.owner?.firstName +
            ' ' +
            postInfo?.owner?.lastName
          }
          // subheader="September 14, 2016"
          subheader={
            moment(postInfo?.publishDate).isValid()
              ? moment(postInfo?.publishDate).format('LLL')
              : ' '
          }
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{ padding: 2 }}
        >
          {postInfo?.tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>

        <CardMedia
          component="img"
          height="194"
          image={postInfo?.image}
          alt="Paella dish"
          sx={{ 'object-fit': 'contain' }}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {postInfo?.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="liks">
            <ThumbUpIcon /> {postInfo?.likes}
          </IconButton>
        </CardActions>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          commentaires
        </Typography>
        {comments?.map((comment,index) => (
          <Box key={index}  sx={{
            position:"relative",
          }}>
            <CardHeader
              sx={{
                textAlign: 'left',
                'border-top': '1px solid black',
                ' border-bottom': '1px solid black',
              }}
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={comment?.owner?.picture}
                />
              }
              title={comment?.message}
              // subheader="September 14, 2016"
              subheader={
                moment(comment?.publishDate).isValid()
                  ? moment(comment?.publishDate).format(
                      'LLL',
                    )
                  : ' '
              }
            ></CardHeader>
            <Typography
              hidden={comment.owner.id!=="60d0fe4f5311236168a109ca"}
            sx={{
              position:"absolute",
              right:2,
              top:2,
              cursor:"pointer"
            }}
              variant="body2"
              color="secondary"
              onClick={()=>deleteComenet(comment.id)}
            >
              Delete
            </Typography>
          </Box>
        ))}

        <TextField
          sx={{ margin: 2 }}
          fullWidth
          id="outlined-basic"
          label="Ajouter un comentaire"
          variant="outlined"
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              submitComment(commentInput, event)
            }
          }}
        />
      </Box>
    </Container>
  ) : (
    <CircularProgress />
  )
}
