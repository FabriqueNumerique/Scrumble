// Boucle sur le nombre maximum de tailles de 0 à 4
for(let i=0; i<4; ++i){
    // Enregistre le filtrage des userstories en fonction de leur importance pour traiter chaque ligne une par une
    let p_tmp = paquets[0].filter(p => p.importance == i);
    // Dans le tableau de chaque ligne, on récupère les objets et on leur attribue des tailles aléatoires
    p_tmp.forEach(tmp => {
        setTaille(p_tmp, tmp); 
    })
}

function getPos(t, pos){
    return t.pos != pos;
}
// Paramétrer des tailles aléatoires en essayant d'éviter les doublons
function setTaille(tab, obj){
    let t = Math.floor(Math.random()*4);
        if(!p_tmp.find(tmp.taille == t)){
            tmp.taille = t;
        }else{
            setTaille();
        }}