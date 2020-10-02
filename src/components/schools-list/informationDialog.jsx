import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    ListItem,
    List,
    Typography,
    DialogActions,
    Button,
    Divider,
    Box,
    Link,
} from '@material-ui/core'
import theme from '../../theme'

const useStyles = makeStyles(() => ({
    itemDesc: {
        textAlign: 'left',
        fontSize: '17px',
        margin: 0,
        lineHeight: '1.4rem',
    },
    dialogContent: {
        padding: 0,
    },
    articleInfo: {
        padding: '16px',
    },
}))

const InformationDialog = ({ selectedSchool, onClose, ...props }) => {
    const classes = useStyles()
    return (
        <Dialog onClose={onClose} {...props} aria-labelledby="form-dialog" fullWidth>
            <DialogTitle id="form-dialog-title">
                <Box textAlign="center">Informazioni scuola </Box>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {selectedSchool ? (
                    <Grid container>
                        <Grid container item xs={6}>
                            <List>
                                <ListItem style={{ textAlign: 'center' }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p className={classes.itemDesc}>Nome Scuola:</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="h1" variant="h5" color="primary">
                                                <Box fontWeight={700} textAlign="left">
                                                    {selectedSchool.school_name}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem style={{ textAlign: 'center' }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p className={classes.itemDesc}>Tipo Scuola:</p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component="h1" variant="h5" color="primary">
                                                <Box fontWeight={700} textAlign="left">
                                                    {selectedSchool.school_type}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem style={{ textAlign: 'center' }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid item xs={12}>
                                                <p className={classes.itemDesc}>Luogo:</p>
                                            </Grid>
                                            <Typography component="h1" variant="h5" color="primary">
                                                <Box fontWeight={700} textAlign="left">
                                                    {selectedSchool.city}
                                                    {selectedSchool.city !== selectedSchool.province
                                                        ? ','
                                                        : null}{' '}
                                                    {selectedSchool.city !== selectedSchool.province
                                                        ? selectedSchool.province
                                                        : null}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid container item xs={6}>
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p className={classes.itemDesc}>Contagi:</p>
                                        </Grid>
                                        <Typography component="h1" variant="h5" color="primary">
                                            <Box fontWeight={700} textAlign="left">
                                                {selectedSchool.positive_count}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p className={classes.itemDesc}>In isolamento:</p>
                                        </Grid>
                                        <Typography component="h1" variant="h5" color="primary">
                                            <Box fontWeight={700} textAlign="left">
                                                {selectedSchool.in_isolation}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <p className={classes.itemDesc}>Stato:</p>
                                        </Grid>
                                        <Typography component="h1" variant="h5">
                                            <Box
                                                fontWeight={700}
                                                textAlign="left"
                                                color={
                                                    selectedSchool.is_school_closed
                                                        ? theme.status.error
                                                        : theme.status.success
                                                }
                                            >
                                                {selectedSchool.is_school_closed
                                                    ? 'Chiusa'
                                                    : 'Aperta'}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider orientation="horizontal" />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid className={classes.articleInfo}>
                                Le informazioni relative ai contagi di questa scuola provengono da{' '}
                                <Link
                                    href={selectedSchool.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="primary"
                                >
                                    questo articolo.
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Chiudi
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InformationDialog
