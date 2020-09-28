import React from "react";

export default function PartyImage(props){
	return <img src={`https://kloop.kg/wp-content/uploads/2020/09/${props.partyName}.png`} alt={props.partyName}/>
	}