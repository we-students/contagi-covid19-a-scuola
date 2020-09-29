import React, { useState, useEffect } from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { CircularProgress } from '@material-ui/core'
import { getList } from '../../utils/data'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const headCells = [
    { id: 'school_name', numeric: false, disablePadding: false, label: 'Nome scuola' },
    { id: 'school_type', numeric: false, disablePadding: false, label: 'Tipo scuola' },
    { id: 'mg_code', numeric: false, disablePadding: false, label: 'Codice ministeriale' },
    { id: 'city', numeric: false, disablePadding: false, label: 'Città' },
    { id: 'positive_count', numeric: true, disablePadding: false, label: 'Numero positivi' },
    { id: 'is_school_closed', numeric: true, disablePadding: false, label: 'Scuola chiusa' },
]

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: '1 1 100%',
    },
}))

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles()
    const { numSelected } = props

    return (
        <Toolbar className={classes.root}>
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Lista scuole con contagi
                </Typography>
            )}
        </Toolbar>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

const SchoolsList = () => {
    const classes = useStyles()
    const [order, setOrder] = React.useState('desc')
    const [orderBy, setOrderBy] = React.useState('positive_count')
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = useState()

    useEffect(() => {
        ;(async () => {
            const data = await getList()
            console.log(data)
            setRows(data)
        })()
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, (rows ? rows.length : 0) - page * rowsPerPage)

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {rows === undefined ? (
                    <div className="centered-wrapper" style={{ padding: 30 }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <EnhancedTableToolbar />
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const labelId = `table-${index}`

                                            return (
                                                <TableRow tabIndex={-1} key={row.name}>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                    >
                                                        {row.school_name}
                                                    </TableCell>
                                                    <TableCell>{row.school_type}</TableCell>
                                                    <TableCell>{row.mg_code}</TableCell>
                                                    <TableCell>{row.city}</TableCell>
                                                    <TableCell align="right">
                                                        {row.positive_count}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.is_school_closed ? 'Sì' : 'No'}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </Paper>
        </div>
    )
}

export default SchoolsList
