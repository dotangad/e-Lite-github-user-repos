import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([
    {
      name: "adminer-serverless",
      html_url: "https://github.com/dotangad/adminer-serverless",
    },
  ]);

  const API_URL = (username) =>
    `https://api.github.com/users/${username}/repos`;

  const fetchData = async () => {
    const data = await (await fetch(API_URL(username))).json();
    setRepositories(
      data.map((repo) => {
        return {
          name: repo.name,
          html_url: repo.html_url,
        };
      })
    );
    setUsername("");
  };

  return (
    <div className="App">
      <h1>GitHub repository fetcher</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchData}>Fetch</button>
      </div>

      <ul>
        {repositories.map((repository) => (
          <li>
            <a target="_blank" href={repository.html_url}>
              {repository.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
