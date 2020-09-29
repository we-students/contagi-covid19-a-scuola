import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        minHeight: 400,
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        marginTop: 40,
        float: 'right',
    },
}))

const CheckYourSchool = () => {
    const classes = useStyles()

    return (
        <Paper elevation={3}>
            <Card raised className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        Scopri adesso se ci sono stati contagi nella tua scuola
                    </Typography>
                    <Button className={classes.button} variant="contained">
                        Controlla la tua scuola
                    </Button>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default CheckYourSchool
