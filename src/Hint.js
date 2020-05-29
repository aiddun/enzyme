import React from 'react'
import { Hint } from 'react-vis';

export default function Hint(props) {
    if (props.hoveredValue) {
        return (<Hint value={hoveredValue}>
            <div style={{ background: 'black' }}>
                <h3>Value of hint</h3>
                <p>{props.hoveredValue.x}</p>
            </div>
        </Hint>)
    } else {
        return null
    }
}