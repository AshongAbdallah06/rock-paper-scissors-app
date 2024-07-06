import rockIcon from "../images/icon-rock.svg"
import ScissorsIcon from "../images/icon-scissors.svg"


const AfterChoice = () => {
  return (
    <div className="Desktop-step2">
        <div className="you-picked">
            <h1>YOU PICKED</h1>
            <div className="picked">
                <img src={ScissorsIcon} alt="paper"/>
            </div>
        </div>
        <div className="results">
            <h1>YOU LOSE</h1>
            <button>PLAY AGAIN</button>
        </div>
        <div className="house-picked">
            <h1>THE HOUSE PICKED</h1>
            <div className="hPicked winner">
                <img src={rockIcon} alt="paper"/>
            </div>
        </div>
    </div>
  )
}

export default AfterChoice