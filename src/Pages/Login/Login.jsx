import { Button, Container, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const {
    setAuth,
  } = useAuth()

  function handleSingIn() {
    setAuth({ user: username, password: pass })
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <Grid align="center">
          <h2> Entre em nosso site</h2>
        </Grid>
        <TextField label="usuário" placeholder="type user here" fullWidth required onChange={(event) => { setUsername(event.target.value) }} />
        <TextField label="password" placeholder="type your password here" type="password" fullWidth required onChange={(event) => setPass(event.target.value)} />
        <Button type="submit" color="primary" variant="contained" onClick={handleSingIn} component={Link} to={'/'} className={classes.submitButton}> Cadastro </Button>
      </Paper>
    </Container>

  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    height: '70vh',
    width: 280,
    margin: "2vh auto"
  },
  submitButton: {
    margin: '8px 2vh'
  }
}))
