import React, { useEffect, useState } from 'react'

import { Typography, Link, Box, Container, makeStyles, useMediaQuery } from '@material-ui/core'

import CheckYourSchool from '../../components/check-your-school'
import TileWithCount from '../../components/tile-with-count'
import TileWithList from '../../components/tile-with-list'
import SchoolsList from '../../components/schools-list'
import Layout from '../../components/layout'

import {
    getInfectedSchoolsPerRegion,
    getInfectedSchoolsPerCity,
    getInfectedSchoolsCount,
    getInfectedSchoolsClosedCount,
    getInfectionSources,
} from '../../utils/data'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        textAlign: 'center',
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        a: {
            color: 'white',
        },
    },
    pageTitle: {
        marginBottom: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    row: {
        marginTop: 30,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}))

const Homepage = () => {
    const classes = useStyles()

    const matches = useMediaQuery('(max-width:800px)')
    const [infectedSchoolsPerRegion, setInfectedSchoolsPerRegion] = useState([])
    const [infectedSchoolsPerCity, setInfectedSchoolsPerCity] = useState([])
    const [infectionSources, setInfectionSources] = useState([])
    const [infectedSchoolsCount, setInfectedSchoolsCount] = useState('N/A')
    const [infectedSchoolsClosedCount, setInfectedSchoolsClosedCount] = useState('N/A')

    useEffect(() => {
        ;(async () => {
            setInfectedSchoolsPerRegion(await getInfectedSchoolsPerRegion())
            setInfectedSchoolsPerCity(await getInfectedSchoolsPerCity())
            setInfectedSchoolsCount(await getInfectedSchoolsCount())
            setInfectedSchoolsClosedCount(await getInfectedSchoolsClosedCount())
            setInfectionSources(await getInfectionSources())
        })()
    }, [])

    return (
        <Layout>
            <Container className={classes.root}>
                <Box>
                    <Typography
                        className={classes.pageTitle}
                        variant={`${matches ? 'h3' : 'h2'}`}
                        component="h1"
                        color="primary"
                    >
                        Contagi COVID-19 a scuola
                    </Typography>
                    <Typography color="textSecondary" className={classes.subtitle}>
                        Powered by{' '}
                        <Link
                            href="https://www.westudents.it"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginLeft: '0.3rem' }}
                        >
                            WeStudents
                        </Link>
                    </Typography>
                </Box>

                <div className={classes.row}>
                    <TileWithCount title="Scuole con contagi" count={infectedSchoolsCount} />
                    <TileWithList
                        title="Scuole con contagi per regione"
                        list={infectedSchoolsPerRegion}
                    />
                    <TileWithList
                        title="Scuole con contagi per Città"
                        list={infectedSchoolsPerCity}
                    />
                    <TileWithCount title="Scuole chiuse" count={infectedSchoolsClosedCount} />
                    <TileWithList title="Sorgente del contagio" list={infectionSources} />
                    <CheckYourSchool />
                </div>
                <SchoolsList />
            </Container>
        </Layout>
    )
}

export default Homepage
