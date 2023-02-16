import { useNavigate } from "react-router-dom";

import { useState } from 'react';

import {  api } from '../../services/api'

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { Button } from '../../components/Button';
import { ButtonText } from "../../components/ButtonText";


import { Conteiner, Form } from './styles';

export function NewNot() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLinks] = useState("");
    
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLinks("");
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote() {
        if (!title) {
            return alert("Adicione um titulo para a nota");
        }
    
        if (newLink) {
            return alert("Você digitou um link no campo, mas não clicou em adicionar. Clique em adicionar ou deixe o campo vazio")
        }
    
        if (newTag) {
            return alert("Você digitou uma tag no campo, mas não clicou em adicionar. Clique em adicionar ou deixe o campo vazio")
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota criada com sucesso!");
        navigate(-1);
    }
   
    return(
        <Conteiner>
            <Header />

            <main>
                <Form>
                    <header>
                        {/* houve modificação no button consulte ajuste 001 na pesquisa */}
                        <h1>Criar nota</h1>
                        <ButtonText 
                            title="Voltar" 
                            onClick={handleBack}
                        />
                    </header>

                    <Input 
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Textarea 
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }

                        <NoteItem 
                            isNew
                            placeholder= "Novo link"
                            value={newLink}
                            onChange={e => setNewLinks(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>
                    
                    <Section title="Marcadores">
                        <div className='tags'>
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }

                            <NoteItem
                                isNew
                                placeholder="Nova tag"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button 
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Conteiner>
    )
}