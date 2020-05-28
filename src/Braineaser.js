import React, {Component} from 'react'
import './Braineaser.css'
import NavBar from './components/nav/NavBar'
import ApplicationViews from './components/ApplicationViews'


class Braineaser extends Component {
    state = {
        users: [],
        user: false
    }

isAuthenticated = () => localStorage.getItem("activeUser") !== null

componentDidMount() {
    this.setState({
        user: this.isAuthenticated()
    })
}

setUser = (authObj) => {
    localStorage.setItem("activeUser", JSON.stringify(authObj))
    this.setState({
        user: this.isAuthenticated
    })
}

render() {
    return(
        <>
        <NavBar user={this.state.user}/>
        <ApplicationViews user={this.state.user}
        setUser={this.setUser} isAuthenticated={this.isAuthenticated}/>
        </>
    )
}

}

export default Braineaser;