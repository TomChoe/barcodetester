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