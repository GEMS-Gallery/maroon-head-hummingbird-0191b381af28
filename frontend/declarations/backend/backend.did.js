export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const File = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'size' : IDL.Nat,
    'fileType' : IDL.Text,
    'category' : IDL.Text,
    'inTrash' : IDL.Bool,
  });
  const Folder = IDL.Record({ 'id' : IDL.Nat, 'name' : IDL.Text });
  return IDL.Service({
    'createFolder' : IDL.Func([IDL.Text], [Result], []),
    'deleteFolder' : IDL.Func([IDL.Nat], [Result_1], []),
    'getFiles' : IDL.Func([], [IDL.Vec(File)], ['query']),
    'getFilesByCategory' : IDL.Func([IDL.Text], [IDL.Vec(File)], ['query']),
    'getFolders' : IDL.Func([], [IDL.Vec(Folder)], ['query']),
    'getTrashFiles' : IDL.Func([], [IDL.Vec(File)], ['query']),
    'moveFileToTrash' : IDL.Func([IDL.Nat], [Result_1], []),
    'restoreFileFromTrash' : IDL.Func([IDL.Nat], [Result_1], []),
    'uploadFile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Vec(IDL.Nat8)],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
