/**
 *
 * A function that copies an image from a remote URL to the clipboard using a canvas element and the Clipboard API
 * @async
 * @function copyImageToClipboardFromRemoteURL
 * @param {string} url
 * @returns {Promise<void>}
 */

async function copyImageToClipboardFromRemoteURL(url) {
  return new Promise((resolve, reject) => {
    // Create a new image element and set its source to the given URL
    var img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = url;

    // Once the image has loaded, create a canvas element and draw the image onto it
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a Blob and copy it to the clipboard
      canvas.toBlob(function (blob) {
        navigator.clipboard
          .write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ])
          .then(
            () => {
              // Resolve the promise with the new image element
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      }, "image/png");
    };

    // If there's an error loading the image, reject the promise
    img.onerror = function () {
      reject(new Error("Failed to load image from URL: " + url));
    };
  });
}
