const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'rxshiragithubio',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const getPublicPostsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicPosts');
}
getPublicPostsRef.operationName = 'GetPublicPosts';
exports.getPublicPostsRef = getPublicPostsRef;

exports.getPublicPosts = function getPublicPosts(dc) {
  return executeQuery(getPublicPostsRef(dc));
};

const updatePostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePost', inputVars);
}
updatePostRef.operationName = 'UpdatePost';
exports.updatePostRef = updatePostRef;

exports.updatePost = function updatePost(dcOrVars, vars) {
  return executeMutation(updatePostRef(dcOrVars, vars));
};

const getUserPostsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserPosts');
}
getUserPostsRef.operationName = 'GetUserPosts';
exports.getUserPostsRef = getUserPostsRef;

exports.getUserPosts = function getUserPosts(dc) {
  return executeQuery(getUserPostsRef(dc));
};
