import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class InterventionCard extends Component {



    render() {
        return (
            <>
                    <Link className="interventionLink" to={`/interventions/${this.props.intervention.id}`}>
                <div id="interventionCard">
                    <div className="intervention-icon">
                    <FontAwesomeIcon icon={this.props.intervention.icon} className="fill-gradient-linear" size='3x'/>
                    </div>
                        <h3 id="interventionName">{this.props.intervention.name}</h3>
                </div>
                    </Link>
            </>
        )
    }
}