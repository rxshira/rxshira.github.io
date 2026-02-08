import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetPublicPostsData {
  posts: ({
    id: UUIDString;
    title: string;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}

export interface GetUserPostsData {
  posts: ({
    id: UUIDString;
    title: string;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}

export interface Post_Key {
  id: UUIDString;
  __typename?: 'Post_Key';
}

export interface UpdatePostData {
  post_update?: Post_Key | null;
}

export interface UpdatePostVariables {
  id: UUIDString;
  content?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetPublicPostsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicPostsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicPostsData, undefined>;
  operationName: string;
}
export const getPublicPostsRef: GetPublicPostsRef;

export function getPublicPosts(): QueryPromise<GetPublicPostsData, undefined>;
export function getPublicPosts(dc: DataConnect): QueryPromise<GetPublicPostsData, undefined>;

interface UpdatePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
  operationName: string;
}
export const updatePostRef: UpdatePostRef;

export function updatePost(vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;
export function updatePost(dc: DataConnect, vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface GetUserPostsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserPostsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserPostsData, undefined>;
  operationName: string;
}
export const getUserPostsRef: GetUserPostsRef;

export function getUserPosts(): QueryPromise<GetUserPostsData, undefined>;
export function getUserPosts(dc: DataConnect): QueryPromise<GetUserPostsData, undefined>;

