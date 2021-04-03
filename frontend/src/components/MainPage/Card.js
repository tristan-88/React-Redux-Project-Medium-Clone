import { Link } from "react-router-dom"
import "./MainPage.css"

function Card({ card }) {
    return (
			<div className="card-div" alt="">
				<div className="card-name-div"  alt="">
					{card?.cardName}
				</div>
				<Link to={`/card/${card.id}`} >
                <img src={`${card.cardImg}`} alt="" className="card-img" />
				</Link>
			</div>
		)
}

export default Card;