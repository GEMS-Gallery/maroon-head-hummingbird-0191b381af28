export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const File = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'size' : IDL.Opt(IDL.Nat),
    'fileType' : IDL.Text,
    'category' : IDL.Text,
    'inTrash' : IDL.Bool,
  });
  const Folder = IDL.Record({ 'id' : IDL.Nat, 'name' : IDL.Text });
  return IDL.Service({
    'createFolder' : IDL.Func([IDL.Text], [Result], []),
    'deleteFolder' : IDL.Func([IDL.Nat], [Result_1], []),
    'getFiles' : IDL.Func([], [IDL.Vec(File)], ['query']),
    'getFolders' : IDL.Func([], [IDL.Vec(Folder)], ['query']),
    'moveFileToTrash' : IDL.Func([IDL.Nat], [Result_1], []),
    'restoreFileFromTrash' : IDL.Func([IDL.Nat], [Result_1], []),
    'uploadFile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Nat), IDL.Text],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
