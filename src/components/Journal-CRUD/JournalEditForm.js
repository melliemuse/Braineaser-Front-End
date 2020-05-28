import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import Button from '@material-ui/core/Button';

export default class JournalEditForm extends Component {
    state = {
        prompt: "",
        entry: "",
        promptId: "", 
        timestamp: ""
    }
    componentDidMount() {
        APIManager.getWith("journals", this.props.match.params.journalId, "prompt")
            .then(journal => {
                this.setState({
                    entry: journal.entry,
                    prompt: journal.prompt.prompt,
                    promptId: journal.prompt.id,
                    timestamp: journal.timestamp
                })
            })
    }
    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = event.currentTarget.value
        this.setState(stateToChange)
    }
    createUpdatedEntry = event => {
        event.preventDefault()
        if (this.state.entry === "") {
            window.alert("Please enter a change before hitting submit")
        } else {
            const entry = {
                id: Number(this.props.match.params.journalId),
                userId: parseInt(localStorage.getItem("activeUser")),
                entry: this.state.entry,
                promptId: this.state.promptId,
                timestamp: this.state.timestamp
            }
            APIManager.update("journals", entry)
            .then(() => this.props.history.push("/journal/entries"))
        }
    }

    render() {
        console.log("this.state", this.state)
        return (
            <div className="main">
                <h1>Edit Journal Entry</h1>
                <h3 className="center-text">{this.state.prompt}</h3>
                <form>
                    <fieldset>
                        <input 
                        className="center"
                            id="entry"
                            type="text"
                            value={this.state.entry}
                            onChange={this.handleFieldChange}
                        />
                        <div className="button align-left">
                            <Button
                            color="primary"
                            variant="contained"
                            onClick={this.createUpdatedEntry}
                            >Submit</Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}