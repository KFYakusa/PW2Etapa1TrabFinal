import { Button, Card, CardContent, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useHistory  } from 'react-router-dom'

export default function Edit(props) {
    const history = useHistory();
    const classes = useStyles()
    // const [drop,setDrop] = useState(false)
    const [valueForm,setValueForm] =useState(props.item? props.item : {id:null, nome:"",descricao:"",url:"" })
    
    function editar(e){    
        e.preventDefault()
        props.editor(valueForm)
        // setDrop(true)
        history.push("/manutencoes")
    }
    
    return (
        <Card className={classes.card}>
            <form onSubmit={(e)=>{editar(e); }}>
            <CardContent>
                <TextField 
                    label="Nome" 
                    fullWidth 
                    defaultValue={valueForm.nome} 
                    name="nome" 
                    onChange={(event) => setValueForm({ ...valueForm, nome: event.target.value })} 
                />
                <TextField 
                    label="Descrição" 
                    fullWidth 
                    defaultValue={valueForm.descricao} 
                    name="descricao" 
                    onChange={(event) => setValueForm({ ...valueForm, descricao: event.target.value })} 
                />
                <TextField 
                    label="Url" 
                    fullWidth 
                    defaultValue={valueForm.url} 
                    name="url" 
                    onChange={(event) => setValueForm({ ...valueForm, url: event.target.value })} 
                />
                <Button component={Link} to={'/manutencoes'}>Cancel</Button>
                <Button type="submit" >Confirm</Button>
            </CardContent>
            </form>
        </Card>
    )
}

const useStyles = makeStyles(()=>({
   card: {
       width: '50vh',
       margin: '2vh auto'
   } 
}))