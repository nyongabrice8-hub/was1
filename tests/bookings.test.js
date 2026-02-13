const request = require('supertest');
const app = require('../app'); // Adjust the path according to your app

describe('Booking Endpoints', () => {
    let bookingId;

    // Test for creating a booking
    it('should create a booking', async () => {
        const res = await request(app)
            .post('/api/bookings')
            .send({
                user: 'user123',
                hotel: 'hotel123',
                startDate: '2026-03-01',
                endDate: '2026-03-05'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        bookingId = res.body.id;
    });

    // Test for retrieving a booking
    it('should retrieve a booking', async () => {
        const res = await request(app).get(`/api/bookings/${bookingId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', bookingId);
        expect(res.body).toHaveProperty('user', 'user123');
    });

    // Test for payment processing
    it('should process payment for a booking', async () => {
        const res = await request(app)
            .post(`/api/bookings/${bookingId}/payment`)
            .send({
                paymentMethod: 'credit_card',
                amount: 100.00
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'success');
    });
});
