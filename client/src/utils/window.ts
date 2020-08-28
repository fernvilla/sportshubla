export const scrollTo = (offset: number = 0, callback: () => void) => {
  const fixedOffset = offset.toFixed();

  const onScroll = () => {
    if (window.pageYOffset.toFixed() === fixedOffset) {
      window.removeEventListener('scroll', onScroll);
      callback();
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  });
};
