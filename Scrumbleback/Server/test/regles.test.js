const request = require('supertest')('http://localhost:3051/api');
// const assert = require('assert');
const chai = require('chai');
let expect = chai.expect;

let id;
let title;
let resume;
describe('regles',function (){
    it("returns all regles",async function(){
        const res = await request.get('/regles');
        console.log("res:",res.body);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(6);
    });

    it('envoie d une regle',async function(){
        const res = await request.post('/regles')
        .send({titre:'Titre Test',contenu:'description test: lalallalalla',img:'xxx.jpg',texte:'lorem Ipsum',video:'xxx.mp4'})
        expect(res.status).to.eql(200);
        const attributes = res.body;
        id=attributes._id;
        title=attributes.titre;
        resume=attributes.texte;
        console.log(id,title);
   
        // expect(attributes).to.include.keys("lu")
        expect(attributes.titre).to.eql('Titre Test');
        expect(attributes.titre).to.be.a('string');
   
        expect(attributes).to.have.own.property('contenu');
        expect(attributes.contenu).to.eql( 'description test: lalallalalla');
        expect(attributes.contenu).to.be.a('string');
   
        expect(attributes).to.have.own.property('img');
        expect(attributes.img).to.be.a('string');
        expect(attributes.img).to.eql('xxx.jpg');
   
        expect(attributes).to.have.own.property('texte');
        expect(attributes.texte).to.be.a('string');
        expect(attributes.texte).to.eql('lorem Ipsum');
   
        expect(attributes).to.have.own.property('video');
        expect(attributes.video).to.be.a('string');
        expect(attributes.video).to.eql('xxx.mp4');
        
    })
    it('modifier une regle',async function(){
        console.log(id);
           const res = await request.patch('/regles/'+id)
           .set({titre:title,texte:resume})
           .send({titre:"Le Jeu",texte:'Lorem ipsum dolor sit amet. In vitae dignissimos quo libero delectus ut rerum enim et voluptas perferendis'})
           expect(res.status).to.eql(200);
           const attributes = res.body;
   
           expect(attributes).to.have.own.property('titre');
           expect(attributes.titre).to.be.a('string');
           expect(attributes.titre).to.eql('Le Jeu');
   
           expect(attributes).to.have.own.property('texte');
           expect(attributes.texte).to.be.a('string');
           expect(attributes.texte).to.equal('Lorem ipsum dolor sit amet. In vitae dignissimos quo libero delectus ut rerum enim et voluptas perferendis');
   
           expect(attributes).to.have.own.property('contenu')
           expect(attributes).to.have.own.property('img')
           expect(attributes).to.have.own.property('video')
          
           
       })
       it('supprimmer une regle',async function(){
        console.log(id);
           const res = await request.delete('/regles/'+id)
           const attributes = res.body;
           expect(res.status).to.eql(204);
   
           it("returns all regle",async function(){
               const res = await request.get('/regles/'+id);
               // console.log("res:",res.body);
               expect(res.status).to.not.eql(200);
               expect(attributes._id).to.equal('');
               expect(attributes).to.not.have.own.property('video')
            
           });    
   
           
       })
})

