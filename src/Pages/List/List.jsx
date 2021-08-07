import React, { useState } from 'react'
import useAuth from '../../Hooks/useAuth'
import { Container, Button, Card, CardContent, CardMedia, Fab, TextField, Typography, makeStyles, Modal } from '@material-ui/core'
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'

export default function List() {
	const [open, setOpen] = useState(false)
	const [valueForm, setValueForm] = useState({ id: null, nome: "", descricao: "", url: "" })
	const classes = useStyles()
	const {
		list, setList,
		cod, setCod
	} = useAuth()


	const handleDelete = (item) => {
		console.log(item);
		if (window.confirm("certeza que quer remover este filme da sua lista?")) {
			setList(list.filter(l => l.id !== item.id))
		}
	}

	const handleNewItem = (novoItem) => {
		novoItem.id = cod + 1
		setCod(cod + 1)
		const newList = [novoItem, ...list]
		setList(newList)
	}

	return (
		<Container>
			{list && (list.map((item) => (
				<Card className={classes.card} key={item.id}>
					<CardMedia component="img" alt={item.nome} image={item.url} className={classes.media} />
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{item.nome}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{item.descricao}
						</Typography>
					</CardContent>
					<Button onClick={() => { handleDelete(item) }} color="secondary"> <DeleteIcon /> </Button>
					<Button component={Link} to={`/manutencoes/${item.id}`}> <EditIcon /> </Button>
				</Card>
			)))}
			<Fab color="primary" aria-label="add" className={classes.addButton} onClick={() => { setOpen(true) }} >
				<AddIcon />
			</Fab>
			<Modal open={open} onClose={() => { setOpen(false) }} >
				<div className={classes.paper}>
					<TextField label="Nome" variant="filled" placeholder="novo item" fullWidth required onChange={(event) => setValueForm({ ...valueForm, nome: event.target.value })} />
					<TextField label="Descrição" variant="filled" placeholder="Descricao" fullWidth required onChange={(event) => setValueForm({ ...valueForm, descricao: event.target.value })} />
					<TextField label="Url" variant="filled" placeholder="URL da imagem" fullWidth required onChange={(event) => setValueForm({ ...valueForm, url: event.target.value })} />
					<Button onClick={() => { handleNewItem(valueForm); setOpen(false) }}>Confirm</Button>
				</div>
			</Modal>
		</Container>
	)
}

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 345,
		minHeight: '300px',
		display: 'inline-block',
		marginLeft: '2vh',
		marginBottom: '1vh',
		marginTop: '1vh'
	},
	media: {
		height: '180px',
	},
	addButton: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	},
	paper: {
		position: 'absolute',
		width: '50vw',
		borderRadius: '10px',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50vh',
		left: '50vw',
		transform: `translate(-50%, -50%)`,
	},
}))