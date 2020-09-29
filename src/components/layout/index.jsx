/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Paper } from '@material-ui/core'

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
        padding: '20px',
        textAlign: 'center',
    },
}))

const Layout = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>{children}</div>
            <Container className={classes.footerWrapper}>
                <Paper className={classes.paper}>
                    <div className={classes.footer}>
                        <p className="company-info">
                            <span style={{ textDecoration: 'underline' }}>We students S.R.L</span>,{' '}
                            Startup innovativa P.IVA 11961860019
                        </p>
                        <p className="company-info">
                            Creato con{' '}
                            <span className="emoji" role="img">
                                💘
                            </span>{' '}
                            e{' '}
                            <span className="emoji" role="img">
                                💻
                            </span>{' '}
                            a Torino,{' '}
                            <span role="img" className="emoji">
                                🇮🇹
                            </span>
                        </p>

                        <p style={{ marginTop: 30, fontSize: 11 }}>
                            I dati contenuti in questa dashboard sono eleborazioni dei dati
                            contenuti in questo{' '}
                            <a
                                href="https://docs.google.com/spreadsheets/d/1E4jyxZsF6z8lJdpBWQOhpgdcB6Pn3MSuqxO6ih0_p0A/edit#gid=1130592568"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Sheet
                            </a>
                            , a cura di Vittorio Nicoletta e Lorenzo Ruffino
                        </p>
                    </div>
                </Paper>
            </Container>
        </div>
    )
}

export default Layout
