import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Homepage from './pages/homepage'
import theme from './theme'
import { updateData } from './utils/data'

import './App.css'
import Layout from './components/layout'

function App() {
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        ;(async () => {
            await updateData()
            setLoadingData(false)
        })()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            {loadingData ? (
                <Layout>
                    <div className="centered-wrapper">
                        <CircularProgress />
                    </div>
                </Layout>
            ) : (
                <Router>
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
                </Router>
            )}
        </ThemeProvider>
    )
}

export default App
