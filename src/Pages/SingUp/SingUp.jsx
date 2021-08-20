import React, { useState } from 'react'
import styleLogin from '../../styles/styleLogin'
import { Button, Container, Grid, Paper, TextField } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom';
import api from '../../api/api';
import { setDefaultHandler } from 'workbox-routing';
import useAuth from '../../Hooks/useAuth';


export default function SingUp() {

  const classes = styleLogin()
  const [changeField, setChangeField] = useState({})
  const [redirect,setRedirect] = useState(false)
  const {
    auth, setAuth
  } = useAuth()

  function handleSingUp(event){
    event.preventDefault()
    console.log(changeField);
    setRedirect(true)
    
    api.singUp(changeField).then((retornoApi)=>{
      console.log(retornoApi);
      setAuth(retornoApi.data.token)
      
      
    }).catch(e=>console.log(e))
  }

  function handleChange(event){
    const target = event.target
    const value = target.value
    const name = target.name
    setChangeField({...changeField, [name]:value})

  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Paper elevation={5} className={classes.paper}>
        <form onSubmit={handleSingUp}>
        <Grid align="center">
          <h2> Novo no site?!</h2>
        </Grid>
        <TextField label="email" name="email" placeholder="Email" type="email" fullWidth required onChange={handleChange } />
        <TextField label="password" name="password" placeholder="type your password here" type="password" fullWidth required onChange={handleChange} />
        <TextField label="username" name="username" placeholder="digite o nome do usuário" fullWidth required onChange={handleChange} />
        <Button type="submit" color="primary" variant="contained" className={classes.submitButton}> Cadastro </Button>
        <br/>
        <Link to={'/login'}> Já tem uma conta?</Link>
        </form>

        {redirect && <Redirect to={"/"}/> }
      </Paper>
    </Container>
  )
}
