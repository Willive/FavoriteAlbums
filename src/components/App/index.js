import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Section from '../Section'
import Header from '../Header'
import Footer from '../Footer'

import './App.css'

export default function App(props) {
  console.log(props)
  return (
    <div className="App">
      <Header />
      <BrowserRouter key="router">
        <Switch>
          <Route path="/:albumID?" component={Section} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  )
}




