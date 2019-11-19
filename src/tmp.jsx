import React from 'react';
import './App.css';

import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import Image from "react-bootstrap/Image"; 
import Figure from "react-bootstrap/Figure"; 

class Tmp extends React.Component {
	render() {
		return(
			 <div className="App">
			 	<div className="wrapper mx-auto rounded">
					<div className="container-fluid">






						<Row className="game-team-name-container">
							<Col>	
								<h1>CLE</h1>
							</Col>
							<Col xs={2}></Col>
							<Col>
								<h1>HOU</h1>
							</Col>
						</Row>


						<Row className="game-team-logo-container">

							<Col>
								<Image src="images/teamlogos/cavaliers.png" height="50"/>
							</Col>




	    					<Col xs={2}>
	    						<h1 className="mx-auto">@</h1>
	    					</Col>
	    					<Col> 

								<Image src="images/teamlogos/rockets.png" height="50"/>
	    					</Col>
						</Row>




						<Row className="game-score-container">
							<h2 className="mx-auto"> 0 - 0 </h2>
						</Row>



						<Row className="game-time-container">
							<Col></Col>
	    					<Col>  1Q 12:00 </Col>
	    					<Col></Col>
						</Row>
					</div>
				 </div>
			 </div>
			)
	}
}

export default Tmp;