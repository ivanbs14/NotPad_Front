import { Routes, Route } from "react-router-dom";

import { NewNot } from '../pages/NewNot';
import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { Profile } from '../pages/Profile';

export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/new" element={<NewNot />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/details/:id" element={<Details />}/>

        </Routes>
    )
}