import { createMuiTheme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Cairo',
    },
    palette: {
        type: 'dark',
        primary: orange,
    },
    status: {
        danger: orange[500],
    },
})

export default theme
