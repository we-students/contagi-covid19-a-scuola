/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Link } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
    },
    container: {
        paddingTop: 50,
    },
    footerWrapper: {
        paddingTop: 40,
        paddingBottom: 40,
    },
    footer: {
        marginTop: 30,
        padding: '20px',
        textAlign: 'center',
    },
}))

const Layout = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>{children}</div>

            <Paper className={classes.paper}>
                <div className={classes.footer}>
                    <p className="company-info">
                        Questo tool si occupa di fornire a tutti gli studenti, professori e genitori
                        la possibilità di monitorare il progredire del Covid-19 all’interno delle
                        scuola italiane. Resta sempre aggiornato sui contagi da coronavirus e come
                        la tua scuola li sta gestendo!
                    </p>

                    <p style={{ marginTop: 30, fontSize: 11 }}>
                        Le informazioni contenute in questa dashboard sono eleborazioni dei dati
                        contenuti in questo{' '}
                        <Link
                            href="https://docs.google.com/spreadsheets/d/1E4jyxZsF6z8lJdpBWQOhpgdcB6Pn3MSuqxO6ih0_p0A/edit#gid=1130592568"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            Google Sheet
                        </Link>
                        , a cura di Vittorio Nicoletta e Lorenzo Ruffino
                    </p>
                </div>
            </Paper>
        </div>
    )
}

export default Layout
