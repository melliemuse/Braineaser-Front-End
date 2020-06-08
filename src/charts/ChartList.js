import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import ScatterPlot from './ScatterPlot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { lightBlue, red } from '@material-ui/core/colors'
import Charts from "./Charts.css"

export default class ChartList extends Component {
    state = {
        userInterventions: [],
        interventions: [],
        interventionMap: [],
        megaArray: [],
        baseAnxietyId: [],
        baseAnxietyTimestamp: [],
        baseAnxietyScore: [],
        interventionData: [],
        baselineData: []
    }
    componentDidMount() {
        // const currentUser = localStorage.getItem("activeUser")
        APIManager.getAll("baseline?user")
            .then((baseAnxiety) => {
                const baseAnxietyId = baseAnxiety.map(anxiety => anxiety.id)
                const baseAnxietyTimestamp = baseAnxiety.map(anxiety => anxiety.timestamp)
                const baseAnxietyScore = baseAnxiety.map(anxiety => anxiety.anxietyScore)
                const baselineData = baseAnxiety.map(anxiety => {
                    const baselineData = {
                        x: anxiety.timestamp,
                        y: anxiety.anxietyScore,
                    }
                    return baselineData
                })
                this.setState({
                    baseAnxietyId: baseAnxietyId,
                    baseAnxietyTimestamp: baseAnxietyTimestamp,
                    baseAnxietyScore: baseAnxietyScore,
                    baselineData: baselineData
                })
            })
        APIManager.getAll("user_interventions?user")
            .then((interventions) => {
                const interventionMap = {}
                interventions.map(intervention => {
                    const interventionType = intervention.interventionId
                    if (`${interventionType}` in interventionMap) {
                        interventionMap[`${interventionType}`].push(intervention)
                    } else {
                        interventionMap[interventionType] = [intervention]
                    }
                })
                let megaArray = []
                Object.values(interventionMap).forEach(element => {
                    megaArray.push(element)
                });
                this.setState({
                    interventionMap: interventionMap,
                    megaArray: megaArray
                })
            })
            .then(() => {
                // create a container array with nested empty arrays- one per array in megaArray
                const interventionData = []
                for (let i = 0; i < this.state.megaArray.length; i++) {
                    interventionData.push([])
                }
                if (this.state.megaArray !== []) {
                    for (let i = 0; i < this.state.megaArray.length; i++) {
                        if (this.state.megaArray[i] !== undefined) {
                            for (let j = 0; j < this.state.megaArray[i].length; j++) {
                                const intervention = this.state.megaArray[i][j]
                                const interventionName = this.state.megaArray[i][j].intervention.name
                                const dataObject =
                                    { x: intervention.timestamp, y: intervention.anxietyScore, name: interventionName }
                                interventionData[i].push(dataObject)
                            }
                        }
                    }
                }
                this.setState({
                    interventionData: interventionData
                })
            })
    }
    render() {
        return (
            <>  
            <header id="tracker-heading">
            <h1 id="tracker-title">Anxiety Tracker</h1>
            <FontAwesomeIcon id="chart-line-icon"  icon={faChartLine} size='3x' style={{color:red}}/>
            </header>
            <div className="chart-container">
                {this.state.interventionData !== [] &&
                    this.state.interventionData.map((miniArray, i) =>
                        <ScatterPlot
                            position={i}
                            key={i}
                            interventionData={miniArray}
                            baseAnxietyId={this.state.baseAnxietyId} baseAnxietyTimestamp={this.state.baseAnxietyTimestamp}
                            baseAnxietyScore={this.state.baseAnxietyScore} baselineData={this.state.baselineData}
                        />
                    )}
            </div>
            </>
        )
    }

}
