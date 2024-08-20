import { domToPng, domToJpeg, domToSvg, type Options, createContext, destroyContext } from 'modern-screenshot'



// const waitForImages = () => {
//   const images = cardEle.querySelectorAll('img');
//   const imagePromises = Array.from(images).map(img => {
//     if (img.complete) {
//       return Promise.resolve();
//     } else {
//       return new Promise((resolve, reject) => {
//         img.onload = resolve;
//         img.onerror = reject;
//       });
//     }
//   });
//   return Promise.all(imagePromises);
// };
// await waitForImages();

export const generateImage = async (options: {
    // data?: XConfig[],
    format: string
    width?: number,
    height?: number,
    scale?: number
    fontFamily: false | string
}) => {

    const cardEle = document.querySelector('#card') as HTMLElement;
    const { format, width, height, scale = 2, fontFamily = false } = options;
    // console.log('format', format, width, height, quality);
    // 存储原始尺寸
    const originalWidth = cardEle.style.width;
    const originalHeight = cardEle.style.height;
    console.log('fontFamily', fontFamily);

    const cssText = `
 @font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 400;
  src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/webfonts/fa-regular-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 900;
  src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/webfonts/fa-solid-900.woff2') format('woff2');
}
  @font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: url('https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAw.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: url('https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto Flex';
  font-style: normal;
  font-weight: 400;
  src: url('https://cdn.jsdelivr.net/fontsource/fonts/roboto-flex/vf@latest/latin-wght-normal.woff2') format('woff2-variations');
  font-variation-settings: 'wght' 400;
}
`;
    try {
        // 如果提供了新的尺寸，则应用它们
        let dataUrl: string;
        const exportOptions: Options = {
            quality: 0.95,
            scale: scale,
            features: {
                // Without this, render fails on certain images
                removeControlCharacter: false,
            },
            font: !fontFamily ? false : {
                preferredFormat: 'woff2',
                cssText,
            },
            fetchFn: async (url) => {
                try {
                    // Use Capacitor's HTTP plugin for native fetch
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`HTTP error, status = ${response.status}`);
                    }

                    const arrayBuffer = await response.arrayBuffer();

                    // Convert ArrayBuffer to base64
                    const base64Data = btoa(
                        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );


                    // Construct the data URL
                    const mimeType = response.headers.get('content-type') || 'image/png'; // Default to PNG if no type is specified
                    const dataUrl = `data:${mimeType};base64,${base64Data}`;

                    return dataUrl;
                } catch (error) {
                    console.error('Error fetching image:', error);
                    return false; // Fall back to normal fetch if there's an error
                }
            },
            workerUrl: 'https://unpkg.com/modern-screenshot/dist/worker.js',
            workerNumber: 2,
        };

        switch (format) {
            case 'png':
                dataUrl = await domToPng(cardEle, {
                    ...exportOptions,
                });
                break;
            case 'jpeg':
                dataUrl = await domToJpeg(cardEle, exportOptions);
                break;
            case 'svg':
                dataUrl = await domToSvg(cardEle, exportOptions);
                break;
            default:
                throw new Error('Unsupported format');
        }
        return dataUrl;
    } catch (err) {
        console.error('Error exporting image:', err);
        return 'error: ' + (err as Error).message;
    } finally {
    }
}

export const exportImage = async (format: string) => {
    try {
        const dataUrl = await generateImage({
            format: format,
        });
        const link = document.createElement('a');
        link.download = `export.${format}`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Error exporting image:', err);
    }
};
