import React from 'react'
import { pure } from "recompose";

const RaceFlag = pure(
    ({ className, fill }) => (
        <div className={'race-flag'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 268"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="73.33 0 73.33 19.33 24.67 19.33 24.67 0 0 0 0 268 50 238 100 268 100 0 73.33 0"/></g></g></svg>
        </div>
    )
)

RaceFlag.propTypes = {}

export default RaceFlag