import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default class JournalCard extends Component {

    render() {
        console.log("this.props.journals", this.props.journals)
        // console.log("this.props.journals.journals", this.props.journals.journals)
        // console.log("this.props.journals.journals[1].timestamp", this.props.journals.journals[1].timestamp)
        // (this.props.journals.journals !== []) ?
        // console.log(this.props.journals.journals[1].timestamp)
        // : null
        // debugger
        return (
            <>
                <div>
                <h4 className="prompts">{this.props.journals.prompt.prompt}</h4>
                    <p className="entryList">{this.props.journals.entry}</p>
                    <p className="entryDate">{new Date(this.props.journals.timestamp).toString()}</p>
                    <div>
                    <ButtonGroup variant="contained" id="button-group" className="journal-button-group" color="primary" aria-label="outlined primary button group">
                    <Button
                        onClick={() => this.props.handleDelete(this.props.journals.id)}
                    >Delete</Button>
                    <Button
                        onClick={() => this.props.history.push(`/journal/entries/${this.props.journals.id}`)}
                    >Edit</Button>
                    </ButtonGroup>
                    </div>
                </div>

            </>
        )
    }
}