import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import InterventionRerate from './InterventionRerate'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './InterventionDetails.css'

export default class InterventionDetails extends Component {
    state = {
        interventions: {},
        intervention: [],
        displayRerate: false,
        completedSelfCare: {},
        imageUrl: "",
        user: []
    }

    componentDidMount() {
        APIManager.get("interventions", this.props.match.params.interventionId)
            .then(intervention => {
                this.setState({
                    intervention: intervention
                })
            })
            .then(() => APIManager.get("clients")
            .then(user => {
                console.log("user", user)
                this.setState({
                    user: user
                })
            })
    }

    handleClick = () => {
        const currentUser = localStorage.getItem("activeUser")
        const completedSelfCare = {
            // userId: parseInt(currentUser),
            // timestamp: new Date(),
            interventionId: this.state.intervention.id,
            description: "",
            anxietyScore: ""
        }
        APIManager.post("userInterventions", completedSelfCare)
            .then(intervention => APIManager.get("userInterventions", intervention.id)
                .then(interventions => {
                    this.setState({
                        interventions: interventions
                    })
                }))
            .then(this.setState({
                displayRerate: !this.state.displayRerate
            }))
    }

    // Uploading images to Cloudinary: https://cloudinary.com/blog/how_to_build_an_image_library_with_react_cloudinary#uploading_images

    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: "dwjgfd51f", upload_preset: "yt2dp2iy", tags: ['inner_child'] },
            (error, result) => {
                if (result) {
                    console.log("result", result);
                    console.log("https://res.cloudinary.com/dwjgfd51f/image/upload/v1577143497/" + result[0].public_id)
                    this.setState({
                        imageUrl: `https://res.cloudinary.com/dwjgfd51f/image/upload/v1577143497/${result[0].public_id}`
                    }, () => this.updateImage())
                }
            })
    }


    updateImage = () => {
        const user = {
            // id: this.state.user.id,
            username: this.state.user.username,
            email: this.state.user.email,
            password: this.state.user.password,
            inner_child_image: this.state.imageUrl
        }
        APIManager.update("users", user)
            .then(() => APIManager.get("users", user.id))
            .then(user => this.setState({ user: user }))
    }



    render() {
        console.log(this.state.intervention)
        return (
            <>
                <article className="intervention-details main">
                    <h1 id="intervention-title">{this.state.intervention.name}</h1>
                    {this.state.user.inner_child_image &&
                        this.state.intervention.id === 6 &&
                        <img src={this.state.user.inner_child_image} alt="inner child picture" className="inner-child-image"></img>
                    }
                    <div className="intervention-description">
                        {this.state.intervention.description !== undefined &&
                            <p className="intervention-description">{this.state.intervention.description.split('\n').map(function (item, key) {
                                return (
                                    <span className="new-line" key={key}>
                                        {item}
                                        <br />
                                    </span>
                                )
                            })}</p>}
                    </div>
                    <div className="intervention-instructions">
                        <h3 id="intervention-instructions-title" className="center-text">Instructions</h3>
                        {this.state.intervention.instructions !== undefined &&
                            <p className="intervention-instructions">{this.state.intervention.instructions.split('\n').map(function (item, key) {
                                return (
                                    <span className="new-line" key={key}>
                                        {item}
                                        <br />
                                    </span>
                                )
                            })}</p>}
                    </div>
                    <ButtonGroup variant="contained" className="button-group" id="button-group" color="secondary" aria-label="outlined button group">
                        <Button
                            onClick={() => {
                                this.props.history.push("/interventions")
                            }}> Back to Interventions
                    </Button>
                        <Button
                            onClick={() => {
                                if (this.state.intervention.id === 7) {
                                    this.props.history.push("/journal")
                                } else {
                                    this.handleClick()
                                }
                            }}>Complete this intervention!
                        </Button> </ButtonGroup>
                    {this.state.intervention.id === 6 &&
                        <div>
                            <img className="uploadImage center" src={this.state.imageUrl} alt="" />
                            <div className="center-button">
                            <Button
                            variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.uploadWidget()
                                    { this.state.imageUrl && this.updateImage() }
                                }}>Add Inner Child Image
                            </Button>
                            </div>
                        </div>}
                    {this.state.displayRerate &&
                        <InterventionRerate intervention={this.state.intervention}
                            interventions={[this.state.interventions]} {...this.props} />}
                </article>
            </>
        )
    }
}