import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
import { Cache } from 'cache-manager';
const { getOrSetCache, clearCache } = require("../caching/redis"); 
@Controller('users')
export class UsersController {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    //@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
    
    @Get()
    async users(){

        // let users = await this.cacheManager.get('users');
        // if (!users){
        //     console.log (users);
        //    users =  await this.userModel.find();
        //    await this.cacheManager.set('users', JSON.stringify(users));
        //    users = await this.cacheManager.get('users');
          
        // }
        // return users;
        return getOrSetCache(`users`, () => {return this.userModel.find();})

        


    }
}
