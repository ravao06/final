import { useState } from "react";
import { useFetchApi } from "./hooks/useFetchApi";
import delay from "./utils/delay";
import { styles } from "./styles";
import ContainerCaptcha from "./components/ContainerCaptcha";

function App() {
  const [n, setN] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); 

  const { fetchApi } = useFetchApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (n < 1 || n > 1000) {
      console.error("Veuillez entrer un nombre entre 1 et 1000 !");
      return;
    }

    setSequence([]);
    setLoading(true);
    setFormSubmitted(true);

    for (let i = 1; i <= n; i++) {
      try {
        await delay(1000); 
        const response = await fetchApi("https://api.prod.jcloudify.com/whoami", {
          method: "GET",
        });

        if (response.ok) {
          setSequence((prev) => [...prev, `${i}. Forbidden`]);
        } else {
          throw new Error("Erreur : captcha requis !");
        }
      } catch (error) {
        console.error(`Erreur pendant la requête à l'itération ${i} :`, error.message);
        break;
      }
    }

    setLoading(false);

    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div style={styles.container}>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="n" style={styles.label}>Acceuil :</label>
            <input
              type="number"
              onChange={(e) => setN(Number(e.target.value))}
              placeholder="Un nombre N entre 1 à 1_000"
              id="n"
              value={n}
              name="n"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Chargement..." : "Valider"}
          </button>
        </form>
      ) : (
        <div style={styles.result}>
          <p>Séquence attendue :</p>
          <ul style={styles.list}>
            {sequence.map((line, index) => (
              <li key={index} style={styles.listItem}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ContainerCaptcha />
    </div>
  );
}

export default App;
