/**
 * Sera étendue par les controller pour permettre l'échange de données et leur historisation
 */
class Context {
  static instance;
  // Objet partagé entre les contrôleurs pour enregistrer les différents états
  state = {
    user:[],
    joueurs: [],
    tours: [],
    paquet:[],
    
    adminuserstories:[]
  };
  // ? Ca ressemble à un développeur qui se la joue mais il faudra vérifier
  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new Context();
    }
    return this.instance;
  }
}

export default Context;