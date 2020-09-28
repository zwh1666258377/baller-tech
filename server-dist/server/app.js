import mongoose from 'mongoose';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
// import Schema from './schema';
import session from 'express-session';
import connectMongo from 'connect-mongo';
// import { WhiteList } from './auth/auth';
import { setAccessControlAllowHeaders } from './lib/accessControlAllowOrigin';
import path from 'path';
const MongoStore = connectMongo(session);
class App {
  constructor() {
    this.app = express();
    this.catchWarning = () => {
      // catch 404 and forward to error handler
      this.app.use(function(req, res, next) {
        next(createError(404));
      });
      // error handler
      this.app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });
    };
    this.setStatic = () => {
      // 后端静态文件目录
      this.app.use(express.static(path.join(__dirname, '../../public')));
    };
    this.setMiddleWares = () => {
      this.app.use(logger('dev'));
      this.app.use(cookieParser());
      this.app.use(bodyParser.json({ limit: '10mb' }));
      this.app.use(
        bodyParser.urlencoded({
          limit: '10mb',
          extended: true,
          parameterLimit: 50000,
        }),
      );
      this.app.use(
        session({
          secret: 'superPotatoes',
          resave: true,
          saveUninitialized: true,
          rolling: true,
          cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
          store: new MongoStore({
            mongooseConnection: mongoose.connection,
          }),
        }),
      );
      // this.app.use((req, res, next) => {
      //     const Req = req as any;
      //     if (!!Req.session.sessionId || WhiteList(req.path)) {
      //         next()
      //     } else {
      //         res.json({
      //             data: {
      //                 status: 'error',
      //                 subKind: 'not_logged_in',
      //                 msg: "抱歉，您尚未登录，暂无访问权限。"
      //             }
      //         })
      //     }
      // })
    };
    this.setRoutes = () => {
      // this.app.use('/api/graphiql', graphqlHTTP((req: any, res: any) => {
      //     const { permission } = req.session
      //     const query = req.query.query || req.body.query;
      //     if (query && query.length > 2000) {
      //         throw new Error('Query too large.');
      //     }
      //     return {
      //         schema: Schema,
      //         graphiql: (isArray(permission) ? permission : []).includes('root'),
      //         rootValue: {
      //             req,
      //             res
      //         }
      //     }
      // }));
    };
    this.connectDb = () => {
      mongoose
        .connect('mongodb://root:123456@localhost/eatSaas?authSource=admin', {
          useCreateIndex: true,
          useNewUrlParser: true,
        })
        .then(() => console.log('MongoDB connected, compile Successed!'))
        .catch(err => console.log(err));
    };
    // connect db
    this.connectDb();
    // 设置允许跨域
    setAccessControlAllowHeaders(this.app);
    // set middle ware
    this.setMiddleWares();
    // set routes
    this.setRoutes();
    // set static
    this.setStatic();
    // catch warining
    this.catchWarning();
  }
}
export default new App().app;
//# sourceMappingURL=app.js.map
