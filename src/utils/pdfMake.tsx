// ../utils/pdfMakeFonts.ts
import pdfMake from 'pdfmake/build/pdfmake';

// Asegúrate de que los archivos .ttf sean accesibles
import RobotoBlack from '../assets/fonts/Roboto-Black.ttf';
import RobotoBold from '../assets/fonts/Roboto-Bold.ttf';
import RobotoMedium from '../assets/fonts/Roboto-Medium.ttf';
import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf';
import RobotoItalic from '../assets/fonts/Roboto-Italic.ttf';
import RobotoMediumItalic from '../assets/fonts/Roboto-MediumItalic.ttf';

pdfMake.vfs = {
  'Roboto-Black.ttf': RobotoBlack,
  'Roboto-Bold.ttf': RobotoBold,
  'Roboto-Medium.ttf': RobotoMedium,
  'Roboto-Regular.ttf': RobotoRegular,
  'Roboto-Italic.ttf': RobotoItalic,
  'Roboto-MediumItalic.ttf': RobotoMediumItalic,
};

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Bold.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
};

export default pdfMake;
