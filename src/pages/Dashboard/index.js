import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [ inputError, setInputError ] = useState('');
  const [ newProfile, setNewProfile ] = useState('');
  const [ profiles, setProfiles ] = useState(() => {
    const storageRepositories = localStorage.getItem('profiles');

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    return [];
  });

  async function addProfile(event) {
    event.preventDefault();
    
    if (!newProfile) {
      setInputError('Digite o perfil de um usuário no Github');
      return;
    }
    
    try {
      const response = await api.get(`/users/${newProfile}`);
      const profile = response.data;

      const updatedProfiles = [ ...profiles, profile ];
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      setProfiles(updatedProfiles);
      setNewProfile('');
      setInputError('');
    } catch (error) {
      setInputError('Erro ao buscar o perfil informado');
    }
  }

  return (
    <>
      <form onSubmit={addProfile}>
        <input
          value={newProfile}
          onChange={e => setNewProfile(e.target.value)}
          placeholder="Digite um perfil válido no Github"
        />
        <button type="submit">Pesquisar</button>
      </form>

      { inputError &&  <p id="error-message">{inputError}</p> }

      <div className="content">
        {
          profiles.map(profile => (
            <Link key={profile.id} to={`/repository/${profile.login}`}>
              <img
                src={profile.avatar_url}
                alt={profile.name}
              />
              <div>
                <strong>{profile.name}</strong>
                <p>{profile.bio}</p>
              </div>
              <FiChevronRight size={24} />
            </Link>
          ))
        }
      </div>
    </>
  );
}
