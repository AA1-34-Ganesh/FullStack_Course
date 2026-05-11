import React from "react";
import { StatisticsLine } from "./StatisticsLine";

export const Statistics = (props) => {
    // console.log(props.good);
    //  console.log(props.neutral);
    //   console.log(props.bad);

    return (
        <div>
            <h1>Statistics</h1>
            {props.total === 0 ?

                (<div>


                    <p>No feedback given</p>

                </div>
                ) :
                (
                    <div>
                        <table>

                            <tbody>
                                <StatisticsLine text="Good" value={props.good} />
                                <StatisticsLine text="Neutral" value={props.neutral} />
                                <StatisticsLine text="Bad" value={props.bad} />
                                <StatisticsLine text="All" value={props.total} />
                                <StatisticsLine text="Average" value={props.average} />
                                <StatisticsLine text="Positive" value={props.positive} />
                            </tbody>
                        </table>
                    </div>
                )
            }

        </div>
    )
}