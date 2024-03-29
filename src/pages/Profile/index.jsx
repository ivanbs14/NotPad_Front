import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import {  api } from '../../services/api'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { Conteiner, Form, Avatar } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Profile() {
    const { user, updateProfile } = useAuth();
    
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const navigate = useNavigate();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    function handleBack() {
        navigate(-1);
    }
    
    /* houve alteração, consulte ajuste 002 com a lupa */
    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        };

        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return(
        <Conteiner>
            <header>
                {/* houve modificação no button consulte ajuste 001 na pesquisa */}
                <button type='button' onClick={handleBack} className='btnBack'>
                    <FiArrowLeft size={24} />
                    <p>voltar</p>
                </button>
            </header>

            <Form>
                <Avatar>
                    <img 
                        src={avatar}
                        alt="imagem do usuário" 
                    />

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input 
                            id='avatar'
                            type="file"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>

                <Input 
                     placeholder="Nome"
                     type="text"
                     icon={FiUser} 
                     value={name}
                     onChange={e => setName(e.target.value)}
                />
                
                <Input 
                     placeholder="E-mail"
                     type="text"
                     icon={FiMail} 
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                />
                
                <Input 
                     placeholder="Senha atual"
                     type="password"
                     icon={FiLock} 
                     onChange={e => setPasswordOld(e.target.value)}
                />

                <Input 
                     placeholder="Nova senha"
                     type="password"
                     icon={FiLock} 
                     onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate} />

            </Form>

        </Conteiner>
    )
}