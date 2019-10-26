import React from 'react'

const styleCard={
    height:'100px',
    width:'100px',
    backgroundColor:'yellow',
    margin :'50px'
}

const Card=(props)=> {
    const { title, content } = props;
    return (
        <div style={styleCard}>
            <div>{title}</div>
            {/* <div>{content}</div> */}
        </div>
    )
}

export default Card;