"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
require("dotenv").config();
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const apollo_server_express_1 = require("apollo-server-express");
const HelloResolver_1 = require("./resolvers/HelloResolver");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const AppDataSource = new typeorm_1.DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: ["dist/enitity/*.js"],
    });
    yield AppDataSource.initialize();
    const app = (0, express_1.default)();
    app.use(cookieParser());
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [HelloResolver_1.HelloResolver],
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema,
        context: ({ req, res }) => ({ req, res }),
        persistedQueries: false,
        cache: "bounded",
    });
    yield server.start();
    server.applyMiddleware({
        app,
        cors: {
            origin: ["http://localhost:3000", "https://studio.apollographql.com"],
            credentials: true,
        },
    });
    app.listen(process.env.PORT || 4000, () => {
        console.log("Server started on http://localhost:4000 🚀 ");
    });
});
main();
//# sourceMappingURL=index.js.map