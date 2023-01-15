export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateReportInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  deletedAt?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type CreateSuggestionInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  response?: InputMaybe<Scalars['String']>;
  senderName?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createReport?: Maybe<Report>;
  createSuggestion?: Maybe<Suggestion>;
  createUser?: Maybe<User>;
  deleteReport?: Maybe<Report>;
  deleteSuggestion?: Maybe<Suggestion>;
  deleteUser?: Maybe<User>;
  updateReport?: Maybe<Report>;
  updateSuggestion?: Maybe<Suggestion>;
  updateUser?: Maybe<User>;
};

export type MutationCreateReportArgs = {
  input: CreateReportInput;
};

export type MutationCreateSuggestionArgs = {
  input: CreateSuggestionInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteReportArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteSuggestionArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateReportArgs = {
  id: Scalars['ID'];
  input: UpdateReportInput;
};

export type MutationUpdateSuggestionArgs = {
  id: Scalars['ID'];
  input: UpdateSuggestionInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getReport?: Maybe<Report>;
  getSuggestion?: Maybe<Suggestion>;
  getUser?: Maybe<User>;
  listPublishedReport?: Maybe<Array<Maybe<Report>>>;
  listReport?: Maybe<Array<Maybe<Report>>>;
  listSuggestion?: Maybe<Array<Maybe<Suggestion>>>;
  listUser?: Maybe<Array<Maybe<User>>>;
};

export type QueryGetReportArgs = {
  id: Scalars['ID'];
};

export type QueryGetSuggestionArgs = {
  id: Scalars['ID'];
};

export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type Report = {
  __typename?: 'Report';
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type ReportInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  deletedAt?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateReport?: Maybe<Report>;
  onCreateSuggestion?: Maybe<Suggestion>;
  onCreateUser?: Maybe<User>;
  onDeleteReport?: Maybe<Report>;
  onDeleteSuggestion?: Maybe<Suggestion>;
  onDeleteUser?: Maybe<User>;
  onUpdateReport?: Maybe<Report>;
  onUpdateSuggestion?: Maybe<Suggestion>;
  onUpdateUser?: Maybe<User>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  response?: Maybe<Scalars['String']>;
  senderName?: Maybe<Scalars['String']>;
};

export type SuggestionInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  response?: InputMaybe<Scalars['String']>;
  senderName?: InputMaybe<Scalars['String']>;
};

export type UpdateReportInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  deletedAt?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UpdateSuggestionInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  response?: InputMaybe<Scalars['String']>;
  senderName?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export enum UserRole {
  Admin = 'Admin',
  Reader = 'Reader',
  Writer = 'Writer',
}
