/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Link, Container } from '@material-ui/core'

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
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
        margin: 'auto',
    },
    description: {},
    disclaimer: {
        marginTop: 30,
        fontSize: '0.8em',
    },
}))

const Layout = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>{children}</div>
            {/* Footer */}
            <Paper className={classes.paper}>
                <Container className={classes.footer}>
                    <p className={classes.description}>
                        Questo tool si occupa di fornire a tutti gli studenti, professori e genitori
                        la possibilità di monitorare il progredire del Covid-19 all’interno delle
                        scuola italiane. Resta sempre aggiornato sui contagi da coronavirus e come
                        la tua scuola li sta gestendo!
                    </p>

                    <p className={classes.disclaimer}>
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
                        , a cura di
                        <Link
                            href="https://twitter.com/vi__enne"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            {' '}
                            Vittorio Nicoletta
                        </Link>{' '}
                        e
                        <Link
                            href="https://twitter.com/Ruffino_Lorenzo"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            {' '}
                            Lorenzo Ruffino
                        </Link>
                    </p>
                </Container>
            </Paper>
        </div>
    )
}

export default Layout
