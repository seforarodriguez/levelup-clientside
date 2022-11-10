import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
        <button className="button"
                    onClick={() => {
                        navigate('/games/new')
                                }}>Create a New Game</button> 
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">This game is called: {game.title} by {game.maker}</div>
                        <div className="game__players">Amount of players:{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level needed is {game.skill_level}</div>
                        <button className="button" onClick={() => {navigate(`/games/new/${game.id}`)}}> Edit This game </button>
                    </section>
                })
            }
        </article>
    )
}