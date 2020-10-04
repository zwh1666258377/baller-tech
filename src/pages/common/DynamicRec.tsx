import * as React from 'react';

export const DynamicRec: any = ({ recRef }: { recRef: (ref: any) => void }) => {
  class Rec {
    rec;

    open = success => {
      // @ts-ignore
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

  const rec = new Rec();
  React.useEffect(() => {
    recRef(rec);
    return () => {
      rec?.rec?.close();
    };
  }, []);

  return <></>;
};
