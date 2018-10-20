import React, { Component } from 'react'

export default class DropContainer extends Component {
    state = {
        alertFull: false
    }

    handleAllowDropping(e) {
        if (this.props.items.length < 3) {
            e.preventDefault();
        }
        else {
            this.setState({alertFull: true});
        }
    }

    onDragLeave(e) {
        this.setState({alertFull: false});
    }

    render() {
        let alertFull = this.state.alertFull ? 'alertFull' : '';
        return (
            <div className={`container-${this.props.category} droppable ${alertFull}`}
                onDragOver={e => this.handleAllowDropping(e)}
                onDrop={e => this.props.onDrop(e, this.props.category)}
                onDragLeave={e => this.onDragLeave(e)}
            >
                <span className="task-header">{this.props.title}</span>
                {this.props.items}
            </div>
        )
    }
}