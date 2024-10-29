const divToto = document.querySelector("#toto");
const addTaskForm = document.querySelector("#addTaskForm")

// Récupérer les données

let tasks = []
async function getData() {
    document.querySelector("submitButton").addEventListener('click', ()=>{
        event.preventDefault()
        
        const formData = new FormData(addTaskForm)
        const data = {
            title: formData.get('title'),
            deadline: new Date('2024-10-18'),
            status: 'InProgress'
        }

        // Insérer dans la base de données
        fetch("http://localhost:3000/tasks", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }).then ((response)=> {
            response.json().then((data)=> {
                // manque une ligne
                console.log(data);
            })
        })
    })
}

// Exécution de requêtes SQL depuis Node.js
async function getTasks() {
    const [rows, fields] = await promisePool.query('SELECT * FROM tasks');
    return rows;
  }
  