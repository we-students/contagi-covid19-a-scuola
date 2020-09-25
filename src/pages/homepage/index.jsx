import React, { useEffect } from 'react'
import { getList } from '../../utils/data'

const Homepage = () => {
    useEffect(() => {
        ;(async () => {
            const d = await getList()
            console.log(d)
        })()
    }, [])

    return (
        <div>
            <p>Homepage</p>
        </div>
    )
}

export default Homepage
