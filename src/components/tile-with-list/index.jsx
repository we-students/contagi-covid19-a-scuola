/* eslint-disable react/no-array-index-key */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Typography, Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    tile: {
        'marginTop': '1rem',
        'width': 'calc(33.3% - 0.66rem)',
        '@media screen and (max-width: 991px)': {
            width: 'calc(50% - 0.66rem)',
        },
        '@media screen and (max-width: 550px)': {
            width: 'calc(100%)',
        },
    },
    content: {
        padding: '1.5rem',
    },
    list: {
        marginTop: '1rem',
    },
    listItem: {
        display: 'flex',
        alignItems: 'baseline',
    },
    count: {
        margin: 0,
        flex: 1,
        lineHeight: 0.8,
        textAlign: 'right',
    },
    desc: {
        textAlign: 'left',
        margin: 0,
        flex: 3,
    },
}))

const TileWithList = ({ title, list }) => {
    const classes = useStyles()

    return (
        <Paper className={classes.tile} elevation={3}>
            <div className={classes.content}>
                <Typography variant="h6" color="textPrimary">
                    {title}
                </Typography>
                <div className={classes.list}>
                    {list.slice(0, 3).map((reg, index) => (
                        <div className={classes.listItem} key={`tile_item_${index}`}>
                            <Typography className={classes.desc} variant="h6" color="textSecondary">
                                {reg.desc}
                            </Typography>
                            <Typography className={classes.count} variant="h4" color="primary">
                                <Box fontWeight={700}>{reg.count}</Box>
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </Paper>
    )
}

export default TileWithList
