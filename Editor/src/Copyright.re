let getVersion = () => "1.0.2";

let getAuthor = () => "Wonder";

let getWPKVersion = versionStr =>
  switch (versionStr) {
  | "0.13.0"
  | "0.13.1" => 1
  | _ => 1
  };