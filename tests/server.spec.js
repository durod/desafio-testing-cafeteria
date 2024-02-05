const request = require("supertest");
const app = require("../index");

describe("GET /cafes", () => {
    it("debería devolver un status code 200 y un arreglo con al menos 1 objeto", async () => {
        const response = await request(app).get("/cafes");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
});

describe("DELETE /cafes/:id", () => {
    it("debería devolver un status code 404 si se intenta eliminar un café con un id que no existe", async () => {
        const nonExistentId = 999;
        const response = await request(app).delete(`/cafes/${nonExistentId}`);
        expect(response.statusCode).toBe(404);
    });
});

describe("POST /cafes", () => {
    it("debería agregar un nuevo café y devolver un status code 201", async () => {
        const newCafe = {
            id: 5,
            nombre: "Café Nuevo"
        };
        const response = await request(app)
            .post("/cafes")
            .send(newCafe);
        expect(response.statusCode).toBe(201);
    });
});

describe("PUT /cafes/:id", () => {
    it("debería devolver un status code 400 si intenta actualizar un café con un id diferente al id en el payload", async () => {
        const cafeToUpdate = {
            id: 4,
            nombre: "Cappuccino Modificado"
        };
        const response = await request(app)
            .put(`/cafes/${cafeToUpdate.id}`)
            .send(cafeToUpdate);
        expect(response.statusCode).toBe(400);
    });
});
