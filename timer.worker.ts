// arquivo: public/workers/timer.worker.ts
let timerId: any = null;

self.onmessage = (e: MessageEvent) => {
  if (e.data.action === 'start') {
    let timeLeft = e.data.duration;
    
    if (timerId) clearInterval(timerId);
    
    timerId = setInterval(() => {
      timeLeft--;
      self.postMessage({ type: 'TICK', timeLeft });
      
      if (timeLeft <= 0) {
        clearInterval(timerId);
        self.postMessage({ type: 'FINISHED' });
      }
    }, 1000);
  }

  if (e.data.action === 'stop') {
    if (timerId) clearInterval(timerId);
  }
};
