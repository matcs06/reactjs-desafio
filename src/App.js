import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("/repositories", {
      title: `New repository ${Date.now()}`,
      url: `www.newrepo.${Date.now()}`,
      techs: ["React", "NodeJS", "React Native"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    console.log(response.data);
    setRepositories(repositories.filter((repo) => repo.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <div key={repo.id}>
              <li>{repo.title}</li>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </div>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
