import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: "mysql",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        autoLoadModels: true,
        synchronize: false,
        models: [],
        define: {
          timestamps: true,
        },
        logging: false,
        pool: {
          max: 20,
          min: 0,
          idle: 10000, // max time in ms that a connection can be idle before being released
          acquire: 60000, // max time in ms that Pool will try to get connection before throwing error
          evict: 1000, // max time in ms after which sequelize will remove idle connections
        }, // todo: add to config
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
