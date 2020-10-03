import React from 'react';
const Recorder = require('recorder-core');
require('recorder-core/src/engine/mp3');
require('recorder-core/src/engine/mp3-engine');

export class Rec {
  rec;

  open = success => {
    this.rec = Recorder({
      type: 'mp3',
      sampleRate: 16000,
      bitRate: 16,
    });
    this.rec?.open(
      () => {
        success && success();
      },
      (msg, isUserNotAllow) => {
        alert((isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg);
      },
    );
  };

  start = () => {
    this.rec.start();
  };

  stop = (cb?: (blob: Blob, duration: number) => void) => {
    this.rec?.stop(
      (blob, duration) => {
        cb && cb(blob, duration);
        this.rec?.close();
        this.rec = null;
      },
      msg => {
        console.log('录音失败:' + msg);
        this.rec?.close();
        this.rec = null;
      },
    );
  };
}

export const RecModule = ({ recRef }: { recRef: (ref: Rec) => void }) => {
  const rec = new Rec();
  React.useEffect(() => {
    recRef(rec);
    return () => {
      rec.rec.close();
    };
  }, []);

  return <></>;
};
