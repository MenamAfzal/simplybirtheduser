const generateAssetFontCss = ({fontFileName, extension = 'ttf'}) => {
  const fileUri = Platform.select({
    ios: `${fontFileName}.${extension}`,
    android: `file:///android_asset/fonts/${fontFileName}.${extension}`,
  });

  return `@font-face {
        font-family: '${fontFileName}';
        src: local('${fontFileName}'), url('${fileUri}') ;
    }`;
};

export const generateStyledHtml = description => {
  return `<!DOCTYPE html>
  <html>
  <head>
  <style>
  ${generateAssetFontCss({
    fontFileName: 'Nunito-Regular',
    extension: 'ttf',
  })}
  body {
      font-family: Nunito-Regular;
  }
  </style>
  </head>
  <body style="font-size: 2.5rem">
  ${description}
  </body>
  </html>`;
};
