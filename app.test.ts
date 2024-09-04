'use strict'
const request = require('supertest');
const test_pgp = require('pg-promise')
const my_module = require('./app')
const test_app = my_module.app
const test_db = my_module.db

describe('To-Do App API', () => {
    let server;

    beforeAll(() => {
        server = test_app.listen(5000);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should create a new task', async () => {
        const response = await request(server)
            .post('/create_todo')
            .send({ todo_name: 'Test Task' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task added successfully!');
    });

    it('should fetch all tasks', async () => {
        const response = await request(server).get('/get_todos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update a task', async () => {
        // First, create a task to update
        await request(server).post('/create_todo').send({ todo_name: 'Task to Update' });

        const response = await request(server)
            .put('/update_todo/1')  // Assuming the task ID is 1
            .send({ todo_name: 'Updated Task' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task updated successfully!');
    });

    it('should delete a task', async () => {
        // First, create a task to delete
        await request(server).post('/create_todo').send({ todo_name: 'Task to Delete' });

        const response = await request(server).delete('/delete_todo/1');  // Assuming the task ID is 1

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted successfully!');
    });
});
