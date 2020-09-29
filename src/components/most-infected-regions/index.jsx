import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { List, ListItem, ListItemText } from '@material-ui/core'
import { getRegionInfectedSchools } from '../../utils/data'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        minHeight: 400,
    },
    title: {
        fontSize: 14,
    },
    list: {
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
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Scuole con contagi per regione
                        </Typography>
                        <List dense className={classes.list}>
                            {data.slice(0, 4).map((reg) => (
                                <ListItem>
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
