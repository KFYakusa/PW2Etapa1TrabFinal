
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute  from './PrivateRoute'
import Home from '../Pages/Home/Home'
import Profile from '../Pages/Profile/Profile'
import Login from '../Pages/Login/Login'
import List from '../Pages/List/List'
import Edit from '../components/Edit/Edit'
import useAuth from '../Hooks/useAuth'

export default function Routes() {
    const {
        list,setList
    } = useAuth()

    const handleEdit = (eObject) => {
        let renewList = list.map((item) => {
            if (eObject.id === item.id) item = eObject
            return item
        })
        setList(renewList)
    }

    return (
        <Switch>
            <Route exact path="/" render={()=><Home/>}/>
            <Route exact path="/login" render={()=><Login/>}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/manutencoes" component={List}/>
            <PrivateRoute exact path="/manutencoes/:id" component={(propList)=>{
                const objeto = list.find(obj => obj.id === Number(propList.match.params.id))
                return <Edit item={objeto} editor={handleEdit}/> 
            }}/>
            <Route path="/" render={()=><Home/>}/>
        </Switch>
    )
}
