import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">The game's id that will be played is {event.game}</div>
                        <div className="event__description">This game is about: {event.description}</div>
                        <div className="event__date">Day of the Event:{event.date} players needed</div>
                        <div className="event__time"> Time of the Event: {event.time}</div>
                        <div className="event__organizer"> Organized by: {event.organizer}</div>
                    </section>
                })
            }
        </article>
    )
}