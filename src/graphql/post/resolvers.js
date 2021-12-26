import { checkIsLoggedIn } from '../login/utils/auth-functions';
//Query resolvers
const post = async (_, { id }, { dataSources }) => {
    const post = dataSources.postApi.getPost(id);
    return post;
};

const posts = async (_, { input }, { dataSources, loggedUserId }) => {
    if (!loggedUserId) {
      throw new AuthenticationError('You have to log in');
    }
    //console.log(loggedUserId)
    const posts = dataSources.postApi.getPosts(input);
    return posts;
};

//Mutations resolvers
const createPost = async (_, { data }, { dataSources, loggedUserId }) => {
    checkIsLoggedIn(loggedUserId);
    data.userId = loggedUserId;
    return dataSources.postApi.createPost(data);
};

const updatePost = async (_, { postId, data }, { dataSources, loggedUserId }) => {
    checkIsLoggedIn(loggedUserId);
    return dataSources.postApi.updatePost(postId, data);
};

const deletePost = async (_, { postId }, { dataSources }) => {
    return dataSources.postApi.deletePost(postId);
};

//Field resolvers
const user = async ({ userId }, _, { dataSources }) => {
    return dataSources.userApi.batchLoadById(userId);
};

export const postResolvers = {
    Query: {post,posts},
    Mutation: { createPost, updatePost, deletePost},
    Post:{user}
}