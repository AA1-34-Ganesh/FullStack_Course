import React from "react";
import { Button } from "./Button";

export const Header=(props)=>{
    return(
        <>
          <h1>
            Give Feedback
          </h1>
          <Button  onClick={props.good} text="good" />
          <Button onClick={props.neutral}  text="neutral" />
          <Button  onClick={props.bad} text="bad"/>
        </>
    )
}