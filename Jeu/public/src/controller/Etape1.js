import Controller from "../core/Controller.js";

/** Préparer le jeu */
export default class Etape1 extends Controller {

    constructor() {
        super()
        this.form = document.getElementById("formJoueur"); // Récupérer le formulaire dans le HTML
        let nbrejouer = document.getElementById("valeurjoueur");
   
        this.traitementformulaire();   
        this.modificationNbreChamps();
        this.creerInputJoueur(this.form, nbrejouer.value)
    }
    /** Récupérer les données du formulaire */
    traitementformulaire(){
        this.form.addEventListener("submit", e => {
            e.preventDefault()
            new FormData(this.form);
        })
        // Ecouteur sur le formulaire
        this.form.addEventListener("formdata", (e) => {
            const data = e.formData;
            if (data.get("name") === " " && (data.get("statut") === "statut" || data.get("statut") === "")) return;

            //console.log(data.entries());

            const joueurs = [];

            for (const item of data) {
                //console.log(item);
                const info = item[0].split('#');
                //console.log("item:" + item[0]);
                const key = info[0];
                //console.log("info:" + info[0])
                const id = info[1];
                //console.log("id:" + id);
                const value = item[1];

                joueurs[id] = {
                    ...joueurs[id],
                    [key]: value
                }
            }

            this.state.joueurs = joueurs
            //console.log(this.state.joueurs);

            this.go("/etape2");
        })

    }
    modificationNbreChamps(){
        let nbrejouer = document.getElementById("valeurjoueur");
        nbrejouer.addEventListener("change", e => {
            this.creerInputJoueur(this.form, e.target.value);
        })
    }
    creerInputJoueur(form, nombreDeJoueur) {
        let html = "";
        for (let index = 0; index < nombreDeJoueur; index++) {
            //console.log(html, form)
            html += this.rendreInputBloc(`name#${index}`, `statut#${index}`)
        }
        html += "<button class='reussite'>Passez a l'Etape Suivante</button>"
        this.form.innerHTML = html;
    }

    rendreInputBloc(nomAtr, statutAtr) {
        //console.log(nomAtr, statutAtr);
        return `
        <div>
            <input class="inputtext" type="text" name="${nomAtr}" Value="Beta">
            <select name="${statutAtr}" class="select">
                <option>Responsabilité</option>
                <option value="Scrum Master">Scrum Master</option>
                <option value="ProductOwner"> Product Owner</option>
                <option value="Developpeur"> Dévéloppeur </option>
            </select>
        </div>
      `
    }
}
