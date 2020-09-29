import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import { Typography } from '@material-ui/core'
import { getRegionInfectedSchools } from '../../utils/data'
import Layout from '../../components/layout'

import InfectedSchoolsCounter from '../../components/infected-schools-counter'
import MostInfectedRegions from '../../components/most-infected-regions'
import CheckYourSchool from '../../components/check-your-school'
import SchoolsList from '../../components/schools-list'

const useStyles = makeStyles((theme) => ({
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
}))

const comps = [
    {
        key: 'infected-schools-counter',
        component: <InfectedSchoolsCounter />,
        title: 'Scuole con casi',
        cols: 2,
    },
    {
        key: 'most-infected-regions',
        component: <MostInfectedRegions />,
        title: 'Regioni colpite',
        cols: 2,
    },
    {
        key: 'check-your-school',
        component: <CheckYourSchool />,
        title: 'Controlla la tua scuola',
        cols: 2,
    },
]

const Homepage = () => {
    const classes = useStyles()

    return (
        <Layout>
            <Container className={classes.root}>
                <Typography
                    className={classes.pageTitle}
                    variant="h3"
                    component="h2"
                    color="primary"
                >
                    Contagi a scuola
                </Typography>
                <GridList className={classes.gridList} cols={6} spacing={10}>
                    {comps.map((tile) => (
                        <GridListTile key={tile.key} cols={tile.cols || 1}>
                            {tile.component}
                        </GridListTile>
                    ))}
                </GridList>
                <SchoolsList />
            </Container>
        </Layout>
    )
}

export default Homepage
