import React, { Component } from "react";

import { initGA, logPageView } from "../utils/analytics";

export default class Layout extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
