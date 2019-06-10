import React from 'react'
import { pure } from "recompose";

const RaceFlag = pure(
    ({ className, fill, expSrc, raceSrc }) => (
        <div className={'race-flag'}>
            <img className={'saf-w-40'} src={raceSrc} alt={'loading...'} />
            {
                !!expSrc &&
                <img className={'saf-experience saf-w-40'} src={expSrc} alt={''}/>
            }
        </div>
    )
)

RaceFlag.propTypes = {}

export default RaceFlag