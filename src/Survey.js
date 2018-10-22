import React, { Component } from 'react'
import './App.css'
import DropContainer from './DropContainer'
import { issues } from './issues'
import KeyIssue from './KeyIssue';

function shuffle(arr) {
  console.log('arr1: ', arr);
  var currentIndex = arr.length;
  var randIndex, tempValue;

  while (currentIndex !== 0) {
    randIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = arr[currentIndex];
    arr[currentIndex] = arr[randIndex];
    arr[randIndex] = tempValue;
  }
  console.log('arr2: ', arr);
  return arr;
}

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
    },
    keyIssues: [],
    keyIssueIndex: 0,
    finishSurvey: false
  }

  randomSort() {
    let issues = shuffle(this.state.issues.slice());
    let numCarelots = 0;
    let numCarelittle = 0;
    let numDontcare = 0;
    let issuesIndex = 0;

    while (numCarelots < this.state.maxItems.carelots) {
      issues[issuesIndex].category = 'carelots';
      issuesIndex++;
      numCarelots++;
    }

    while (numCarelittle < this.state.maxItems.carelittle) {
      issues[issuesIndex++].category = 'carelittle';
      numCarelittle++;
    }

    while (issuesIndex < issues.length) {
      issues[issuesIndex++].category = 'dontcare';
    }
    this.setState({issues, showContinue: true})
  }

  advanceRound() {
    let numCarelots = this.state.issues.filter(i => i.category==='carelots').length;
    this.setState({
      showFinal: (numCarelots <= 3), 
      showContinue: false
    });
    if (numCarelots > 3) {
      this.setupRound2();      
    }
    else {
      this.setState({
        keyIssues: this.state.issues.filter(i => i.category === 'carelots')
      });
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

  submitKeyIssue(issueData) {
    delete issueData.canSubmit;

    let keyIssues = this.state.keyIssues.slice();
    keyIssues[this.state.keyIssueIndex] = {
      ...keyIssues[this.state.keyIssueIndex],
      ...issueData
    }
    this.setState({keyIssues});

    if (this.state.keyIssueIndex === (this.state.keyIssues.length - 1)) {
      this.setState({finishSurvey: true, showFinal: false});
    }
    else {
      this.setState({
        keyIssueIndex: this.state.keyIssueIndex + 1
      })
    }
  }

  render() {
    if (this.state.showFinal) {
      // console.log('keyIssues: ', this.state.keyIssues);

      return (
        <div>
          <h2>Final questions</h2>
          <KeyIssue 
            {...this.state.keyIssues[this.state.keyIssueIndex]}
            onSubmitHandler={(issueData) => {
              this.submitKeyIssue(issueData);
            }}
          />
        </div>)
    }

    if (this.state.finishSurvey) {
      this.state.keyIssues.forEach(issue => {
        delete issue.bgcolor;
        delete issue.copy;
        delete issue.category;
      })
      return (
        <div className="final-results">
          <h2>Final Results</h2>
          <pre>{JSON.stringify(this.state.keyIssues, null, 3)}</pre>
        </div>
      )
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

        <button
          onClick={() => {this.randomSort()}}
          className="random-sort"
        >RANDOM</button>

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