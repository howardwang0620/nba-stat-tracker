import React from 'react';

//MAKE SCROLLABLE
class PlayByPlayComponent extends React.Component {
	constructor(props) {
		super(props);
			
		this.state = {
			numOfPlays: this.props.numOfPlays,
			period: this.props.period,
			playbyplay: this.props.playbyplay
		}
	}

	fetchPlays(numOfPlays, period, pbp) {
		var plays = pbp[period - 1].plays;
		console.log(plays)
		return plays.slice(plays.length - numOfPlays, plays.length).reverse();
	}

	render() {
		var pbp = this.fetchPlays(this.state.numOfPlays, this.state.period, this.state.playbyplay);
		const rows = [];

		pbp.map(function(val, i) {
			var desc = val.formatted.description;
			rows.push(<div key={desc}>{val.description}</div>);
		});

		return(
			<div>
				{rows}
			</div>
		)
	}
}

export default PlayByPlayComponent;