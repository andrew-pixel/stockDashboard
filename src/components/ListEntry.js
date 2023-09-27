import React, { Component } from 'react';
import { useContext } from 'react'
import { StockContext } from '../stockContext';
import "./comp.css"
function ListEntry(props) {

    const [activeStock, setActiveStock] = useContext(StockContext)
    function select() {

        setActiveStock(props.result)
    }
    return (

        <button className='listEntry' style={props.result.o < props.result.c ? { backgroundColor: '#51fc6d' } :
            { backgroundColor: "#ff5e5e" }} onClick={select} >

            <h1>{props.result.T}</h1>
            <div>
                <p>Price ${props.result.c} </p>
                <p>   {props.result.o < props.result.c ? "+" : ""}
                    {(((props.result.c - props.result.o) / props.result.o) * 100).toFixed(2)}%</p>
            </div>
            <div onClick={() => props.removeStock(props.result.T)}>X</div>
        </button >


    );
}

export default ListEntry;