import React, { Component } from "react";
import "./App.css";
import Tree from "react-d3-tree";

class App extends Component {
  state = {
    data: [
      {
        name: "A",
        children: [
          {
            name: "B",
            children: [
              {
                name: "D"
              },
              {
                name: "E"
              }
            ]
          },
          {
            name: "C",
            children: [
              {
                name: "F"
              },
              {
                name: "G"
              }
            ]
          }
        ]
      }
    ]
  };
  invert([tree, ...rest]) {
    if (!tree) {
      return;
    }
    if (tree.children) {
      let [left, right] = tree.children;
      [...tree.children] = [this.invert([right]), this.invert([left])];
    }
    return tree;
  }
  onClick() {
    const { data: orig } = this.state;
    const tree = JSON.parse(JSON.stringify(orig));
    const data = [this.invert(tree)];

    this.setState({
      data
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <Tree data={data} orientation="vertical" />
        <button onClick={this.onClick.bind(this)}>Invert</button>
      </div>
    );
  }
}

export default App;
