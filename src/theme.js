import { createMuiTheme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: orange,
    },
    status: {
        danger: orange[500],
    },
})

export default theme
