/**
 * Primary file for your Clustered API Server
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import * as express from 'express';

import Bootstrap from '../middlewares/Kernel';
import Locals from './Locals';
import router from './Routes';

class Express {
	/**
	 * Create the express object
	 */
	public express;

	/**
	 * Initializes the express server
	 */
	constructor () {
		this.express = express();

		this.mountDotEnv();
		this.mountMiddlewares();
		this.mountRoutes();
	}

	private mountDotEnv (): void {
		this.express = Locals.init(this.express);
	}

	/**
	 * Mounts all the defined middlewares
	 */
	private mountMiddlewares (): void {
		this.express = Bootstrap.init(this.express);
	}

	/**
	 * Mounts all the defined routes
	 */
	private mountRoutes (): void {
		this.express.use('/', router);
	}

	/**
	 * Starts the express server
	 */
	public init (): any {
		this.express.listen(process.env.PORT, _error => {
			if (_error) {
				return console.log('Error: ', _error);
			}

			return console.log('\x1b[36m%s\x1b[0m', `Server is running on port '${process.env.PORT}'`);
		});
	}
}

/** Export the express module */
export default new Express();
