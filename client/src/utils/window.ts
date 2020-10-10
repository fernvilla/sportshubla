export const scrollToCallback = (offset: number = 0, callback: () => void) => {
  const fixedOffset = offset.toFixed();

  const onScroll = () => {
    if (window.pageYOffset.toFixed() === fixedOffset) {
      window.removeEventListener('scroll', onScroll);
      callback();
    }

    if (window.pageYOffset.toFixed() === "0") {
      callback()
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
  window.scrollTo({ top: offset, behavior: 'smooth' });
};
