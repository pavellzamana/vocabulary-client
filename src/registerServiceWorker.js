/* 
register service workers and push manager
and subscribe on push notifications  
*/
export function registerServiceWorker() {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      // .then((registration) => {
      //   const subscribeOptions = {
      //     userVisibleOnly: true,
      //     applicationServerKey: btoa(
      //       'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
      //     ),
      //   };
      //   return registration.pushManager.subscribe(subscribeOptions);
      // })
      .catch((error) => {
        throw new Error(error.message);
      });
  });
}

/*  request permission for push notifications */
export function requestPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then((permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error('Permission not granted.');
    }
  });
}
