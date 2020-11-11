export const rem = (val: number) => `${(val / 100).toFixed(2)}rem`;

export const Colors = {
  btColor: '#00214F',
  btFooterBackground: '#05173B',
  productLink: '#FFCB52',
  nav: '#011839',
};

export const Styles = {
  shadowCard: {
    boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.4)',
    backgroundColor: '#FFF',
    width: '100%',
    padding: rem(60),
  },
};

export const h5Styles = {
  shadowCard: {
    boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.4)',
    backgroundColor: '#FFF',
    width: '100%',
    padding: '23px 25px',
  },
};
