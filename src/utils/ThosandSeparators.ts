function ThosandSeparators(n: number) {
  return n.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
export default ThosandSeparators;
