import React from 'react'

const APIURL = 'https://api.quotable.io';
let colorArray = [
    '#3459e6',
    '#6610f2',
    '#6f42c1',
    '#d63384',
    '#da292e',
    '#f8765f',
    '#f4bd61',
    '#2fb380',
    '#20c997',
    '#287bb5',
];

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentQuote : {},
            colorIndex : 0
        };
        this.changeQuote = this.changeQuote.bind(this);
    }

    changeQuote = () => {
        this.changeColor();
        this.hideQuote();
        return this.fetchQuote();
    }

    changeColor = () => {
        let background = document.querySelector('#background');
        let newQuoteButton = document.querySelector('.quote-box-button');
        let tweetButton = document.querySelector('.twitter-box-button');

        background.style.backgroundColor = colorArray[this.state.colorIndex];
        newQuoteButton.style.backgroundColor = colorArray[this.state.colorIndex];
        tweetButton.style.backgroundColor = colorArray[this.state.colorIndex];

        if(this.state.colorIndex === colorArray.length - 1){
            this.setState({
                colorIndex : 0
            });
        } else {
            this.setState({
                colorIndex : this.state.colorIndex + 1
            });
        }
    }

    fetchQuote = () => {
        fetch(`${APIURL}/random`)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                currentQuote: data
            })
            this.showQuote();
        });
    }

    hideQuote = () => {
        let quoteText = document.querySelector('#text');
        let quoteAuthor = document.querySelector('#author');

        quoteText.style.opacity = 0;
        quoteAuthor.style.opacity = 0;
    }

    showQuote = () => {
        let quoteText = document.querySelector('#text');
        let quoteAuthor = document.querySelector('#author');

        quoteText.style.opacity = 1;
        quoteAuthor.style.opacity = 1;
    }

    componentDidMount(){
        let background = document.querySelector('#background');
        let newQuoteButton = document.querySelector('.quote-box-button');

        background.style.backgroundColor = colorArray[this.state.colorIndex];
        newQuoteButton.style.backgroundColor = colorArray[this.state.colorIndex];

        this.setState({
            colorIndex : this.state.colorIndex + 1
        });

        this.fetchQuote();
    }

    render(){
        return (
            <div className="d-flex align-items-center justify-content-center h-100" id="background">
                <div className="card" id="quote-box">
                    <div className="card-body">
                        <p className="card-text">
                            <span className="quotation-mark">" </span>
                            <span id="text">{this.state.currentQuote.content}</span>
                        </p>
                        <div className="d-flex justify-content-end">
                            <h5 className="card-subtitle mb-4 text-muted">- <span id="author">{this.state.currentQuote.author}</span></h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <a href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${this.state.currentQuote.content}" -${this.state.currentQuote.author}`} target="_blank" rel="noreferrer" id="tweet-quote" className="twitter-box-button btn btn-primary btn-lg">
                                    <i className="fab fa-twitter"></i> Tweet
                                </a>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="quote-box-button btn btn-primary btn-lg" onClick={this.changeQuote} id="new-quote">New Quote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;