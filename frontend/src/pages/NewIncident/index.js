import React, {useState} from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

export default function NewIncident(){
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();

    const history = useHistory();
    async function handleSubmit(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers:{
                    Authorization: localStorage.ongId,
                }
            })
            history.push('/profile')
        } catch (err){
            alert('Não foi possível cadastrar o caso. Tente novamente.')
        }
    }

   

    return(
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft color="#E02041" size={16}/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="Nome do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Valor"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>        
    )
}