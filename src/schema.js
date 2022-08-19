const {
    intArg,
    makeSchema,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    asNexusMethod,
    enumType,
} = require('nexus')

const { DateTimeResolver } = require('graphql-scalars')
const DateTime = asNexusMethod(DateTimeResolver, 'date')
const { applyMiddleware } = require('graphql-middleware')
const {User} = require('./model/User')
const {Post} = require('./model/Post')

const Query = objectType({
    name: 'Query',
    definition(t) {
        //User
        t.field('getByUserId', User.QueryResolver.getByUserId)
        
        //Post
        t.field('getByPostId', Post.QueryResolver.getByPostId) 
    },
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        //User
        t.field('UserCreate', User.MutationResolver.createUser)

        //Post
        t.field('PostCreate', Post.MutationResolver.createPost)
    },
})

const schematy = makeSchema({
    types: [
        Query,
        Mutation,
        DateTime,
        //Post
        Post.Repositories.repository,
        Post.Repositories.PostCreate,
        //User
        User.Repositories.repository,
        User.Repositories.UserCreate,
    ],
    outputs: {
        schema: __dirname + '../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',    
    },
    sourceTypes: {
        modules: [{
            module: '@prisma/client',
            alias: 'prisma',
        }, ],
    },
})

module.exports = {
    schema: schematy,
}