import countryRoutes from './country';
import fastify from 'fastify';
import { errorResponses } from '../core/responses';

export default function(app: fastify.FastifyInstance){

    app.register(countryRoutes, { prefix: '/' });

    app.setNotFoundHandler((req, res) => {
        res.code(404).send(errorResponses('001', 'Page not found', []));
    });

    app.setErrorHandler((error, req, res) => {
        const statusCode = error.statusCode
        if (statusCode >= 500) {
            app.log.error(error)
        } else if (statusCode >= 400) {
            app.log.info(error)
        } else {
            app.log.error(error)
        }
        res.code(500).send(errorResponses('001', 'Server error', []));
    });

}