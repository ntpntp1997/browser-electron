/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable lines-between-class-members */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import styles from './Home.css';
const WebView = require('react-electron-web-view');

export default class Home extends React.Component<any, any> {
  back: any;
  forward: any;
  refresh: any;
  omni: any;
  dev: any;
  fave: any;
  list: any;
  popup: any;
  view: any;

  constructor(props: any) {
    super(props);
    this.back = React.createRef();
    this.forward = React.createRef();
    this.refresh = React.createRef();
    this.omni = React.createRef();
    this.dev = React.createRef();
    this.fave = React.createRef();
    this.list = React.createRef();
    this.popup = React.createRef();
    this.view = React.createRef();
    this.reloadView = this.reloadView.bind(this);
    this.updateNav = this.updateNav.bind(this);
    this.updateURL = this.updateURL.bind(this);
    this.backView = this.backView.bind(this);
    this.forwardView = this.forwardView.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.handleDevtools = this.handleDevtools.bind(this);
  }

  componentDidMount() {
    this.refresh.current.addEventListener('click', this.reloadView);
    this.back.current.addEventListener('click', this.backView);
    this.forward.current.addEventListener('click', this.forwardView);
    this.omni.current.addEventListener('keydown', this.updateURL);
    this.fave.current.addEventListener('click', this.addBookmark);
    // this.list.current.addEventListener('click', this.openPopUp);
    // this.popup.current.addEventListener('click', this.handleUrl);
    this.dev.current.addEventListener('click', this.handleDevtools);
    const node = this.view.current;
    if (node) {
      // this.view.current.addEventListener('did-finish-load', this.updateNav);
    }
  }

  reloadView() {
    this.view.current.reload();
  }

  backView() {
    this.view.current.goBack();
  }

  forwardView() {
    this.view.current.goForward();
  }

  updateURL(event) {
    if (event.keyCode === 13) {
      this.omni.current.blur();
      // eslint-disable-next-line prefer-const
      let val = this.omni.current.value;
      let https = val.slice(0, 8).toLowerCase();
      let http = val.slice(0, 7).toLowerCase();
      if (https === 'https://') {
        this.view.current.loadURL(val);
      } else if (http === 'http://') {
        this.view.current.loadURL(val);
      } else {
        this.view.current.loadURL('http://' + val);
      }
    }
    document.querySelectorAll(
      '.active span'
    )[0].innerHTML = this.view.current.getTitle();
  }

  handleUrl(event) {
    document.querySelectorAll(
      '.active span'
    )[0].innerHTML = this.view.current.getTitle();
    if (event.target.className === 'link') {
      event.preventDefault();
      this.view.current.loadURL(event.target.href);
    } else if (event.target.className === 'favicon') {
      event.preventDefault();
      this.view.current.loadURL(event.target.parentElement.href);
    }
  }

  handleDevtools() {
    if (this.view.current.isDevToolsOpened()) {
      this.view.current.closeDevTools();
    } else {
      this.view.current.openDevTools();
    }
  }

  updateNav(event) {
    // console.log(event.target);
    this.omni.current.value = event.target.src;
    // console.log(document.getElementsByClassName('active')[0].innerHTML);
    document.querySelectorAll(
      '.active span'
    )[0].innerHTML = this.view.current.getTitle();
  }

  render() {
    return (
      <div>
        <div id="navigation">
          <div id="back" ref={this.back}>
            <i className="fa fa-arrow-left" aria-hidden="true" />
          </div>
          <div id="forward" ref={this.forward}>
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </div>
          <div id="refresh" ref={this.refresh}>
            <i className="fa fa-refresh" aria-hidden="true" />
          </div>
          <div id="omnibox">
            <input type="text" id="url" ref={this.omni} />
          </div>
          <div id="fave" ref={this.fave}>
            <i className="fa fa-star" aria-hidden="true" />
          </div>
          <div id="fave-popup" data-state="closed" />
          <div id="list">
            <i className="fa fa-list" aria-hidden="true" />
          </div>
          <div id="console" ref={this.dev}>
            <i className="fa fa-terminal" aria-hidden="true" />
          </div>
        </div>
        <div id="views">
          <WebView
            id="view"
            ref={this.view}
            onDidFinishLoad={e => {
              this.updateNav(e);
            }}
            onDidStopLoading={e => {
              this.updateNav(e);
            }}
            className="page"
            src="http://www.google.com/"
          />
        </div>
      </div>
    );
  }
}
