import React, { useState, useEffect } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import api from './services/api';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect( () => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
    
  }, []);

  async function handleAddDev(data) {
    
    const response = await api.post('/devs', data);

    // cria novo array e adiciona um elemento no final
    setDevs([...devs, response.data]);

    console.log(response.data);
    
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map( dev => {
            return(
              <DevItem key={dev._id} dev={dev} />
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
