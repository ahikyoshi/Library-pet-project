// Core
import { FC } from "react"
import { Link, Outlet } from "react-router-dom"

export const Layout: FC = () => {

    return (
        <>
            <header>
                <Link to="/">Главная</Link>
                <Link to="/settings">Настройки</Link>
                <Link to="/book">Book</Link>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>Футер</footer>
        </>
    )
}
