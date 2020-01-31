import React, { Component } from "react";
import './App.scss';
import pimpa from '../../assets/images/pimpa.png';
import batman from '../../assets/images/batman.png';
import unicorn from '../../assets/images/unicorn.png';
import pistorius from '../../assets/images/pistorius.png'

import RunnerTrack from "../RunnerTrack/RunnerTrack";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          runOn: false,
          results: [],
        };

        this.runners = [
            {
                name: 'Pimpa',
                image: pimpa,
            },
            {
                name: 'Unicorno',
                image: unicorn,
            },
            {
                name: 'Batman',
                image: batman,
            },
            {
                name: 'Pistorius',
                image: pistorius,
            }

        ];

    }

    registerWin(runnerName) {
        console.log(runnerName);
        this.setState({
            results: [...this.state.results, runnerName],
        });
    }


    switchGameStatus(gameStatus) {
        this.setState({
           runOn: gameStatus,
            results: [],
        });
    }

    render() {
        const { runOn, results } = this.state;
        return (
            <div className="App">
                <div className="console">
                    {!runOn ? (
                        <button onClick={() => this.switchGameStatus(true)}>
                            INIZIA GARA
                        </button>
                    ): (
                        <div className="results">
                            <header>
                                Risultati:
                            </header>
                            { results.map((runnerName, key) =>
                                <p key={key}>
                                    <span>{key+1}.</span>
                                    {runnerName}
                                </p>
                            )}
                        </div>
                    )}
                    {results.length === 4 ? (
                        <button onClick={() => this.switchGameStatus(false)}>NUOVA GARA</button>
                    ): ('')}
                </div>
                <div className="tracks">
                    { Object.entries(this.runners).map( (runner, key) =>
                        <RunnerTrack key={key} runner={runner[1]} runOn={runOn} onWin={e => this.registerWin(e)}/>
                    )}
                </div>

            </div>
        );
    }
}

export default App;
