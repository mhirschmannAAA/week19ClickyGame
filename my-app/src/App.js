import React, { Component } from "react";
import FishCard from "./components/FishCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Instructions from "./components/Instructions";
import Fish from "./fish.json";
import "./App.css";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    Fish: Fish
  };

  randomRender = id => {
    this.state.Fish.forEach((image) => {
      if (image.id === id) {
        if (image.cliked) {
          // $("#myModal").modal('toggle');
          alert('YOU LOST!! This card was previously selected.');
          this.setState({})
          this.resetGame();
          return false;
        }
        else {
          this.updateScore();
          image.cliked = true;
        }
        if (this.state.score >= this.state.highScore) {
          this.newHighScore();
        }
      }
    });
  }

  randomOrganize = (array) => {
    let copy = [], n = array.length, i;
    while (n) {
      i = Math.floor(Math.random() * array.length);
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    this.setState({ Fish: copy });
  }

  updateScore = () => {
    this.setState((newState) => ({
      score: newState.score + 1
    }), () => this.winning())
  }

  newHighScore = () => {
    this.setState((newState) => ({
      highScore: newState.score
    }))
  }

  winning = () => {
    if (this.state.score === this.state.Fish.length) {
      alert('YOU WIN!! congratulations!')
      this.setState({});
      this.resetGame();
    }
    else {
      setTimeout(() => {
        this.randomOrganize(this.state.Fish)
      }, 500);
    }
  }

  resetGame = () => {
    this.state.Fish.forEach((image) => {
      image.cliked = false;
    })
    this.setState({ score: 0 })
  }

  // Map over this.state.Fish and render a FishCard component for each Fish object
  render() {
    return (
      <Wrapper>
          <Nav score={this.state.score} highScore={this.state.highScore} />
          <Instructions />
        {this.state.Fish.map(Fish => {
          return <FishCard
            {...Fish}
            key={Fish.id}
            randomRender={this.randomRender}
            randomOrganize={() => this.randomOrganize(this.state.Fish)}
          />;
        })}
      </Wrapper>
  )};
}

export default App;