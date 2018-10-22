import React, { Component } from 'react'

export default class KeyIssue extends Component {
  state = {
    against_for: false,
    importance: false,
    canSubmit: false
  }

  handleChange(e, prop) {
    this.setState({[prop]: e.target.value});
  }

  componentDidUpdate() {
    if (this.state.against_for !== false && this.state.importance !== false && !this.state.canSubmit) {
      this.setState({canSubmit: true});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmitHandler(this.state);
    this.setState({
      against_for: false,
      importance: false,
      canSubmit: false
    });
  }

  render() {
    return (
      <div className="keyIssue" style={{borderColor: this.props.bgcolor}}>
        <h3 className="title">{this.props.name}</h3>
        <div className="issueIcon">icon</div>
        <p className="issueCopy">{this.props.copy}</p>
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <span>AGAINST</span>
          <input type="range" min={0} max={100}
            name="against_for"
            value={this.state.against_for}
            onChange={(e) => {
              this.handleChange(e, "against_for");
            }}
            />
          <span>FOR</span>

            <div className="radio-wr">
              <h5>How strongly do you feel about {this.props.name}?</h5>
              <p className="importance-group">
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
                <button
                  type="sumbit"
                  disabled={!this.state.canSubmit}
                >
                  NEXT</button>
            </div>
        </form>
      </div>
    );
  }
}