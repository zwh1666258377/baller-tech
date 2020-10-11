// import { generateSocket } from '@/lib/socket';
// import React, { useEffect, useRef } from 'react';
// import { isBrowser } from 'umi';

export default () => {
  return null;
  // const socket = isBrowser() ? useRef(generateSocket()).current : undefined;
  // const timer = useRef<any>();

  // const startLoop = () => {
  //   socket?.emit('send_socket', socket?.id);
  //   // timer.current = setInterval(() => {
  //   // }, 400)
  // };

  // const endLoop = () => {
  //   clearInterval(timer.current);
  // };

  // useEffect(() => {
  //   window.addEventListener('keypress', ((e, a) => {
  //     if (e?.key === 'z') {
  //       startLoop();
  //     }
  //     if (e?.key === 'x') {
  //       endLoop();
  //     }
  //   }) as any);

  //   socket?.on('get_socket', data => {
  //     console.log(data);
  //   });

  //   return () => {
  //     window.removeEventListener('keypress', () => null);
  //     socket?.emit('disconnect');
  //     socket?.disconnect();
  //   };
  // }, []);

  // return (
  //   <div style={{ border: '1px solid blue' }}>
  //     <input
  //       type="file"
  //       name="upload"
  //       onChange={e => {
  //         const file = e.target.files?.[0];
  //         if (!!file) {
  //           let formdata = new FormData();
  //           formdata.append('hell', file);
  //           formdata.append('language', 'zho');
  //           fetch('/api/yysb', {
  //             method: 'POST',
  //             headers: {},
  //             body: formdata,
  //           })
  //             .then(r => r.json())
  //             .then(console.log);
  //         }
  //       }}
  //     ></input>
  //   </div>
  // );
};
