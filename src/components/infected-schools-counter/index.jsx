import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { getList } from '../../utils/data'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: 400,
    },
    pos: {
        marginBottom: 12,
    },
})

const InferctedRegions = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState()

    useEffect(() => {
        ;(async () => {
            const data = await getList()
            setCount(data.length)
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
                            Scuole in cui ci sono stati dei contagi
                        </Typography>
                        <Typography
                            variant="h2"
                            component="h3"
                            color="primary"
                            style={{ fontWeight: 'bold' }}
                        >
                            {count}
                        </Typography>
                    </CardContent>
                )}
            </Card>
        </Paper>
    )
}

export default InferctedRegions
