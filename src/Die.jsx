import React from 'react'
import { useState } from 'react'

export default function Die(props) {

    const styles = {
            backgroundColor: props.isHeld ? "rgb(131,58,180)" : "white"
    }

    return (
        <div 
            className='die--face' 
            style={styles} 
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}