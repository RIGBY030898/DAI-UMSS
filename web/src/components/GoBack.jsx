import React from 'react'

const GoBack = ({ history }) => {
    const goBack = () => {
        history.goBack()
    }

    return (
        <span
            className='h2 bg-primary text-light rounded-circle pt-2 pb-2 pl-3 pr-3 text-monospace'
            style={{ cursor: 'pointer' }}
            onClick={goBack}
        >
            {'<'}
        </span>
    )
}

export default GoBack
