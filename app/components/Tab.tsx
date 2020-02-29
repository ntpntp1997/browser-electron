import React from 'react';
const remote = require('electron').remote;
export default class TabComponent extends React.Component<any, any> {
  numberTab = 1;
  elements = [1];
  constructor(props: any) {
    super(props);

    this.state = {
      elements: this.elements
    };

    this.addTab = this.addTab.bind(this);
    this.removeTab = this.removeTab.bind(this);
  }
  componentDidUpdate() {
    console.log(document.querySelectorAll('webview')[0].getTitle());
    document.querySelectorAll(
      '.active span'
    )[0].innerHTML = document.querySelectorAll('webview')[0].getTitle();
  }
  addTab() {
    this.numberTab = this.numberTab + 1;
    this.elements.push(this.numberTab);
    this.setState({
      elements: this.elements
    });
    console.log(this.elements);
  }

  removeTab(event) {
    let a = event.target.className.split(' ')[2];
    a = a.split('-')[1];
    console.log(a);
    let remove = a - 1;
    let filtered = this.elements.filter(function(value, index, arr) {
      return value != a;
    });
    // console.log(this.elements);
    // console.log(filtered);
    this.elements = filtered;
    // this.elements.splice(remove);
    this.setState({
      elements: this.elements
    });
    if (this.elements.length < 1) {
      let w = remote.getCurrentWindow();
      w.close();
    }
  }

  changeTab() {}

  render() {
    let witdh;
    if (this.elements.length > 4) {
      witdh = 90 / this.elements.length + '%';
    } else {
      witdh = '20%';
    }
    return (
      <div>
        <ul id="multi-tab" className="nav nav-tabs">
          {this.state.elements.map((value, index) => {
            console.log(this.state.elements.length);
            if (this.state.elements.length - 1 == index) {
              return (
                <li
                  className={`tab nav-item item-` + value}
                  style={{ width: witdh }}
                >
                  <a className="nav-link active">
                    <span>New Tab</span>
                    <div
                      className={'close close-' + value}
                      style={{ fontSize: '0.8rem' }}
                      onClick={this.removeTab}
                    >
                      <i className={'fa fa-times time-' + value}></i>
                    </div>
                  </a>
                </li>
              );
            } else {
              return (
                <li
                  className={`tab nav-item item-` + value}
                  style={{ width: witdh }}
                >
                  <a className="nav-link">
                    <span>New Tab {value}</span>
                    <div
                      className={'close close-' + value}
                      style={{ fontSize: '0.8rem' }}
                      onClick={this.removeTab}
                    >
                      <i className={'fa fa-times time-' + value}></i>
                    </div>
                  </a>
                </li>
              );
            }
          })}
          <li className="tab nav-item" style={{ width: '10%' }}>
            <button className="btn-addtab" onClick={this.addTab}>
              +
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
