import React, {Component} from "react";
import './RunnerTrack.scss';

class RunnerTrack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftPosition: 0,
        };
        this.trackWidth = 0;
        this.trackComponent = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.runOn !== prevProps.runOn) {
            if(this.props.runOn) {
                this.moveDog();
            } else {
                this.setState({
                   leftPosition: 0,
                });
            }
        }
    }

    componentDidMount() {
        this.trackWidth = this.trackComponent.current.offsetWidth - 16 * 5;
    }

    moveDog(props) {
        const moverInterval = setInterval(
            () => {
                const stepLength = Math.random() * 90 + 10;
                this.setState({
                    leftPosition: this.state.leftPosition + stepLength,
                });
                if (this.trackWidth - this.state.leftPosition < stepLength/2) {
                    clearInterval(moverInterval);
                    this.props.onWin(this.props.runner.name);
                }
            }, 200);
    }

    render(props) {
        return (

            <div className="RunnerTrack" ref={this.trackComponent}>
                <div className="dog"
                     style={{left: this.state.leftPosition, backgroundImage: `url('${this.props.runner.image}')`}}/>
                <div className="end"/>
            </div>
        );
    }
}

export default RunnerTrack;