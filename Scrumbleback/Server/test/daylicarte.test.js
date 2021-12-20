const request = require('supertest')('http://localhost:3051/api');
// const assert = require('assert');
const chai = require('chai');
let expect = chai.expect
describe('GET /dayli',function (){
    it("returns all daylicarte",async function(){
        const res = await request.get('/dayli');
        console.log("res:",res.body);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(8);
    });
})
   let id;
   let title;
describe('Post /dayli',function(){
    it('envoie dune carte',async function(){
        const res = await request.post('/dayli').send({titre:'TITRE TEST',contenu:'description test: lalallalalla'})
        expect(res.status).to.eql(200);
        const attributes = res.body;
        id=attributes._id;
        title=attributes.titre;
        console.log(id,title);

        // expect(attributes).to.include.keys("lu")
        expect(attributes.titre).to.eql('TITRE TEST');
        expect(attributes.titre).to.be.a('string');
        expect(attributes.contenu).to.eql( 'description test: lalallalalla');
    })
})

describe('Put /dayli/:id',function(){
    it('modifier une carte',async function(){
     console.log(id);
        const res = await request.patch('/dayli/'+id)
        .set({titre:title})
        .send({titre:"Titre11"})
        expect(res.status).to.eql(200);
        const attributes = res.body;
        expect(attributes).to.have.own.property('titre')
        expect(attributes.titre).to.be.a('string');
        expect(attributes).to.have.own.property('contenu')
        // expect(attributes.property).to.eql('TITRE TEST');
        // expect(attributes.titre).to.eql('TITRE TEST');
        
    })
})

describe('delete /dayli/:id',function(){
    it('modifier une carte',async function(){
     console.log(id);
        const res = await request.delete('/dayli/'+id)
        const attributes = res.body;
        expect(res.status).to.eql(204);

        it("returns all daylicarte",async function(){
            const res = await request.get('/dayli/'+id);
            // console.log("res:",res.body);
            expect(res.status).to.not.eql(200);
            expect(attributes._id).to.equal('');
         
        });    

        // expect(attributes.property).to.eql('TITRE TEST');
        // expect(attributes.titre).to.eql('TITRE TEST');
        
    })
})



// const assert = require('assert');
// const axios = require('axios').default;
// const baseURL = 'http://localhost:3051/api';
// console.log(game);
// describe('get', function () {
//     it(' returns get for daylicarte', async () => {
//         const res = await axios.get(`${baseURL}/dayli`)

//         // console.log('res', res) // res.data
//         assert.equal(res.status, 200)
//         assert.equal(res.data.length, 8)

//         // assert.equal(res ,1959,'vaut 10.0')

//     })
// })
// describe('get/:id',function(){
//     it('returns get/:id',async()=>{
//         let _id='615e063361603f23f1104ea2';
//         const res = await axios.get(`${baseURL}/dayli/${_id}`)

//         // console.log('res', res) // res.data
//         assert.equal(res.status, 200)
//         assert.equal(res.data.length, 8)
//     })
// })