import { Link, Navigate, Outlet } from "react-router-dom";

export default function DefualtLayout() {


    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
               
                </header>

                <main>
                    <Outlet />

                </main >
            </div>

        </div>
    )
}
