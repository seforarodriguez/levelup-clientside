import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const [ doDelete, SetDoDelete] = useState(false)
    const [ joined, setJoined ] = useState(false)
    const navigate = useNavigate()

    // const updateEventList = () => {
    //     getEvents().then(data => setEvents(data))
    // }

    const changeButton = () => {
        joined ? <button className='button' onClick={(ev)=>joinEvent(ev.target.id)}> Join</button>
        :<button className='button' onClick={(ev)=>leaveEvent(ev.target.id)}>Leave </button>
    }


    useEffect(() => {
        // updateEventList()
        getEvents().then(data => setEvents(data))
    }, [doDelete])

    return (
        <article className="events">
        <button className="button"
                    onClick={() => {
                        navigate('/events/new')
                                }}> + Register a new Event</button> 
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">The game's id that will be played is {event.game}</div>
                        <div className="event__description">This game is about: {event.description}</div>
                        <div className="event__date">Day of the Event:{event.date}</div>
                        <div className="event__time"> Time of the Event: {event.time}</div>
                        <div className="event__organizer"> Organized by: {event.organizer}</div>
                        <button className="button" onClick={() => {navigate(`/events/new/${event.id}`)}}> Edit This Event </button>
                        <button className="button" onClick={() => {
                            deleteEvent(event.id).then(()=> SetDoDelete(true))
                        }}> Delete This Event </button>

                        <button onClick={() => setJoined(true).then(()=> changeButton())}> </button>
                        

                    </section>
                })
            }
        </article>
    )
}