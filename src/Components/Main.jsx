import React from 'react'

const APIURL = 'https://api.quotable.io';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentQuote : {},
            colorIndex : 0
        }
    }

    fetchQuote = () => {
        fetch(`${APIURL}/random`)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                currentQuote: data
            })
            console.log(this.state.currentQuote);
        });
    }

    componentDidMount(){
        this.fetchQuote();
    }

    render(){
        return (
            <div className="d-flex align-items-center justify-content-center h-100">
                <div className="card" id="quote-box">
                    <div className="card-body">
                        <h3 className="card-title">Random Quote App</h3>
                        <p className="card-text">
                            <span className="quotation-mark">"</span>
                            <span id="text">Some quick example text to build on the card title and make up the bulk of the card's content.</span>
                        </p>
                        <h6 className="card-subtitle mb-4 text-muted">- <span id="author">author</span></h6>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex">
                                <a href="https://twitter.com/intent/tweet" target="_blank" rel="noreferrer" id="tweet-quote" className="card-link">Card link</a>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="quote-box-button btn btn-primary btn-lg" id="new-quote">New Quote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;