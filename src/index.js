import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import Braineaser from './Braineaser';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'
import { faOm } from '@fortawesome/free-solid-svg-icons'
import { faParagraph} from '@fortawesome/free-solid-svg-icons'
import { faCat } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHiking } from '@fortawesome/free-solid-svg-icons'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faSpa } from '@fortawesome/free-solid-svg-icons'
import { faMountain } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faFeather } from '@fortawesome/free-solid-svg-icons'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faIceCream } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faHands } from '@fortawesome/free-solid-svg-icons'
import { faFan } from '@fortawesome/free-solid-svg-icons'
import { faVihara} from '@fortawesome/free-solid-svg-icons'
import { faBiking} from '@fortawesome/free-solid-svg-icons'


library.add(faBook)
library.add(faWalking)
library.add(faOm)
library.add(faParagraph)
library.add(faCat)
library.add(faWind)
library.add(faHeart)
library.add(faHiking)
library.add(faFingerprint)
library.add(faEye)
library.add(faSpa)
library.add(faMountain)
library.add(faComments)
library.add(faComment)
library.add(faEdit)
library.add(faFeather)
library.add(faFeatherAlt)
library.add(faHandHoldingHeart)
library.add(faHandsHelping)
library.add(faChartLine)
library.add(faIceCream)
library.add(faBookOpen)
library.add(faHands)
library.add(faFan)
library.add(faVihara)
library.add(faBiking)
// library.add()

const theme = createMuiTheme({
    palette: {
        common: {
            black: "#000", white: "#fff"
        },
        secondary: {
            light: "rgba(108, 89, 244, 1)",
            main: "rgba(163, 59, 255, 1)",
            dark: "rgba(84, 29, 133, 1)",
            contrastText: "rgba(255,255,255, 1)"
        },
        primary: {
            light: "rgba(89, 244, 230, 1)",
            main: "rgb(22, 174, 235)",
            dark: "rgba(14, 119, 161, 1)",
            contrastText: "rgba(255, 255, 255, 1)"
        },
        error: {
            light: "#e57373",
            main: "rgba(235, 28, 33, 1)",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)"
        },
        background: {paper: 'rgba(255, 255, 255 , 1)'}
    },
});


ReactDOM.render(
    <MuiThemeProvider theme = { theme }>
        <Router>
<Braineaser />
    </Router>
        </MuiThemeProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
