import React, { Component } from 'react'
import db from '../db'
import _ from 'lodash'

class App extends React.Component {
  state = {
    items: {},
    username: null
  }

  componentDidMount () {
    db.ref('items').on('value', (snapshot) => {
      this.setState({
        items: snapshot.val()
      })
    })
  }
  addItem (text) {
    db.ref('items').push().set({ text, username: this.state.username })
  }

  signIn = (event) => {
    event.preventDefault()
    const input = this.refs.username
    this.setState({ username: input.value })
    input.value = ''
  }

  _submit = (event) => {
    event.preventDefault()
    const input = this.refs.chatText
    this.addItem(input.value)
    input.value = ''
  }

  render () {
    if (this.state.username) {
      return <div className='App'>
        <h1>Missy Elliot's Chattachatchat room</h1>
        <main>
          <ul className='mainContainer'>
            {_.map(this.state.items, ({ username, text }, key) =>
              <li className='messages' key={key}>{username}: {text}</li>
          )}
          </ul>
          <div className='inputContainer'>
            <form onSubmit={this._submit}>
              <input type='text' ref='chatText' placeholder='Chat' />
            </form>
          </div>
        </main>
      </div>
    } else {
      return <div className='App'>
        <h1>Messenger</h1>
        <form onSubmit={this.signIn}>
          <p>Enter Your Username</p>
          <input className='userBox' ref='username' />
        </form>
      </div>
    }
  }
}

export default App
