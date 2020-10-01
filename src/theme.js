import { createMuiTheme } from '@material-ui/core/styles'
import { orange, green, red } from '@material-ui/core/colors'

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
        error: red[500],
        success: green[500],
    },
})

export default theme
