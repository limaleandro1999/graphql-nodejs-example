import express from 'express';
import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';

import schema from '../graphql/schema';
import db from './../models';

class Server {
    app: express.Application;
    private server: ApolloServer;

    constructor() {
        this.app = express();
        this.app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));
        this.server = new ApolloServer({
            typeDefs: schema.typeDefs,
            resolvers: schema.resolvers,
            context: { db },
        });
        this.server.applyMiddleware({ app: this.app });
    }

    async startServer(): Promise<void> {
        try {
            await db.sequelize.sync();
            this.app.listen({ port: 4000 }, () =>
                console.log(`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`),
            );
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Server();
