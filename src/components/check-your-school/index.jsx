import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Autocomplete from '@material-ui/lab/Autocomplete'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { CircularProgress } from '@material-ui/core'

import Results from './result'

const useStyles = makeStyles((theme) => ({
    tile: {
        'marginTop': '1rem',
        'backgroundColor': theme.palette.primary.main,
        'transition': '0.2s',
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.light,
        },
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
    root: {
        minWidth: 275,
        minHeight: 400,
    },
    button: {
        marginTop: 40,
        float: 'right',
    },
}))

const CheckYourSchool = () => {
    let timeout
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [autocompleteOpen, setAutocompleteOpen] = useState(false)
    const [schools, setSchools] = useState([])
    const [selectedSchool, setSelectedSchool] = useState()
    const [result, setResult] = useState()

    useEffect(() => {
        if (!autocompleteOpen) {
            setSchools([])
        }
    }, [autocompleteOpen])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedSchool(undefined)
    }

    const handleConfirm = () => {
        setResult(selectedSchool)
        handleClose()
    }

    const performSearch = async (str) => {
        setLoading(true)
        const data = await (
            await fetch(
                `https://www.adozionilibriscolastici.it/v1/scuole/?searchName=${encodeURIComponent(
                    str,
                )}`,
            )
        ).json()
        setLoading(false)
        setSchools(data)
    }

    const handleSearchInputChange = (e, val, reason) => {
        if (reason === 'reset') return

        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            performSearch(val)
        }, 1000)
    }

    return (
        <Paper
            elevation={3}
            className={classes.tile}
            onClick={handleClickOpen}
            style={{
                cursor: 'pointer',
            }}
        >
            <div className={classes.content}>
                <Typography
                    variant="h6"
                    style={{ fontWeight: 'bold' }}
                    className={classes.title}
                    color="textSecondary"
                >
                    Scopri adesso se ci sono stati contagi nella tua scuola
                </Typography>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ricerca scuola</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ricerca la tua scuola per nome o per codice ministeriale
                    </DialogContentText>

                    <Autocomplete
                        id="asynchronous-demo"
                        style={{ width: 300 }}
                        open={autocompleteOpen}
                        onInputChange={handleSearchInputChange}
                        onOpen={() => {
                            setAutocompleteOpen(true)
                        }}
                        onClose={() => {
                            setAutocompleteOpen(false)
                        }}
                        getOptionSelected={(option, value) => option.COSCUO === value.COSCUO}
                        getOptionLabel={(option) => option.SCUONAME}
                        options={schools}
                        loading={loading}
                        multiple={false}
                        noOptionsText="Nessun risultato"
                        onChange={(e, val) => {
                            if (val === null) setSelectedSchool(undefined)
                            else setSelectedSchool(val)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Scuola"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annulla
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={selectedSchool === undefined}
                        color="primary"
                    >
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

            <Results school={result} />
        </Paper>
    )
}

export default CheckYourSchool
