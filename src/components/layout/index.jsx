import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
    },
    container: {
        paddingTop: 50,
    },
}))

const Layout = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>{children}</div>
        </div>
    )
}

export default Layout
