import { dynamic } from 'umi';

export const DynamicRec: any = dynamic({
  loader: async function() {
    const { RecModule } = await import('./Recorder');
    return RecModule;
  },
});
