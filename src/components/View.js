import React, { Component, PureComponent } from 'react';
import "./comp.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { yesterday, monthago } from '../stock';
function View(props) {
    var color;
    var percentChange;
    if (props.week) {

        if (props.week.results[0].c > props.week.results[props.week.results.length - 1].c) {
            color = "#ff5e5e"
        }
        else {
            color = '#51fc6d'
        }
        percentChange = ((props.week.results[props.week.results.length - 1].c - props.week.results[0].c)
            / props.week.results[0].c) * 100
        percentChange = percentChange.toFixed(1)
    }

    if (props.active.T) {
        return (
            <div className='view'>
                <div className='viewHeader'>
                    {props.active.T &&
                        <div>
                            <h1>{props.active.T}</h1>

                        </div>
                    }
                    <h1 style={{ color: color }}>{percentChange}%</h1>
                    <h1> {monthago} -- {yesterday}</h1>
                    {props.active.T && <button onClick={() => props.addToList(props.active.T)}>Add To List</button>}
                </div>
                {props.week.results && <ResponsiveContainer width="70%" height="70%">
                    <LineChart data={props.week.results} width={500} height={300}>
                        <XAxis tick={""} />
                        <YAxis domain={[0, 'dataMax']} allowDataOverflow={true} />
                        <Tooltip />

                        <Line type={'monotone'} dataKey={"c"} stroke={color} activeDot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>}
                <div className='stats'>
                    <p>Open: {props.active.o}</p>
                    <p>Close: {props.active.c}</p>
                    <p>High: {props.active.h}</p>
                    <p>Low: {props.active.l}</p>
                </div>
            </div>
        );
    }
    return (
        <div className='view'>

            <div>Search Or Select A Ticker</div>
        </div>
    );
}

export default View;