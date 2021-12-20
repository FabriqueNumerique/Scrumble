import Controller from "../core/Controller.js";
// import Joueur from '../model/Joueur.js';
export default class Etape1 extends Controller {

    constructor() {

        super()
        const form = document.getElementById("formJoueur")
        let nbrejouer = document.getElementById("valeurjoueur");
   
        this.traitementformulaire();   
        this.modificationNbreChamps();
        this.creerInputJoueur(form, nbrejouer.value)
    }

    traitementformulaire(){

        const form = document.getElementById("formJoueur")
        form.addEventListener("submit", e => {
            e.preventDefault()

            new FormData(form);
        })

        form.addEventListener("formdata", (e) => {
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
        const form = document.getElementById("formJoueur")
        let nbrejouer = document.getElementById("valeurjoueur");
        nbrejouer.addEventListener("change", e => {
            this.creerInputJoueur(form, e.target.value);
        })
    }
    creerInputJoueur(form, nombreDeJoueur) {
        let html = "";
        for (let index = 0; index < nombreDeJoueur; index++) {
            //console.log(html, form)
            html += this.rendreInputBloc(`name#${index}`, `statut#${index}`)
        }
        html += "<button class='reussite'>Passez a l'Etape Suivante</button>"
        form.innerHTML = html;
    }

    rendreInputBloc(nomAtr, statutAtr) {
        //console.log(nomAtr, statutAtr);
        return `
        <div class="repartition" style="width:100%; margin-right:3%;">
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
