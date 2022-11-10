import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getSingleGame, updateGame } from '../../managers/GameManager.js'



export const UpdateGame = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "", 
        game_type: 0
    })

 
    useEffect(() => {
        //I don't need to use the parameters with the setGameTypes 
        //because it is accessing it automatically because its only 1 param
        getSingleGame(gameId).then(setCurrentGame)
    }, [])

    useEffect(() => {
        //I don't need to use the parameters with the setGameTypes 
        //because it is accessing it automatically because its only 1 param
        getGameTypes().then(setGameTypes)
    }, [])
    
    const changeGameState = (domEvent) => {
    // how do I make the variables to be standard for the changeGame state? 
    //with the event. target.id because it was set in the id input.
            const copy = {...currentGame}
            copy[domEvent.target.id] = domEvent.target.value
            setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" id="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Skill Level Required: </label>
                    <input type="text" id="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">How many Players are needed? </label>
                    <input type="text" id="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Game Types: </label>
                    <select name="game_type" id="game_type" className="form-control" 
                    value={currentGame.game_type} onChange={changeGameState}>
                        <option value="0">Select Game Type </option>
                            {
                                gameTypes.map(
                                    gt => <option key={gt.id} value={gt.id}>{gt.label}</option>
                                )
                            }
                    </select>
                </div>
            </fieldset>
           
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: gameId,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.number_of_players),
                        skillLevel: parseInt(currentGame.skill_level),
                        gameType: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}