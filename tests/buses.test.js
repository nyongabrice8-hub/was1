const request = require('supertest');
const app = require('../app'); // Adjust the path to your app

describe('Bus Endpoints', () => {
    // Test for searching buses
    describe('GET /api/buses/search', () => {
        it('should search for buses based on query', async () => {
            const res = await request(app)
                .get('/api/buses/search?query=city'); // replace 'city' with an actual query
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('buses');
        });
    });

    // Test for retrieving a bus by ID
    describe('GET /api/buses/:id', () => {
        it('should retrieve a bus by its ID', async () => {
            const busId = 1; // Replace with a valid bus ID
            const res = await request(app).get(`/api/buses/${busId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', busId);
        });
    });

    // Admin operations - Test for creating a bus
    describe('POST /api/buses', () => {
        it('should create a new bus', async () => {
            const newBus = { name: 'Bus 1', capacity: 50 }; // Adjust as necessary
            const res = await request(app)
                .post('/api/buses')
                .send(newBus);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });
    });

    // Admin operations - Test for updating a bus
    describe('PUT /api/buses/:id', () => {
        it('should update a bus by ID', async () => {
            const busId = 1; // Replace with a valid bus ID
            const updatedBus = { name: 'Updated Bus', capacity: 60 }; // Adjust as necessary
            const res = await request(app)
                .put(`/api/buses/${busId}`)
                .send(updatedBus);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('name', 'Updated Bus');
        });
    });

    // Admin operations - Test for deleting a bus
    describe('DELETE /api/buses/:id', () => {
        it('should delete a bus by ID', async () => {
            const busId = 1; // Replace with a valid bus ID
            const res = await request(app)
                .delete(`/api/buses/${busId}`);
            expect(res.statusCode).toEqual(204);
        });
    });
});