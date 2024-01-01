import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (

      <div className="card" >
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-justify">{title}...</h5>
          <p className="card-text text-justify">
            {description}...
          </p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark bg-dark">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
