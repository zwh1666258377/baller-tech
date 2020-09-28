'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const express_1 = __importDefault(require('express'));
const http_errors_1 = __importDefault(require('http-errors'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const morgan_1 = __importDefault(require('morgan'));
const body_parser_1 = __importDefault(require('body-parser'));
// import Schema from './schema';
const express_session_1 = __importDefault(require('express-session'));
const connect_mongo_1 = __importDefault(require('connect-mongo'));
// import { WhiteList } from './auth/auth';
const accessControlAllowOrigin_1 = require('./lib/accessControlAllowOrigin');
const path_1 = __importDefault(require('path'));
const MongoStore = connect_mongo_1.default(express_session_1.default);
class App {
  constructor() {
    this.app = express_1.default();
    this.catchWarning = () => {
      // catch 404 and forward to error handler
      this.app.use(function(req, res, next) {
        next(http_errors_1.default(404));
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
      this.app.use(
        express_1.default.static(
          path_1.default.join(__dirname, '../../public'),
        ),
      );
    };
    this.setMiddleWares = () => {
      this.app.use(morgan_1.default('dev'));
      this.app.use(cookie_parser_1.default());
      this.app.use(body_parser_1.default.json({ limit: '10mb' }));
      this.app.use(
        body_parser_1.default.urlencoded({
          limit: '10mb',
          extended: true,
          parameterLimit: 50000,
        }),
      );
      this.app.use(
        express_session_1.default({
          secret: 'superPotatoes',
          resave: true,
          saveUninitialized: true,
          rolling: true,
          cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
          store: new MongoStore({
            mongooseConnection: mongoose_1.default.connection,
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
      mongoose_1.default
        .connect('mongodb://root:123456@localhost/eatSaas?authSource=admin', {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB connected, compile Successed!'))
        .catch(err => console.log(err));
    };
    // connect db
    this.connectDb();
    // 设置允许跨域
    accessControlAllowOrigin_1.setAccessControlAllowHeaders(this.app);
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
exports.default = new App().app;
