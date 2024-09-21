declare module 'pdfmake/build/vfs_fonts' {
    export const pdfMake: {
      vfs: { [file: string]: string };
      fonts: { [font: string]: { normal: string } };
    };
  }