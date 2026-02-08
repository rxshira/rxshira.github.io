import { CreateUserData, GetPublicPostsData, UpdatePostData, UpdatePostVariables, GetUserPostsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useGetPublicPosts(options?: useDataConnectQueryOptions<GetPublicPostsData>): UseDataConnectQueryResult<GetPublicPostsData, undefined>;
export function useGetPublicPosts(dc: DataConnect, options?: useDataConnectQueryOptions<GetPublicPostsData>): UseDataConnectQueryResult<GetPublicPostsData, undefined>;

export function useUpdatePost(options?: useDataConnectMutationOptions<UpdatePostData, FirebaseError, UpdatePostVariables>): UseDataConnectMutationResult<UpdatePostData, UpdatePostVariables>;
export function useUpdatePost(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePostData, FirebaseError, UpdatePostVariables>): UseDataConnectMutationResult<UpdatePostData, UpdatePostVariables>;

export function useGetUserPosts(options?: useDataConnectQueryOptions<GetUserPostsData>): UseDataConnectQueryResult<GetUserPostsData, undefined>;
export function useGetUserPosts(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserPostsData>): UseDataConnectQueryResult<GetUserPostsData, undefined>;
