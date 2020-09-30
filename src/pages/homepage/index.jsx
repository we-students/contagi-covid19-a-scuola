import React, { useEffect, useState } from 'react'

import { Typography, Paper, Container, makeStyles } from '@material-ui/core'

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
    },
    gridList: {
        width: '100%',
    },
    pageTitle: {
        marginBottom: 40,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}))

const Homepage = () => {
    const classes = useStyles()

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
                <Typography
                    className={classes.pageTitle}
                    variant="h2"
                    component="h2"
                    color="primary"
                >
                    Contagi a scuola
                </Typography>

                <Container>
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
                </Container>

                <SchoolsList />
            </Container>
        </Layout>
    )
}

export default Homepage
