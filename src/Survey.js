import React, { Component } from 'react'
import './App.css'
import DropContainer from './DropContainer'
import { issues } from './issues'
import KeyIssue from './KeyIssue';

export default class Survey extends Component {
  state = {
    showing: false,
    issues: issues,
    showContinue: false,
    showFinal: false,
    maxItems: {
      dontcare: 4,
      carelittle: 4,
      carelots: 6
    }
  }

  advanceRound() {
    let numCarelots = this.state.issues.filter(i => i.category==='carelots').length;
    this.setState({
      showFinal: (numCarelots === 2 || numCarelots === 3), 
      showContinue: false
    });
    if (numCarelots > 3) {
      this.setupRound2();      
    }
  }
  setupRound2() {
    let newItems = this.state.issues.filter(i => i.category==='carelots')
    newItems.forEach(i => {
      i.category = 'uncategorized'
    })
    this.setState({
      issues: newItems,
      maxItems: {
        dontcare: 2,
        carelittle: 2,
        carelots: newItems.length === 6 ? 3 : 2
      }
    })
  }

  onDragStart(e, id) {
    e.dataTransfer.setData("id", id);
    this.showIssue(id);
  }

  onDrop(e, cat) {
    let id = e.dataTransfer.getData("id");
    this.setState({showing: false});
    let issues = this.state.issues.map(issue => {
      if (issue.name === id) {
        issue.category = cat;
      }
      return issue;
    });

    this.setState({
      issues,
      showContinue: this.state.issues.filter(i => i.category==='uncategorized').length === 0
    });
  }

  onClick(e, id) {
    this.showIssue(id);
  }

  showIssue(id) {
    let issue = this.state.issues.filter(issue => issue.name === id)[0];
    this.setState({showing: issue.name});
  }

  render() {
    if (this.state.showFinal) {
      let keyIssues = this.state.issues.filter(i => i.category === 'carelots');
      console.log('keyIssues: ', keyIssues);

      return (
        <div>
          <h2>Final questions</h2>
          <KeyIssue {...keyIssues[0]} />
        </div>)
    }

    var issues = {
      uncategorized: [],
      dontcare: [],
      carelittle: [],
      carelots: []
    }
    var detail = (<div></div>);

    this.state.issues.forEach((i) => {
      issues[i.category].push(
        <div key={i.name}
            draggable
            onClick={e => this.onClick(e, i.name)}
            onDragStart={e => this.onDragStart(e, i.name)}
            className="draggable"
            style= {{backgroundColor: i.bgcolor}}
        >
          <div className="issueName">{i.name}</div>
        </div>
      )
      if (i.name === this.state.showing) {
        detail = (
          <div className="issueDetailView">
            <h3>{i.name}</h3>
            <div className="issueIcon">icon</div>
            <p>{i.copy}</p>
          </div>
        )
      }
    })
    return (
      <div>
        <div className="issueDetailView">
          {detail}
        </div>
        {this.state.showContinue && (
          <div className="continueView">
            <p>Finish arranging the issues and then <br />
              <button onClick={e => {this.advanceRound()}}>CONTINUE</button>
            </p>
          </div>
        )}
        
        <DropContainer 
          category="uncategorized"
          title="ISSUES"
          maxitems={this.state.issues.length}
          items={issues.uncategorized}
          onDrop={e => this.onDrop(e, "uncategorized")}
        />

        <DropContainer 
          category="dontcare"
          title="DON'T CARE"
          maxitems={this.state.maxItems.dontcare}
          items={issues.dontcare}
          onDrop={e => this.onDrop(e, "dontcare")}
        />
        <DropContainer 
          category="carelittle"
          title="CARE A LITTLE"
          items={issues.carelittle}
          maxitems={this.state.maxItems.carelittle}
          onDrop={e => this.onDrop(e, "carelittle")}
        />
        <DropContainer 
          category="carelots"
          title="CARE A LOT"
          maxitems={this.state.maxItems.carelots}
          items={issues.carelots}
          onDrop={e => this.onDrop(e, "carelots")}
        />

      </div>
    )
  }
}