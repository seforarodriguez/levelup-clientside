import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

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
                    </section>
                })
            }
        </article>
    )
}