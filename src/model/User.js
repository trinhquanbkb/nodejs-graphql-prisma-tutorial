const {
    objectType,
    inputObjectType,
    enumType,
    nonNull,
    intArg,
    arg,
    stringArg,
} = require('nexus')


const typeModel = "User"

const queryResolver = {
    getByUserId :{
        type: typeModel,
        resolve: async(parent,args,context) => {
            return await context.prisma.User.findMany({
                where: {
                    id: args.id
                }
            })
        }
    }
}

const mutaionResolver = {
    createUser: {
        type: typeModel,
        args: {
            arg:({
                type: ("UserCreate")
            })
        },
        resolve: async(parent,args,context) => {
            return await context.prisma.User.create({
                data: {
                    title: args.email,
                    content: args.name,
                },
            })
        }
    }
}

const Repository = {
    repository: objectType({
        name: typeModel,
        definition(t){
            t.nonNull.int('id')
            t.string('email')
            t.string('name')
            t.list.field('posts', {
                type: 'Post',
                resolve: async(parent, _, context) => {
                    return await context.prisma.User
                        .findMany({
                            where: { id: parent.id},
                        })
                        .Post()
                },
            })
        }
    }),
    UserCreate: inputObjectType({
        name: typeModel + 'Create',
        definition(t){
            t.nonNull.int('id')
            t.string('email')
            t.string('name')
        }
    })
}

module.exports = {
    User: {
        Repositories: Repository,
        QueryResolver: queryResolver,
        MutationResolver: mutaionResolver,
    }
}