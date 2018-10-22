import React, { Component } from 'react'

export default class KeyIssue extends Component {
  state = {
    against_for: 50,
    importance: false 
  }

  handleChange(e, prop) {
    this.setState({[prop]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmitHandler(this.state);
  }

  render() {
    return (
      <div className="keyIssue" style={{borderColor: this.props.bgcolor}}>
        <h3 className="title">{this.props.name}</h3>
        <div className="issueIcon">icon</div>
        <p className="issueCopy">{this.props.copy}</p>
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <input type="range" min={0} max={100}
            name="against_for"
            value={this.state.against_for}
            onChange={(e) => {
              this.handleChange(e, "against_for");
            }}
            />

            <div className="radio-wr">
              <h5>How strongly do you feel about {this.props.name}?</h5>
              <p>
                <span>Not Strong At All</span>
                {
                  [1,2,3,4,5].map((num) => {
                    return <input name="importance"
                            value={num}
                            key={num}
                            type="radio"
                            checked={this.state.importance === num.toString()}
                            onChange={(e) => {
                              this.handleChange(e, "importance");
                            }}
                        />
                    })
                }
                <span>Very Strong</span>
              </p>
            </div>

            <div className="submit-wr">
                <button type="sumbit">NEXT</button>
            </div>
        </form>
      </div>
    );
  }
}