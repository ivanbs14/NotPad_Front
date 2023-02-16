import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

import {  api } from '../../services/api'

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { Conteiner, Profile, Logout } from './styles';

export function Header() {
    const { signOut, user } = useAuth();
    /* houve ajuste 003 consultar na lupa */
    const navigate = useNavigate();

    function handleSignOut() {
        navigate("/")
        signOut();
    }

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    return(
        <Conteiner>
            <Profile to="/profile">
                <img 
                    src={avatarUrl}
                    alt={user.name}
                />

                <div>
                    <span>Bem vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            {/* houve ajuste 003 consultar na lupa */}
            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>

        </Conteiner>
    );
}