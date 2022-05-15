import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
// import { staticPosts } from '../../utils/fakePosts'
import moment from 'moment'

const CardStyle = styled(Card)`
  cursor: pointer;
`

export default function Details({ postId }) {
  const [postInfo, setPost] = useState()
  // let params = useParams();
  //get post details whene page start rendering
  useEffect(() => {
    fetch(`https://dummyapi.io/data/v1/post/${postId}`, {
      headers: { 'app-id': '627b956fb058dc4fa16fa1b9' },
    })
      .then((response) => response.json())
      .then((json) => setPost(json.data))
    // eslint-disable-next-line
  }, [])
  return (
    <Container maxWidth="lg">
      <Link to={`/posts`}>Retour</Link>
      <CardStyle sx={{ maxWidth: '90%' }}>
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
      </CardStyle>
    </Container>
  )
}
