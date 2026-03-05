{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_24
    gtk3
    nss
    nspr
    alsa-lib
    libglvnd
    xorg.libXtst
    xorg.libX11
    xorg.libXext
  ];

  shellHook = ''
    export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath [
      pkgs.gtk3
      pkgs.nss
      pkgs.nspr
      pkgs.alsa-lib
      pkgs.libglvnd
      pkgs.xorg.libXtst
      pkgs.xorg.libX11
      pkgs.xorg.libXext
    ]}:$LD_LIBRARY_PATH
    
    # Alias for starting the application
    alias start="npm run start:server & npm run dev"
  '';
}


