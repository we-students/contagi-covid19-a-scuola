import React, {useState, useEffect} from 'react';
import { getData } from '../../utils/data';


const Homepage = () => {
    const [data, setData] = useState()

    useEffect(() => {
        (async () => {
            const d = await (await getData()).json()
            console.log(d);
            setData(d);
        })()
    }, [])


    return (
        <div>
            <p>Homepage</p>
        </div>
    )

}

export default Homepage