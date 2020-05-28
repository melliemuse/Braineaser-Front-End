import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


export default class ScatterPlot extends Component {
    state = {
        data: {},
        labels: [],
        datasets: []
    }
    // generateColor() {
    //     const components = '0123456789ABCDEF'.split('');
    //     let color = '#';
    //     for (let i = 0; i < 6; i++) {
    //         color += components[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }
    buildChartData = () => {
        let toSortBaseline = this.props.baselineData.sort()
        let toSortInt = this.props.interventionData.sort()
        let simplifiedDates = []
        let simplifiedDatesInt = []
        let simplifiedObj = {}
        let simplifiedObjInt = {}
        let simplifiedArrayBaseline = []
        let simplifiedArrayInt = []
        for (let i = 0; i < toSortBaseline.length; i++) {
            let simplifiedDate = toSortBaseline[i].x.split("T")[0]
            let score = toSortBaseline[i].y
            simplifiedDates.push(simplifiedDate)
            simplifiedObj = {
                x: simplifiedDate,
                y: score
            }
            simplifiedArrayBaseline.push(simplifiedObj)
        }
        for (let i = 0; i < toSortInt.length; i++) {
            let simplifiedDateInt = toSortInt[i].x.split("T")[0]
            let score = toSortInt[i].y
            if(score !== "") {
                simplifiedDatesInt.push(simplifiedDateInt)
                simplifiedObjInt = {
                    x: simplifiedDateInt,
                    y: score
                }
            }
             simplifiedArrayInt.push(simplifiedObjInt)
            
            console.log(simplifiedArrayInt)
        }

        let sortedData = []
        const test2 = new Set(simplifiedDates);
        const testArray2 = [...test2];
        for (let i = 0; i < testArray2.length; i++) {
            let data = simplifiedArrayBaseline.find(array => array.x === testArray2[i])
            sortedData.push(data)
        }
        let sortedIntData = []
        const intSet = new Set(simplifiedDatesInt);
        const intArray = [...intSet];
        for (let i = 0; i < intArray.length; i++) {
            let data = simplifiedArrayInt.find(array => array.x === intArray[i])
            sortedIntData.push(data)

        }
        let finalBaselineArray = []
        let finalBaselineDates = []
        for (let i = 0; i < intArray.length; i++) {
            let data = sortedData.find(array => array.x === intArray[i])
            if (data !== undefined && data.y !== "") {
                finalBaselineArray.push(data)
            }
        }
        finalBaselineArray.forEach(baselineItem => finalBaselineDates.push(baselineItem.x))
        let finalIntArray = []
        let finalIntDates = []
        for (let i = 0; i < finalBaselineDates.length; i++) {
            let data = sortedIntData.find(array => array.x === finalBaselineDates[i])
            if (data !== undefined && data.y !== "") {
                finalIntArray.push(data)
            }
        }
        finalIntArray.forEach(intItem => finalIntDates.push(intItem.x))

        console.log(finalIntArray)
    const datasets =
        [
            {
                label: this.props.interventionData[0].name,
                backgroundColor: 'rgba(59, 243, 255, 0)',
                borderColor: 'rgba(59, 196, 255 )',
                borderWidth: 5,
                data: finalIntArray
            },
            {
                label: 'Base Anxiety',
                backgroundColor: 'rgba(210, 100, 200 , 0)',
                borderColor: 'rgba(179, 55, 168)',
                borderWidth: 5,
                data: finalBaselineArray
            }
        ]
        this.setState({
            datasets: datasets,
            data: datasets,
            labels: finalBaselineDates
        })

    }


render() {
    return (
        <div
            onMouseOver={() => this.props !== [] ?
                this.buildChartData()
                : null}
        >
            <Line
                id="chart"
                data={this.state}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: this.props.interventionData[0].name,
                        fontSize: 40,
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                source: 'data',
                                beginAtZero: true,
                                fontSize: 80
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize: 30
                            }
                        }],

                        xAxes: [{
                            ticks: {
                                fontSize: 30,
                                fontColor: '#666',
                            }
                        }],
                    },
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                source: 'data',
                                beginAtZero: true,
                            }
                        }],
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            fontSize: 25
                        }
                    }

                }}
            />
        </div>
    );
}
}
