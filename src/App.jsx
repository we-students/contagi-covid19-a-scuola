import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import Homepage from './pages/homepage'

import theme from './theme'

import './App.css'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/about">
                            <p>asd3</p>
                        </Route>
                        <Route path="/users">
                            <p>asd2</p>
                        </Route>
                        <Route path="/">
                            <Homepage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
