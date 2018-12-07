'use strict';

if ('mediaDevices' in navigator) {
	console.log('camera is available on device');
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
        mockDataPush(sub);
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
};

// google web dev scanner *

// const scanner = () => {
// 	console.log('scanner')
//     document.getElementById("scanner").style.display = "inline";
//   	const player = document.getElementById('player');
//   	const canvas = document.getElementById('canvas');
// 	const context = canvas.getContext('2d');
// 	const captureButton = document.getElementById('capture');

// 	  const constraints = {
// 	    video: true,
// 	  };

	  // captureButton.addEventListener('click', () => {
	  //   // Draw the video frame to the canvas.
	  //   console.log('this is camera data -> ', context);
	  //   context.drawImage(player, 0, 0, canvas.width, canvas.height);
	  //   player.srcObject.getVideoTracks().forEach(track => track.stop());
	  // });

	  // // Attach the video stream to the video element and autoplay.
	  // navigator.mediaDevices.getUserMedia(constraints)
	  //   .then((stream) => {
	  //     player.srcObject = stream;
	  //   });
// }

// const picture = document.getElementById('camera');

// picture.addEventListener('change', (e) => doSomething(e.target.files))

// const doSomething = (pic) => {
// 	console.log('this is the picture being sent ', pic);
// }

// quagga js barcode scanner library
  var _scannerIsRunning = false;

  function startScanner() {
      Quagga.init({
          inputStream: {
              name: "Live",
              type: "LiveStream",
              target: document.querySelector('#scanner-container'),
              constraints: {
                  width: 320,
                  height: 320,
                  facingMode: "environment"
              },
              area: {
                top: "0%",
                right: "0%",
                left: "0%",
                bottom: "0%"
              },
              singleChannel: true
          },
          locate: false,
          frequency: 5,
          decoder: {
              readers: [
                  "code_128_reader",
                  "ean_reader",
                  "ean_8_reader",
                  "code_39_reader",
                  "code_39_vin_reader",
                  "codabar_reader",
                  "upc_reader",
                  "upc_e_reader",
                  "i2of5_reader"
              ],
              debug: {
                  showCanvas: true,
                  showPatches: true,
                  showFoundPatches: true,
                  showSkeleton: true,
                  showLabels: true,
                  showPatchLabels: true,
                  showRemainingPatchLabels: true,
                  boxFromPatches: {
                      showTransformed: true,
                      showTransformedBox: true,
                      showBB: true
                  }
              }
          },

      }, function (err) {
          if (err) {
              console.log(err);
              return
          }

          console.log("Initialization finished. Ready to start");
          Quagga.start();

          // Set flag to is running
          _scannerIsRunning = true;
      });

      Quagga.onProcessed(function (result) {
          var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

          if (result) {
              if (result.boxes) {
                  drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                  result.boxes.filter(function (box) {
                      return box !== result.box;
                  }).forEach(function (box) {
                      Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                  });
              }

              if (result.box) {
                  Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
              }

              if (result.codeResult && result.codeResult.code) {
                  Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
              }
          }
      });


      Quagga.onDetected(function (result) {
        const scanResult = document.getElementById('scan-result');
          console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
          scanResult.innerHTML = result.codeResult.code;
      });
  }


  // Start/stop scanner
  document.getElementById("btn").addEventListener("click", function () {
      if (_scannerIsRunning) {
          Quagga.stop();
          _scannerIsRunning = false;
      } else {
          startScanner();
      }
  }, false);

