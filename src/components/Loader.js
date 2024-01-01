import React, { Component } from 'react'
import loader from "./loader.gif";

export default class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img style={{margin: "10px"}} height="50" width="50" src={loader} alt="Loading" />
      </div>
    )
  }
}
