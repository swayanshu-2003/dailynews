import React, { Component } from "react";
import Loader from "./Loader";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 20,
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: 20,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isLoading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - NewsMan`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=72cdd61b29f04bf9adeb5f4d513ff1e7&page=${this.state.page}&pageSize=20`;
    this.setState({ isLoading: true });
    let data = await fetch(url);
    let jsonData = await data.json();
    this.setState({
      articles: jsonData.articles,
      totalResults: jsonData.totalResults,
      isLoading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }
  // handleNextPage = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  // handlePreviousPage = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=72cdd61b29f04bf9adeb5f4d513ff1e7&page=${this.state.page}&pageSize=20`;
  //   this.setState({ isLoading: true });
  //   let data = await fetch(url);
  //   let jsonData = await data.json();
  //   this.setState({
  //     articles: jsonData.articles,
  //     totalResults: jsonData.totalResults,
  //     isLoading: false,
  //   });
  // };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=72cdd61b29f04bf9adeb5f4d513ff1e7&page=${this.state.page}&pageSize=20`;
    let data = await fetch(url);
    let jsonData = await data.json();
    this.setState({
      articles: this.state.articles.concat(jsonData.articles),
      totalResults: jsonData.totalResults,
    });
  };
  render() {
    return (
      <>
        <h1 className="my-3 text-wrap text-center">
          NewsMan-{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines of the Day
        </h1>
        <hr />
        {this.state.isLoading && <Loader />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {!this.state.isLoading &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-3 my-2" key={element.url}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousPage}
          >
            &larr;Previous
          </button>
          <button
            id="next"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextPage}
          >
            &rarr;Next
          </button>
        </div> */}
      </>
    );
  }
}
