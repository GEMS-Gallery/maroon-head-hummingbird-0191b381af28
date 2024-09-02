import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface File {
  'id' : bigint,
  'name' : string,
  'size' : [] | [bigint],
  'fileType' : string,
  'category' : string,
  'inTrash' : boolean,
}
export interface Folder { 'id' : bigint, 'name' : string }
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Result_1 = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'createFolder' : ActorMethod<[string], Result>,
  'deleteFolder' : ActorMethod<[bigint], Result_1>,
  'getFiles' : ActorMethod<[], Array<File>>,
  'getFolders' : ActorMethod<[], Array<Folder>>,
  'moveFileToTrash' : ActorMethod<[bigint], Result_1>,
  'restoreFileFromTrash' : ActorMethod<[bigint], Result_1>,
  'uploadFile' : ActorMethod<[string, string, [] | [bigint], string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
