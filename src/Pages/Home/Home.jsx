import { Card, CardContent, CardMedia, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import useAuth from '../../Hooks/useAuth'

export default function Home() {
  const classes = useStyles()
  const {
    list,
  } = useAuth()

  return (
    <Container>
      {list && (list.map((item) => (
        <Card className={classes.card}>
          <CardMedia component="img" alt={item.nome} image={item.url} className={classes.media} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.nome}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.descricao}
            </Typography>
          </CardContent>
        </Card>
      )))}
    </Container>
  )
}

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    height: '300px',
    display: 'inline-block',
    marginLeft: '2vh',
    marginTop: '2vh',
  },
  media: {
    height: '200px',
    justifyContent: 'center',
    textAlign: 'center',
  }
})
