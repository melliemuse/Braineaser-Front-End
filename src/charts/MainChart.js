import React, { Component, useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

export default class MainChart extends Component {
    state = {
        data: {},
        labels: [],
        datasets: []
    }
    buildChartData = () => {

        // Trying to get all anxiety scores and maybe timestamps into their own arrays by intervention type
        const mainAnxietyArray = []
        for (let i = 0; i <= this.props.megaArray.length; i++) {
            // debugger
            const eachScoreArray = []
            this.props.megaArray.forEach(eachArray => {
                console.log("each array", eachArray)
                if (eachArray) {
                    eachArray.forEach(entry => {
                        eachScoreArray.push(entry.anxietyScore)
                        console.log("each score array", eachScoreArray)

                    })
                }
            })
            mainAnxietyArray.push(eachScoreArray)
            console.log(mainAnxietyArray)


            // Trying to get all anxiety scores and maybe timestamps into their own arrays by intervention type
            // const mainAnxietyArray = []
            // for (let i = 0; i <= this.props.megaArray.length; i++) {
            //     // debugger
            //     const eachScoreArray = []
            //     this.props.megaArray.forEach(eachArray => {
            //         console.log("each array", eachArray)
            //         if (eachArray) {
            //             eachArray.forEach(entry => {
            //                 console.log(entry.anxietyScore)

            //
            // const interventionType = entry.interventionId
            // if (`${interventionType}` in eachScoreArray) {
            //     // console.log("True", interventionType)
            //     interventionMap[`${interventionType}`].push(intervention)
            // } else {
            //     // console.log("False", interventionType)
            //     interventionMap[interventionType] = [intervention]
            //     console.log("intervention map", interventionMap)
            // }
            //
            // if (entry.interventionId === i+1) {

            // }
            //         eachScoreArray.push(entry.anxietyScore)
            //         console.log("each score array", eachScoreArray)

            //     })
            // }
            // })
            // mainAnxietyArray.push(eachScoreArray)
            // console.log(mainAnxietyArray)

            // }
            let dates = this.props.baseAnxietyTimestamp.map(date => {
                console.log("TIMESTAMPS", date)
                let dateObj = new Date(date)
                // let month = dateObj.getMonth()
                // let date = dateObj.getDate()
                // let day = dateObj.getDay()
                return dateObj.toDateString()
            })

            let colors = ['rgba(50, 133, 168,1)', 'rgba(75,192,192,1)', 'rgba(179, 55, 168)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)']
            const datasets =
                [
                    {
                        label: 'Base Anxiety',
                        backgroundColor: 'rgba(179, 55, 168)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: this.props.baseAnxietyScore
                    }
                    // {
                    //     label: this.props.megaArray[0][0].intervention.name,
                    //     backgroundColor: 'rgba(224, 47, 80)',
                    //     borderColor: 'rgba(0,0,0,1)',
                    //     borderWidth: 2,
                    //     data: [{ t: "1800-12-10T17:26:42.169Z", y: 4 }, { t: "2019-12-10T17:26:42.169Z", y: 6 }, { t: "1927-03-027", y: 10 }, { t: "2047-02-04", y: 1 }, { t: "2050-12-04", y: 8 }]
                    // },
                    // {
                    //     label: 'Test',
                    //     backgroundColor: 'rgba(224, 47, 80)',
                    //     borderColor: 'rgba(0,0,0,1)',
                    //     borderWidth: 2,
                    //     data: [{ t: "1800-12-10T18:26:42.169Z", y: 4 }]
                    // },
                    // {
                    //     label: 'Different',
                    //     backgroundColor: 'rgba(224, 47, 80)',
                    //     borderColor: 'rgba(0,0,0,1)',
                    //     borderWidth: 2,
                    //     data: [{ t: "2605-12-10T18:26:42.169Z", y: 15 }, null, { t: "2605-12-10T18:26:42.169Z", y: 15 }]
                    // },
                    // {
                    //     label: 'Meditation',
                    //     backgroundColor: 'rgba(224, 47, 80)',
                    //     borderColor: 'rgba(0,0,0,1)',
                    //     borderWidth: 2,
                    //     data: this.props.baseAnxietyScore
                    // },
                    // {
                    //     label: 'Meditation',
                    //     backgroundColor: 'rgba(224, 47, 80)',
                    //     borderColor: 'rgba(0,0,0,1)',
                    //     borderWidth: 2,
                    //     data: this.props.baseAnxietyScore
                    // }
                ]
            this.setState({
                datasets: datasets,
                data: datasets,
                labels: dates
            })
        }
    }

    render() {
        return (
            <div 
            onMouseOver={() => this.props !== [] ?
                this.buildChartData()
                : null}
            >

                <Bar
                    data={this.state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: 'Base Anxiety',
                            fontSize: 20,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        source: 'data'
                                    },
                                }],
                                xAxes: [{
                                    parser: "HH:mm",
                                    distribution: 'series',
                                    bounds: 'ticks',
                                    ticks: {
                                        source: 'data'
                                    },
                                    type: 'time',
                                    time: {
                                        unit: 'day'
                                    }
                                }]
                            }
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}

                />
            </div>
        );
    }
}
