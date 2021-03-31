import {Link} from "react-router-dom"

function Card({ card }) {
    return (
			<div className="card-div" alt="">
				<div className="card-name-div"  alt="">
					{card?.cardName}
				</div>
				<Link to={`/card/${card.id}`} >
					<img src={`${card.cardImg}`} alt="" />
				</Link>
			</div>
		)
}

export default Card;