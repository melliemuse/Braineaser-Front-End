import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';



export default class AnxietyRating extends Component {
    state = {
        anxietyScore: "",
        description: "",
        interventionId: "",
        addDescriptionField: true,
        addSelfCareField: true,
        interventions: []
    }

    componentDidMount(event) {
        APIManager.getAll("interventions")
            .then(interventions => {
                this.setState({
                    interventions: interventions
                })
            })
    }

    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = event.currentTarget.value
        this.setState(stateToChange)
    }

    handleDropdownChange = (event) => {
        const stateToChange = {}
        stateToChange['interventionId'] = event.target.value
        this.setState(stateToChange)
    }

    createbuttons = () => {
        let buttons = []
        for (let i = 0; i < 10; i++) {
            buttons.push(
                <Button id="anxietyScore"  value={i + 1} onClick={this.handleFieldChange} key={i + 1}>{i + 1}</Button>
            )
        }
        return buttons
    }

    setBoolean = (event) => {
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = !event.currentTarget.id
        this.setState(stateToChange)
    }

    createAnxietyRating = () => {
        if (this.state.anxietyScore === "") {
            alert("Please select an anxiety score")
        } else if (this.state.interventionId === "") {
            const anxiety = {
                "anxietyScore": parseInt(this.state.anxietyScore),
                "timestamp": new Date(),
                "userId": parseInt(localStorage.getItem("activeUser")),
                "description": this.state.description
            }
            APIManager.post("baselineAnxietyScores", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        } else {
            const anxiety = {
                "userId": parseInt(localStorage.getItem("activeUser")),
                "interventionId": parseInt(this.state.interventionId),
                "timestamp": new Date(),
                "anxietyScore": parseInt(this.state.anxietyScore),
                "description": this.state.description
            }
            APIManager.post("userInterventions", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        }
    }

    render() {
        return (
            <div className="main text-center homeMain">
                <div  className="main-container">
                <header className="header">
                <h1 id="anxiety-rating-welcome">Welcome to Braineaser</h1>
                {/* <Divider id="divider" variant="middle" /> */}
                
                <img id="main-logo" alt="logo" src={require('../assets/logo.png')}></img>
                </header>
                <article id="anxiety-rate-container">
                    <div id="subhead" className="subhead center"> 
                    <h2 id="anxiety-rating-scale">How is Your Anxiety?</h2> 
                    <h3 id="scale-subhead">(on a scale from one to ten)</h3>
                    </div>
                    <div className="rating-buttons">
                        <div id="rating-button-group">
                        {this.createbuttons()}
                        </div>
                        </div>
                        <footer className="footer-buttons">
                        <div className="descriptionField" hidden={this.state.addDescriptionField}>
                            <TextField variant="outlined" color="secondary"
                                id="description"
                                hidden={this.state.addDescriptionField}
                                onChange={this.handleFieldChange}
                            /> </div>
                            <ButtonGroup className="button-group" variant="contained" >
                                <Button
                                    id="addDescriptionField"
                                    name="addDescriptionField"
                                    className="button"
                                    color="primary"
                                    onClick={this.setBoolean}
                                >Add Description</Button>
                                <Button
                                color="primary"
                                    id="addSelfCareField"
                                    className="button"
                                    onClick={this.setBoolean}
                                >Log Self-Care</Button>
                            </ButtonGroup>
                            <div hidden={this.state.addSelfCareField}>
                                <FormControl id="dropdown">
                                    <Select id="interventionId" name="interventionId" hidden={this.state.addSelfCareField} onChange={this.handleDropdownChange}>
                                        {this.state.interventions.map(intervention => {
                                            console.log(intervention)
                                            return <MenuItem key={intervention.id} value={intervention.id}>{intervention.name}
                                            </MenuItem>
                                        }
                                        )}
                                    </Select>
                                </FormControl>
                            </div>
                            
                            <div>
                                <Button
                                    variant="contained"
                                    className="button submit"
                                    id="submit-rating"
                                    color="primary"
                                    onClick={this.createAnxietyRating}
                                >Submit Rating
                </Button>
                            </div>
                            </footer>
                </article>
                </div>
                    </div>
                
        )
    }
}