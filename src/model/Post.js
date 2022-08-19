const {
    objectType,
    inputObjectType,
    enumType,
    nonNull,
    intArg,
    arg,
    stringArg,
} = require('nexus')

const typeModel = "Post"

const queryResolver = {
    getByPostId :{
        type: typeModel,
        resolve: async(parent,args,context) => {
            return await context.prisma.Post.findMany({
                where: {
                    id: args.id
                }
            })
        }
    }
}

const mutaionResolver = {
    createPost: {
        type: typeModel,
        args: {
            arg:({
                type: ("PostCreate")
            })
        },
        resolve: async(parent,args,context) => {
            return await context.prisma.Post.create({
                data: {
                    title: args.title,
                    content: args.content,
                    authorId: args.authorId,
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
            t.field('createdAt', {type: 'DateTime'})
            t.field('updatedAt', {type: 'DateTime'})
            t.string('title')
            t.string('content')
            t.int('authorId')
            t.list.field('author', {
                type: 'User',
                resolve: async(parent, _, context) => {
                    return await context.prisma.Post
                        .findMany({
                            where: { id: parent.authorId },
                        })
                        .User()
                },
            })
        }
    }),
    PostCreate: inputObjectType({
        name: typeModel + 'Create',
        definition(t){
            t.string('title')
            t.string('content')
            t.int('authorId')
        }
    })
}

module.exports = {
    Post: {
        Repositories: Repository,
        QueryResolver: queryResolver,
        MutationResolver: mutaionResolver,
    }
}
