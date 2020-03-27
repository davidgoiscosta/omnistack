import React, {useEffect, useState} from 'react'
import './styles.css'
import imgLogo from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('/profiles', {
            headers: {
                Authorization: localStorage.ongId
            }
        }).then(response => {
            setIncidents(response.data.incidents)
        })
    }, [localStorage.ongId])
    async function handleDelete(id){
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: localStorage.ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id));
            alert('Caso removido com sucesso')

        } catch(err){
            alert('Não foi possível excluir o caso')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={imgLogo} alt="Be the hero"/>
                <span>Bem-vinda, {localStorage.ongName}</span>

                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout}>
                    <FiPower size="18" color="#E02041"/>
                </button>
            </header>
            <h1>
                Casos cadastrados
            </h1>
            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR</strong>
                            <p>{Intl.NumberFormat("pt-BR",{ style: "currency", currency: 'BRL'}).format(incident.value)}</p>

                             <button onClick={() => handleDelete(incident.id)}>
                                <FiTrash2 size={20} color="#A8A8B3"/>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}