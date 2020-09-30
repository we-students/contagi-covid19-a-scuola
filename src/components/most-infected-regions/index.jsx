import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { List, ListItem, ListItemText } from '@material-ui/core'
import getRegionInfectedSchools from '../../utils/data'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        minHeight: 400,
    },
    list: {
        '& .MuiListItem-gutters': {
            padding: 0,
        },

        '& .MuiListItemText-multiline': {
            marginTop: 0,
            marginBottom: 0,
        },

        '& .MuiListItemText-primary': {
            display: 'inline-block',
        },

        '& .MuiListItemText-secondary': {
            marginLeft: 8,
            display: 'inline-block',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: 18,
        },
    },
}))

const MostInferctedRegions = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        ;(async () => {
            setData(await getRegionInfectedSchools())
            setLoading(false)
        })()
    }, [])

    return (
        <Paper elevation={3}>
            <Card raised className={classes.root}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <CardContent>
                        <Typography variant="h6" component="h3" color="textSecondary">
                            Scuole con contagi per regione
                        </Typography>
                        <List dense className={classes.list}>
                            {data.slice(0, 4).map((reg) => (
                                <ListItem key={reg.region}>
                                    <ListItemText primary={reg.region} secondary={reg.count} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                )}
            </Card>
        </Paper>
    )
}

export default MostInferctedRegions
