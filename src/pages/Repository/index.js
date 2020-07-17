import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiChevronRight, FiStar, FiEye } from 'react-icons/fi'
import { GoRepoForked } from 'react-icons/go'

import api from '../../services/api';

import './styles.css';

export default function Repository() {
  const { params } = useRouteMatch();
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get(`/users/${params.profile}/repos`).then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <>
      <h1>{params.profile}</h1>
      <div className="content">
        {
          repositories.map(repository => (
            <a href={repository.html_url} target="_blank">
              <div>
                <strong>{repository.name}</strong>
                <p>{repository.description}</p>
                <div className="detail">
                  <div className="detail-item">
                    <FiEye />
                    <span>{repository.watchers_count}</span>
                  </div>
                  <div className="detail-item">
                    <FiStar />
                    <span>{repository.stargazers_count}</span>
                  </div>
                  <div className="detail-item">
                    <GoRepoForked />
                    <span>{repository.forks_count}</span>
                  </div>
                </div>
              </div>
              <FiChevronRight size={24} />
            </a>
          ))
        }
      </div>
    </>
  );
}
