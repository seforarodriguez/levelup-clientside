import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    // const [chosenGameTypes, setChosenGameTypes] = useState([])
    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "", 
        gameTypeId: 0
    })


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
                    <input type="text" id="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">How many Players are needed? </label>
                    <input type="text" id="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Game Types: </label>
                    <select name="gameTypeId" id="gameTypeId" className="form-control" 
                    value={currentGame.gameTypeId} onChange={changeGameState}>
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
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameType: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}