import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
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
import { staticPosts } from '../../utils/fakePosts'
import moment from 'moment'

const CardStyle = styled(Card)`
  cursor: pointer;
  :hover {
    box-shadow: -2px 0px 26px -6px rgba(0, 0, 0, 0.81);
    -webkit-box-shadow: -2px 0px 26px -6px rgba(0, 0, 0, 0.81);
    -moz-box-shadow: -2px 0px 26px -6px rgba(0, 0, 0, 0.81);
  }
`

export default function RecipeReviewCard() {
  const onePost = staticPosts.data[3]
  return (
    <Link to={`/details/${onePost.id}`}>
      <CardStyle sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={onePost?.owner?.picture}
            />
          }
          title={
            onePost?.owner?.title +
            ' , ' +
            onePost?.owner?.firstName +
            ' ' +
            onePost?.owner?.lastName
          }
          // subheader="September 14, 2016"
          subheader={
            moment(onePost?.publishDate).isValid()
              ? moment(onePost?.publishDate).format('LLL')
              : ' '
          }
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{ padding: 2 }}
        >
          {onePost?.tags?.map((tag, index) => (
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
          image={onePost?.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {onePost?.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="liks">
            <ThumbUpIcon /> {onePost?.likes}
          </IconButton>
        </CardActions>
      </CardStyle>
    </Link>
  )
}
