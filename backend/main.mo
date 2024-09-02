import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";

actor {
  type File = {
    id: Nat;
    name: Text;
    fileType: Text;
    size: ?Nat;
    category: Text;
    inTrash: Bool;
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
    files
  };

  public query func getFolders() : async [Folder] {
    folders
  };

  public func uploadFile(name : Text, fileType : Text, size : ?Nat, category : Text) : async Result.Result<Nat, Text> {
    fileIdCounter += 1;
    let newFile : File = {
      id = fileIdCounter;
      name = name;
      fileType = fileType;
      size = size;
      category = category;
      inTrash = false;
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

  // System functions for upgrades
  system func preupgrade() {
    // Stable variables are automatically persisted
  };

  system func postupgrade() {
    // Re-initialize any non-stable state here if needed
  };
}
