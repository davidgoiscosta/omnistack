const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ong', () => {
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterEach(async()=>{
        await connection.destroy()
    })

    it('should be able to create a new ong', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD",
            email: "contato@apad.com",
            whatsapp: "4700000000",
            city: "rio do sul",
            uf: 'SC'
        });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    })
})