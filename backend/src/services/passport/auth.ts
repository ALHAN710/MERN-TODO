import { Request } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import JWT from "passport-jwt";
import { passportSecretKey, passportSignInKey, passportSignUpKey } from "../config";

const { Strategy: JWTStrategy, ExtractJwt } = JWT;

const prisma = new PrismaClient();

// Local Sign Up Passport middleware handler function
passport.use(
  passportSignUpKey,
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: Request, email: string, password: string, done) => {
      const { firstName, lastName } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user_: any = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      };
      try {
        const prismaUser = await prisma.user.create({
          data: {
            ...user_,
          },
        });
        console.log("Passport SignUp middleware", "User created successfully");
        await prisma.$disconnect();
        if(!prismaUser) done({ message: "Error: User not found" }, false, { message: "User not found options"})
        return done(null, prismaUser);
      } catch (error) {
        await prisma.$disconnect();
        console.log(
          "Passport SignUp middleware",
          "Error passport when creating user"
        );
        console.log(error);
        return done(error);
      }
    }
  )
);

// Local SignIn Passport middleware handler function
passport.use(
  passportSignInKey,
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        // console.log("Passport authenticate SignIn Strategy Middleware Handler : Email", email);
        // Retrieve the user from the database where email equal to the email as parameter
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // Check if the user is found in the database
        if (!user) {
          console.log("Passport authenticate SignIn Strategy Middleware Handler : User not found");
          return done({ message: "Error: User not found" }, false, {
            message: "Options: User not found",
          });
        }

        // Compare password
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
          console.log("Passport authenticate SignIn Strategy Middleware Handler : Invalide password");
          return done({ message: "Invalid LogIn credentials" }, false, {
            message: "Invalid LogIn credentials",
          });
        }

        console.log("Passport authenticate SignIn Strategy Middleware Handler : LogIn successfull");
        await prisma.$disconnect();
        return done(null, user, { message: "LogIn successful" });

      } catch (error) {
        console.log(
          "Passport authenticate SignIn Strategy Middleware Handler",
          "Error passport when log user in"
        );
        await prisma.$disconnect();
        return done(error);
      }
    }
  )
);

// Passport JWT middleware handler function to secure the routes
passport.use(
  new JWTStrategy(
    {
      secretOrKey: passportSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    async (req: Request, token, done) => {
      
      console.log("Passport jwt middleware Token :", token);
      // return done(null, token);
      const prisma = new PrismaClient();
      try {
        const { email } = token;

        const prismaUser = await prisma.user.findUnique({
          where: { email },
          include: {
            tasks: true,
          },
        });

        
        if (prismaUser) {
          req.currentUser = { ...prismaUser };
        } else req.currentUser = null;
        
        console.log("Current user : ", req.currentUser);
        // console.log("Tasks : ", req.currentUser?.tasks);
        await prisma.$disconnect();
        return done(null, req.currentUser);
      } catch (error: any) {
        await prisma.$disconnect();

        console.log("======= Current User Error Exception =========");

        return done(error, false);
      }
    }
  )
)

export default passport;