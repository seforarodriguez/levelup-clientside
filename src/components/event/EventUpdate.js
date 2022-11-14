import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent, getSingleEvent, updateEvent } from "../../managers/EventManager.js"
import { getGames } from '../../managers/GameManager.js'


export const UpdateEvent = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [currentEvent, setCurrentEvent] = useState({
        game: [],
        description: "",
        date: "",
        time: ""
    })
    const [games, setGames] =useState([])

    useEffect(() => {
        //fetching the game options for the events
        getSingleEvent(eventId).then(data => setCurrentEvent(data))
    }, [])


    useEffect(() => {
        //fetching the game options for the events
        getGames().then(data => setGames(data))
    }, [])

    
    const changeEventState = (domEvent) => {
    // how do I make the variables to be standard for the changeEvent state? 
    //with the event. target.id because it was set in the id input.
            const copy = {...currentEvent}
            copy[domEvent.target.id] = domEvent.target.value
            setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Games That can be picked for an Event: </label>
                    <select name="game" id="game" className="form-control" 
                    value={currentEvent.game} onChange={changeEventState}>
                        <option value="0">Select the Game you want to play</option>
                            {
                                games.map(
                                    game => <option key={game.id} value={game.id}>{game.title}</option>
                                )
                            }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of the Event: </label>
                    <input type="date" id="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" id="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
          
            
           
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id: eventId,
                        gameToPlay: currentEvent.game,
                        description: currentEvent.description,
                        dateOfEvent: currentEvent.date,
                        timeOfEvent: currentEvent.time
                    }

                    // Send POST request to your API
                    updateEvent(event)
                    .then(() => navigate({ pathname:"/events"}))
                }}
                className="btn btn-primary">Update Info!</button>
        </form>
    )
}