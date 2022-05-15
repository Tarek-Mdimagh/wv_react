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

export default function RecipeReviewCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{ padding: 2 }}
      >
        <Chip
          label="primary"
          color="primary"
          variant="outlined"
        />
        <Chip
          label="success"
          color="success"
          variant="outlined"
        />
      </Stack>

      <CardMedia
        component="img"
        height="194"
        image="https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and
          a fun meal to cook together with your guests. Add
          1 cup of frozen peas along with the mussels, if
          you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="liks">
          <ThumbUpIcon /> 12
        </IconButton>
      </CardActions>
    </Card>
  )
}