import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'

import Homepage from './pages/homepage'

import Layout from './components/layout'

import { updateData } from './utils/data'

import theme from './theme'

const useStyles = makeStyles(() => ({
    circularProgress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'absolute',
        width: '100vw',
        top: 0,
        zIndex: 1000,
    },
}))

function App() {
    const [loadingData, setLoadingData] = useState(true)
    const classes = useStyles()

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
                    <div className={classes.circularProgress}>
                        <CircularProgress />
                    </div>
                </Layout>
            ) : (
                <Router>
                    <Switch>
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
