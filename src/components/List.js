import React, { Component } from 'react';

import ListEntry from './ListEntry';

function List(props) {


    return (
        <div className='list'>
            {props.stocks?.map(s => (
                <ListEntry result={s} removeStock={props.removeStock} key={s.T} />
            ))}

        </div>
    );
}

export default List;