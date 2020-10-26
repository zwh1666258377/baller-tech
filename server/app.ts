import mongoose from 'mongoose';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sha1 } from 'utility';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { resolve } from 'path';
import { WhiteList } from './auth';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import path from 'path';
import { updateModule } from './api/update-module';
import { getModule } from './api/get-module';
import dotenv from 'dotenv';
import { authCheck } from './api/check';
import { uploadImg, uploadMp3, uploadMp4 } from './api/upload-files';
import { imgList, mp4List, mp3List } from './api/file-list';
import { UserSchema } from './schema/model/user';
import { login } from './api/login';
import { logout } from './api/logout';
import { getFile } from './api/get-file';
import { removeImg, removeMp3, removeMp4 } from './api/remove-file';
import { getWebsite } from './api/get-website';
import { updateWebsite } from './api/update-website';
import { ballerTechJQFY } from './api/baller-tech-jqfy';
import { ballerTechYYSB } from './api/baller-tech-yysb';
import { ballerTechWZSB } from './api/baller-tech-wzsb';
import { bt } from './router/bt';

dotenv.config('../.env' as any);

const MongoStore = connectMongo(session);

class App {
  app = express();

  constructor() {
    // connect db
    this.connectDb();
    // 设置允许跨域
    // setAccessControlAllowHeaders(this.app);
    this.app.use(cors());
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
    this.app.use('/static', express.static(path.resolve('static')));
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
    login(this.app);
    logout(this.app);
    authCheck(this.app);

    getFile(this.app);
    getModule(this.app);
    updateModule(this.app);

    removeImg(this.app);
    removeMp3(this.app);
    removeMp4(this.app);

    uploadImg(this.app);
    uploadMp3(this.app);
    uploadMp4(this.app);

    imgList(this.app);
    mp3List(this.app);
    mp4List(this.app);

    getWebsite(this.app);
    updateWebsite(this.app);

    bt(this.app);

    // Baller Tech API
    ballerTechJQFY(this.app);
    ballerTechYYSB(this.app);
    ballerTechWZSB(this.app);
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
