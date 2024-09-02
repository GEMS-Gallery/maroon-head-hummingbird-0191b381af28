import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Blob "mo:base/Blob";

actor {
  type File = {
    id: Nat;
    name: Text;
    fileType: Text;
    size: Nat;
    category: Text;
    inTrash: Bool;
    content: Blob;
  };

  type Folder = {
    id: Nat;
    name: Text;
  };

  stable var files : [File] = [];
  stable var folders : [Folder] = [];
  var fileIdCounter : Nat = 0;
  var folderIdCounter : Nat = 0;

  public query func getFiles() : async [File] {
    Array.filter(files, func (f : File) : Bool { not f.inTrash })
  };

  public query func getTrashFiles() : async [File] {
    Array.filter(files, func (f : File) : Bool { f.inTrash })
  };

  public query func getFolders() : async [Folder] {
    folders
  };

  public func uploadFile(name : Text, fileType : Text, size : Nat, category : Text, content : Blob) : async Result.Result<Nat, Text> {
    fileIdCounter += 1;
    let newFile : File = {
      id = fileIdCounter;
      name = name;
      fileType = fileType;
      size = size;
      category = category;
      inTrash = false;
      content = content;
    };
    files := Array.append(files, [newFile]);
    #ok(fileIdCounter)
  };

  public func createFolder(name : Text) : async Result.Result<Nat, Text> {
    folderIdCounter += 1;
    let newFolder : Folder = {
      id = folderIdCounter;
      name = name;
    };
    folders := Array.append(folders, [newFolder]);
    #ok(folderIdCounter)
  };

  public func moveFileToTrash(id : Nat) : async Result.Result<(), Text> {
    files := Array.map(files, func (f : File) : File {
      if (f.id == id) {
        {
          id = f.id;
          name = f.name;
          fileType = f.fileType;
          size = f.size;
          category = "trash";
          inTrash = true;
          content = f.content;
        }
      } else {
        f
      }
    });
    #ok(())
  };

  public func restoreFileFromTrash(id : Nat) : async Result.Result<(), Text> {
    files := Array.map(files, func (f : File) : File {
      if (f.id == id and f.inTrash) {
        {
          id = f.id;
          name = f.name;
          fileType = f.fileType;
          size = f.size;
          category = f.category;
          inTrash = false;
          content = f.content;
        }
      } else {
        f
      }
    });
    #ok(())
  };

  public func deleteFolder(id : Nat) : async Result.Result<(), Text> {
    folders := Array.filter(folders, func (f : Folder) : Bool { f.id != id });
    #ok(())
  };

  public query func getFilesByCategory(category : Text) : async [File] {
    Array.filter(files, func (f : File) : Bool { f.category == category and not f.inTrash })
  };

  // System functions for upgrades
  system func preupgrade() {
    // Stable variables are automatically persisted
  };

  system func postupgrade() {
    // Re-initialize any non-stable state here if needed
  };
}
