import React from "react";
// import {  push, ref, set } from "firebase/database";
// import { realTimeDatabase } from "./firebase";
// import { Component } from "react/cjs/react.production.min";


class Form extends React.Component{

constructor(){

  super()


  this.state = {
    name:"",
    description:""
  }

}

render(){

  return(
<div>
    <h1> form</h1>
    <label> name</label>
    <br/>
    <input type="text" name="name" value={this.state.name}
    placeholder="insert your name" />

  </div>
  )
}

}

export default Form;