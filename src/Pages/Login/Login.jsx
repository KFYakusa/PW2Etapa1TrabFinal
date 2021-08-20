import { Button, Container, Grid, Paper, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
import styleLogin from '../../styles/styleLogin';
import api from '../../api/api';
import useAuth from '../../Hooks/useAuth';

export default function Login() {
  const classes = styleLogin();
  const [changeField, setChangeField] = useState({})
  const [redirect,setRedirect] =useState(false)
  const {
    setAuth,
  } = useAuth()
  
  function handleSingIn(event) {
    event.preventDefault()
    setRedirect(true)

    api.login(changeField).then((retornoApi)=>{
      setAuth(retornoApi.data.token)
      
    }).catch((error)=>{
      console.log(error);
    })
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
        <form onSubmit={handleSingIn}>
        <Grid align="center">
          <h2> Bem-vindo novamente</h2>
        </Grid>
        <TextField label="email" name="email" placeholder="type email here" type="email" fullWidth required onChange={handleChange} />
        <TextField label="password" name="password" placeholder="type your password here" type="password" fullWidth required onChange={handleChange} />
        {/* <Button type="submit" color="primary" variant="contained" onClick={handleSingUp} component={Link} to={'/singUp'} className={classes.submitButton}> Cadastro </Button> */}
        <Button type="submit" color="primary" variant="contained" className={classes.submitButton}> Login </Button>
        <br/>
        <Link to={'/singup'}> Não tem uma conta?</Link>
        </form>
        {redirect && <Redirect to={'/'}/> }
      </Paper>
    </Container>

  )
}

