# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetPublicPosts*](#getpublicposts)
  - [*GetUserPosts*](#getuserposts)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdatePost*](#updatepost)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetPublicPosts
You can execute the `GetPublicPosts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPublicPosts(): QueryPromise<GetPublicPostsData, undefined>;

interface GetPublicPostsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicPostsData, undefined>;
}
export const getPublicPostsRef: GetPublicPostsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicPosts(dc: DataConnect): QueryPromise<GetPublicPostsData, undefined>;

interface GetPublicPostsRef {
  ...
  (dc: DataConnect): QueryRef<GetPublicPostsData, undefined>;
}
export const getPublicPostsRef: GetPublicPostsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicPostsRef:
```typescript
const name = getPublicPostsRef.operationName;
console.log(name);
```

### Variables
The `GetPublicPosts` query has no variables.
### Return Type
Recall that executing the `GetPublicPosts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicPostsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPublicPostsData {
  posts: ({
    id: UUIDString;
    title: string;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}
```
### Using `GetPublicPosts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicPosts } from '@dataconnect/generated';


// Call the `getPublicPosts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicPosts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicPosts(dataConnect);

console.log(data.posts);

// Or, you can use the `Promise` API.
getPublicPosts().then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

### Using `GetPublicPosts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicPostsRef } from '@dataconnect/generated';


// Call the `getPublicPostsRef()` function to get a reference to the query.
const ref = getPublicPostsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicPostsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.posts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

## GetUserPosts
You can execute the `GetUserPosts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserPosts(): QueryPromise<GetUserPostsData, undefined>;

interface GetUserPostsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserPostsData, undefined>;
}
export const getUserPostsRef: GetUserPostsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserPosts(dc: DataConnect): QueryPromise<GetUserPostsData, undefined>;

interface GetUserPostsRef {
  ...
  (dc: DataConnect): QueryRef<GetUserPostsData, undefined>;
}
export const getUserPostsRef: GetUserPostsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserPostsRef:
```typescript
const name = getUserPostsRef.operationName;
console.log(name);
```

### Variables
The `GetUserPosts` query has no variables.
### Return Type
Recall that executing the `GetUserPosts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserPostsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserPostsData {
  posts: ({
    id: UUIDString;
    title: string;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}
```
### Using `GetUserPosts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserPosts } from '@dataconnect/generated';


// Call the `getUserPosts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserPosts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserPosts(dataConnect);

console.log(data.posts);

// Or, you can use the `Promise` API.
getUserPosts().then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

### Using `GetUserPosts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserPostsRef } from '@dataconnect/generated';


// Call the `getUserPostsRef()` function to get a reference to the query.
const ref = getUserPostsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserPostsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.posts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdatePost
You can execute the `UpdatePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePost(vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface UpdatePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
}
export const updatePostRef: UpdatePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePost(dc: DataConnect, vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface UpdatePostRef {
  ...
  (dc: DataConnect, vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
}
export const updatePostRef: UpdatePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePostRef:
```typescript
const name = updatePostRef.operationName;
console.log(name);
```

### Variables
The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePostVariables {
  id: UUIDString;
  content?: string | null;
}
```
### Return Type
Recall that executing the `UpdatePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePostData {
  post_update?: Post_Key | null;
}
```
### Using `UpdatePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePost, UpdatePostVariables } from '@dataconnect/generated';

// The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`:
const updatePostVars: UpdatePostVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updatePost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePost(updatePostVars);
// Variables can be defined inline as well.
const { data } = await updatePost({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePost(dataConnect, updatePostVars);

console.log(data.post_update);

// Or, you can use the `Promise` API.
updatePost(updatePostVars).then((response) => {
  const data = response.data;
  console.log(data.post_update);
});
```

### Using `UpdatePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePostRef, UpdatePostVariables } from '@dataconnect/generated';

// The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`:
const updatePostVars: UpdatePostVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updatePostRef()` function to get a reference to the mutation.
const ref = updatePostRef(updatePostVars);
// Variables can be defined inline as well.
const ref = updatePostRef({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePostRef(dataConnect, updatePostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.post_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.post_update);
});
```

