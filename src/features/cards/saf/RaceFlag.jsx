import React from 'react'
import { pure } from "recompose";

const RaceFlag = pure(
    ({ className, fill }) => (
        <div className={'race-flag'}>
            <img className={'saf-w-40'} src={'https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/warfare%2Fcards%2Fsaf%2Fancestry%2Fdragonborn.png?alt=media&token=0b9181ef-6a2f-4c42-a871-a86c1d27a864'} alt={'loading...'} />
            <img className={'saf-experience saf-w-40'} src={'https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/warfare%2Fcards%2Fsaf%2Fexperience%2Fveteran.png?alt=media&token=80fc3299-b774-4dfe-83cb-bea5a4c46770'} alt={''} />
        </div>
    )
)

RaceFlag.propTypes = {}

export default RaceFlag