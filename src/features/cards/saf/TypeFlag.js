import React from 'react'
import { pure } from "recompose";

const TypeFlag = pure(
    ({ className, fill }) => (
        <div className={'type-flag'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 339"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="73.67 0 73.67 15.74 25.33 15.74 25.33 0 0 0 7.33 339 50 239.75 93.33 339 100 0 73.67 0"/></g></g></svg>
        </div>
    )
)

TypeFlag.propTypes = {}

export default TypeFlag