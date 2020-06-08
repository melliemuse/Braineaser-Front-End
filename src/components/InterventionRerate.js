import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Button from '@material-ui/core/Button';
import "./InterventionRerate.css"

export default class InterventionRerate extends Component {
    state = {
        anxiety_score: "",
        description: "",
        interventionId: ""
    }
    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = event.currentTarget.value
        this.setState(stateToChange)
    }
    createbuttons = () => {
        let buttons = []
        for (let i = 0; i < 10; i++) {
            buttons.push(
                <Button className="rerateAnxietyScore" id="anxiety_score" value={i + 1} onClick={this.handleFieldChange} key={i + 1}>{i + 1}</Button>
            )
        }
        return buttons
    }
    createAnxietyRating = () => {
        console.log(this.props.interventions[this.props.interventions.length - 1].id)
        if (this.state.anxiety_score === "") {
            alert("Please select an anxiety score")
        } else {
            const anxiety = {
                // "userId": parseInt(localStorage.getItem("activeUser")),
                "intervention": parseInt(this.props.intervention.id),
                // "timestamp": this.props.interventions[this.props.interventions.length - 1].timestamp,
                "anxiety_score": parseInt(this.state.anxiety_score),
                "description": this.state.description,
                "id": Number(this.props.interventions[this.props.interventions.length - 1].id)
            }
            console.log("anxiety rerate object", anxiety)
            APIManager.update("user_interventions", anxiety)
                .then(() => {
                    APIManager.get("user_interventions", anxiety.id)
                    .then((response) => console.log(response))
                })
                
                
                // .then(response => console.log(response))
                // .then(anxiety.anxiety_score > 3 ? this.props.history.push("/interventions") : this.props.history.push("/charts"))
        }
    }

    render() {
        console.log("all returned ints of type", this.props.interventions)
        console.log("last completed int of type", this.props.interventions[this.props.interventions.length - 1])
        // console.log([this.state.interventions[length-1].id])
        return (
            <div className="center">
                <h2 className="rerate-heading heading center-text">You have completed {this.props.intervention.name.toLowerCase()}!</h2>
                <div className="box">
                    <h3 className="rerate-subheading heading center-text">How is your anxiety now?</h3>
                    <div id="rerating-button-group">
                        {this.createbuttons()}
                    </div>
                    <div className="description-rerate center">
                        <input
                            id="description"
                            hidden={this.state.addDescriptionField}
                            onChange={this.handleFieldChange}
                        />
                        <div >
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={this.createAnxietyRating}
                            >Submit Rating
                </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}