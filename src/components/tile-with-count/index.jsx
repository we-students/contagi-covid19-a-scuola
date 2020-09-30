import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Typography, Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    tile: {
        marginTop: '1rem',
        width: 'calc(33.3% - 0.66rem)',
    },
    content: {
        padding: '1.5rem',
    },
    list: {
        marginTop: '1rem',
    },
}))

const TileWithCount = ({ title, count }) => {
    const classes = useStyles()

    return (
        <Paper className={classes.tile} elevation={3}>
            <div className={classes.content}>
                <Typography variant="h6" color="white">
                    {title}
                </Typography>

                <div className={classes.list}>
                    <Typography variant="h2" color="primary">
                        <Box textAlign="center" fontWeight={700}>
                            {count}
                        </Box>
                    </Typography>
                </div>
            </div>
        </Paper>
    )
}

export default TileWithCount
