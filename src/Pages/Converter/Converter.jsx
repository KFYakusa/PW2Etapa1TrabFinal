import React, { useEffect, useState } from 'react'
import { Button, Card, Container, FilledInput, FormControl, IconButton, Input, makeStyles, OutlinedInput, TextField, ThemeProvider } from '@material-ui/core'
import { ArrowBack, ArrowDownward, ArrowForward, ArrowRightAlt, ArrowUpward, SyncAlt } from '@material-ui/icons'
import api from '../../api/api'

export default function Converter() {
  const classes = useStyles()
  const [changeField, setChangeField] = useState({ scale: 'f' })
  const [celsiusToFahrenheit, setCelsiusToFahrenheit] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)
  const [answer, setAnswer] = useState(null)
  const breakpoint = 960

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResizeWindow)
    return () => {
      window.removeEventListener("resize", handleResizeWindow)
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    console.log(changeField);

    api.calcTemp(changeField).then((resposta) => {
      setAnswer(resposta.data.answer)
    }).catch(e => console.log(e))
  }

  function handleChange(event) {
    const target = event.target
    const value = target.value
    setChangeField({ ...changeField, number: value })
  }
  function handleScale() {
    setCelsiusToFahrenheit(!celsiusToFahrenheit)
    setChangeField({ ...changeField, scale: (celsiusToFahrenheit ? 'c' : 'f') })
  }

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>

          <TextField variant="outlined"
            name="Celsius"
            InputLabelProps={{ shrink: true }}
            placeholder={!celsiusToFahrenheit ? (answer ? answer : null) : null}
            type="number" onChange={handleChange}
            label={`Celsius` + (!celsiusToFahrenheit ? " (read Only)" : "")}
            InputProps={{ readOnly: !celsiusToFahrenheit }}
            required={celsiusToFahrenheit}
            
          />

          <div className={classes.svgDiv}>
            <IconButton onClick={handleScale} className={classes.iconButton} color="inherit" aria-label="change">
              {width > breakpoint && (celsiusToFahrenheit ? <ArrowForward fontSize="large" /> : <ArrowBack fontSize="large" />)}
              {width <= breakpoint && (celsiusToFahrenheit ? <ArrowDownward fontSize="large" /> : <ArrowUpward fontSize="large" />)}
            </IconButton>
          </div>
          <TextField 
            variant="outlined" name="Fahrenheit" 
            InputLabelProps={{ shrink: true }} 
            type="number" onChange={handleChange} 
            placeholder={celsiusToFahrenheit ? (answer ? answer : null) : null} 
            label={`Fahrenheit` + (celsiusToFahrenheit ? " (read Only)" : "")} 
            InputProps={{ readOnly: celsiusToFahrenheit }} 
            required={!celsiusToFahrenheit} />
          <Button type="submit" color="primary" variant="contained" className={classes.button} > Calcular</Button>
        </form>
      </Card>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'center',
    margin: '5vh auto',
    padding: '2vh',
    borderRadius: '10px',
    boxShadow: '1px 2px 5px black '
  },
  svgDiv: {
    marginTop: theme.spacing(1),
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  button: {
    display: 'block',
    margin: '3vh auto',
    background: 'linear-gradient(35deg, #5EC2F5 20%, #EE2222 90%  )'
  }

}))
