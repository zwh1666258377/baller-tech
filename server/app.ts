import mongoose from 'mongoose';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import { sha1 } from 'utility';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { resolve } from 'path';
import { WhiteList } from './auth';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { setAccessControlAllowHeaders } from './lib/accessControlAllowOrigin';
import path from 'path';
import { updateModule } from './api/update-module';
import { getModule } from './api/get-module';
import dotenv from 'dotenv';
import { UserSchema } from './schema/model/user';
import { login } from './api/login';
import { logout } from './api/logout';
import { authCheck } from './api/check';

dotenv.config('../.env' as any);

const MongoStore = connectMongo(session);

class App {
  app = express();

  constructor() {
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

  catchWarning = () => {
    // catch 404 and forward to error handler
    this.app.use(function(req: any, res: any, next: any) {
      next(createError(404));
    });

    // error handler
    this.app.use(function(err: any, req: any, res: any, next: any) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  };

  setStatic = () => {
    // 后端静态文件目录
    this.app.use(express.static(path.join(__dirname, '../../public')));
  };

  setMiddleWares = () => {
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
        secret: 'ballerTech', //加密字符串也可以写数组
        resave: true, //强制保存session 建议设置成false
        saveUninitialized: true, //强制保存未初始化的内容
        rolling: true, //动态刷新页面cookie存放时间
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }, //保存时效
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
        }),
      }),
    );
    this.app.use((req, res, next) => {
      const Req = req as any;

      if (!!Req.session.sessionId || WhiteList(req.path)) {
        next();
      } else {
        res.json({
          status: 'error',
          subKind: 'not_logged_in',
          msg: '抱歉，您尚未登录，暂无访问权限。',
        });
      }
    });
  };

  setViewsDir = () => {
    // 设置模版引擎跟目录
    this.app.set('views', resolve('./views'));
    // 设置模版引擎类型
    this.app.set('view engine', 'ejs');
  };

  setRoutes = () => {
    updateModule(this.app);
    getModule(this.app);
    login(this.app);
    logout(this.app);
    authCheck(this.app);
  };

  connectDb = () => {
    mongoose
      .connect('mongodb://root:123456@localhost/ballerTech?authSource=admin', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async r => {
        console.log('MongoDB connected, compile successed!');
        const user = {
          account: 'root',
          password: '123456',
        };
        if (!!process.env?.USER_ACCOUNT && !!process.env?.USER_PASSWORD) {
          user.account = process.env?.USER_ACCOUNT;
          user.password = process.env?.USER_PASSWORD;
        }
        const count = await UserSchema.countDocuments({});

        if (count > 0) {
          await r.connection.db.dropCollection('users');
        }

        await UserSchema.create({
          account: user.account,
          password: sha1(user.password),
        });

        console.log('User init successed!');
        console.log(`Account:${user.account}`);
        console.log(`Password:${user.password}`);
      })
      .catch(err => console.log(err));
  };
}

export default new App().app;
