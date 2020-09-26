import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { getList } from '../../utils/data'

const Homepage = () => {
    useEffect(() => {
        ;(async () => {
            const d = await getList()
            console.log(d)
        })()
    }, [])

    return (
        <Container>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
        </Container>
    )
}

export default Homepage
