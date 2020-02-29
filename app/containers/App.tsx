import React from 'react';
import Home from '../components/Home';
import TabComponent from '../components/Tab';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div id="browser">
        <TabComponent />
        <Home />
      </div>
    );
  }
}
