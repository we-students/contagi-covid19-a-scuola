import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { InputLabel, MenuItem, Select } from '@material-ui/core'

import { getList } from '../../../utils/data'

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            'display': 'block',
            'width': '100%',
            'marginBottom': 20,

            '& .MuiInputBase-root': {
                width: '100%',
            },
        },
    },
}))

const CheckYourSchoolResult = ({ school }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [found, setFound] = useState()
    const [email, setEmail] = useState()
    const [role, setRole] = useState('student')

    useEffect(() => {
        if (school) {
            setOpen(true)
            setFound()
            ;(async () => {
                const data = await getList()
                const f = data.find((i) => {
                    if (i === undefined) return false
                    return i.mg_code === school.COSCUO
                })
                setFound(f)
            })()
        }
    }, [school])

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = async () => {
        const data = {
            email,
            attributes: {
                CODICE_MINISTERIALE_SCUOLA: school.COSCUO,
                RUOLO: role,
            },
            listIds: [38],
            updateEnabled: true,
        }

        await fetch('https://api.sendinblue.com/v3/contacts', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'api-key': process.env.REACT_APP_SIB_API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Risultato ricerca scuola</DialogTitle>
            <DialogContent>
                {found ? (
                    <>
                        <Typography variant="h4" component="h2" color="error">
                            Attenzione!
                        </Typography>
                        <DialogContentText style={{ marginTop: 30 }}>
                            Ci risulta che nella tua scuola sono stati segnalati casi positivi di
                            COVID-19
                        </DialogContentText>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" component="h2" color="primary">
                            Sembra essere tutto ok
                        </Typography>
                        <DialogContentText style={{ marginTop: 30 }}>
                            Nonostante questo, i nostri dati non sono completi e provengono da
                            diverse fonti per cui non possiamo garantirne la veridicità. <br />
                            Fai attenzione, stay safe
                            <br /> <br />
                        </DialogContentText>
                    </>
                )}

                <DialogContentText style={{ marginTop: 30 }}>
                    Se vuoi essere informato su eventuali aggiornamenti e notizie inerenti alla
                    scuola che hai selezionato, compila il seguente form
                </DialogContentText>
                <form className={classes.root}>
                    <TextField
                        label="Email"
                        placeholder="latua@email.com"
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Ruolo
                        </InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="student">Studente</MenuItem>
                            <MenuItem value="teacher">Insegnante</MenuItem>
                            <MenuItem value="parent">Genitore</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No, grazie
                </Button>
                <Button onClick={handleConfirm} disabled={email === undefined} color="primary">
                    Conferma
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CheckYourSchoolResult
