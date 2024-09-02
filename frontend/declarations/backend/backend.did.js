export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const File = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'size' : IDL.Opt(IDL.Nat),
    'fileType' : IDL.Text,
  });
  const Folder = IDL.Record({ 'id' : IDL.Nat, 'name' : IDL.Text });
  return IDL.Service({
    'createFolder' : IDL.Func([IDL.Text], [Result], []),
    'deleteFile' : IDL.Func([IDL.Nat], [Result_1], []),
    'deleteFolder' : IDL.Func([IDL.Nat], [Result_1], []),
    'getFiles' : IDL.Func([], [IDL.Vec(File)], []),
    'getFolders' : IDL.Func([], [IDL.Vec(Folder)], []),
    'uploadFile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Nat)],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
