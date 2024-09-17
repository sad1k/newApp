const ApiError = require("../error/ApiError");
const { User, Like, Article, Comment } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const getUserData = require("../utils/getUserData");

function generateJwt(id, email, role, avatar) {
  return jwt.sign({ id: id, email, role, avatar }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
}


class UserController {
  async registration(req, res, next) {
    let { email, password, role } = req.body;
    if (!email && !password) {
      return next(ApiError.badRequest("Некорректный Email или пароль"));
    }
    const candidate = await User.findOne({
      where: { email },
    });
    if (candidate) {
      return next(ApiError.badRequest("Пользователь существует"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      password: hashPassword,
      role,
      avatar: null,
    });
    const token = generateJwt(user.id, user.email, user.role, user.avatar);
    return res.json({ token });
  }

  async googleRegistration(req, res, next){

  }

  async oAuthSignIn(req, res, next) {
    
    const redirectUrl = "http://localhost:5000/api/user/oauth";
    console.log(process.env.CLIENT_ID)
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/userinfo.profile openid", 'https://www.googleapis.com/auth/userinfo.email'],
      prompt: "consent",
    });

    return res.json({ url: authorizeUrl });
  }


  async getOAuth(req, res) {
    console.log('aboba')
    const code = req.query.code;
    try {
      const redirectUrl = "http://localhost:5000/api/user/oauth";
      const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
      );
      const response = await oAuth2Client.getToken(code);
      await oAuth2Client.setCredentials(response.tokens);
      console.log("Tokens acquired");
      const user = oAuth2Client.credentials;
      console.log("credentials", user);
      let userData = await getUserData(user.access_token);
      const { email, picture } = userData;
      let userFromDb = await User.findOne({ where: { email } });
      if(!userFromDb){
        userFromDb = await User.create({
          email,
          password: "google",
          role: 'USER',
          avatar: picture,
        });
      }
      const token = generateJwt(userFromDb.id, userFromDb.email, userFromDb.role, userFromDb.avatar);
      
      
      
    } catch (err) {
      console.log(err);
    }

    res.redirect('http://localhost:3000')
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователя не существует"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role, user.avatar);
    return res.json({ token });
  }

  async check(req, res, next) {
    console.log(req.user);
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.role,
      req.user.avatar
    );

    return res.json({ token });
  }

  async uploadAvatar(req, res, next) {
    try {
      console.log(req.file);
      if (req.file) {
        const candidate = await User.findOne({
          where: { email: req.user.email },
        });
        await candidate.update({
          avatar: req.file.path,
        });
        console.log(candidate);
        const token = generateJwt(
          candidate.id,
          candidate.email,
          candidate.role,
          req.file.path
        );
        return res.json({ token });
      }
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getUserById(req, res, next) {
    let { id } = req.params;
    if(!id || !Number.isInteger(id)){
      id = req.user.id;
    }
    try {
      const user = await User.findOne({
        where: { id },
      });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
      return res.json({ user });
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async updateUser(req, res, next) {
    const { id } = req.params;
    const { email, name, bio, location } = req.body;

    if (id !== req.user.userId) {
      return res.status(403).json({ error: "Нет доступа" });
    }

    try {
      if (email) {
        const exsitingUser = await User.findOne({
          where: { email },
        });
        if (exsitingUser && exsitingUser.id !== id) {
          return res.status(400).json({ error: "Почта уже используется" });
        }
        const user = await User.update({
          where: { id },
          data: {
            email: email || undefined,
            bio: bio || undefined,
            location: location || undefined,
          },
        });
        return res.json({ user });
      }
    } catch (e) {
      console.error("Update user error", e);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new UserController();
