import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import Button from '@material-ui/core/Button'

export default class Login extends Component {
    state = {
        password: "",
        username: "",
        users: [],
        noSuchUser: false
    }

    componentDidMount() {
        APIManager.getAll("users")
        .then(users => {
            this.setState({
                users: users
            })
            console.log(this.state.users)
        })
    }

    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = event.currentTarget.value
        this.setState(stateToChange)
        console.log("state", this.state)
    }

    submitForm = (event) => {
        event.preventDefault()
        console.log("submit form function executes")
        this.state.users.map(user =>
            {if (user.username === this.state.username && user.password === this.state.password) {
            APIManager.getUserBy("users", this.state.username, this.state.password)
                .then(user => {
                    {this.props.setUser(user[0].id)}
                })
                } else {
                    this.setState({noSuchUser: true})
                }
            } 
        )
        {if (this.state.noSuchUser === true) {
            window.alert("Please enter credentials for an existing account")
        }}
    }

    render() {
        console.log(this.props)
        return (
            <div className="main text-center">
                <h2>Login</h2>
                <form onSubmit={this.submitForm}>
                    <fieldset>
                        <input
                            id="username"
                            placeholder="Username"
                            onChange={this.handleFieldChange}
                        />
                        <div>

                        <input
                            placeholder="Password"
                            id="password"
                            onChange={this.handleFieldChange}
                        />
                        </div>
                        <Button type="submit">Login</Button>
                    </fieldset>
                </form>
            </div>
        )
    }
}
