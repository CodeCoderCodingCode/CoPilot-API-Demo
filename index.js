
//-----------------------------------------------------------------------------------------------Input
document.addEventListener('DOMContentLoaded', (event) => {
    const ownerField = document.getElementById('ownerField');
    const repoField = document.getElementById('repoField');
    const submitButton = document.getElementById('submitButton');
    const responseField = document.getElementById('responseField');

    //-------------------------------------------------------------------------------------------Submit Infos
    submitButton.addEventListener('click', function() {
        const owner = ownerField.value.trim();
        const repo = repoField.value.trim();
        ownerField.value = ''; // Clear the owner field
        repoField.value = ''; // Clear the repo field

        // Führe den API-Aufruf aus und zeige die Antwort an
        getResponse(owner, repo).then(response => {
            responseField.innerHTML = `<pre>${response}</pre>`;
            copyButton.disabled = false; // Aktiviere den Kopieren-Button
        }).catch(error => {
            responseField.innerHTML = `<p>Fehler: ${error.message}</p>`;
            copyButton.disabled = true; // Deaktiviere den Kopieren-Button
        });
    });
        //---------------------------------------------------------------------------------------Form Response
        getResponse(owner, repo).then(response => {
            responseField.innerHTML = `<pre>${"Repo-Daten:\n"}, ${response}</pre>`;
        }).catch(error => {
            responseField.innerHTML = `<p>Fehler: ${error.message}</p>`;
        });
    });
        //----------------------------------------------------------------------------------------Output
    async function getResponse(owner, repo) {
        const token = '############################################';               //-->>  !!UPDATE API KEY!!
        const url = `https://api.github.com/repos/${owner}/${repo}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Netzwerkantwort war nicht ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return JSON.stringify(data, null, 2);

};

//Copy Infos
copyButton.addEventListener('click', function() {
    const responseText = responseField.innerText;
    if (responseText) {
        navigator.clipboard.writeText(responseText).then(() => {
            alert('Antwort wurde kopiert!');
        }).catch(err => {
            alert('Fehler beim Kopieren: ' + err);
        });
    } else {
        alert('Keine Antwort zum Kopieren vorhanden.');
    }
});