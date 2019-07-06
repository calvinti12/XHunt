const queryParser = (query) => {
  const str = query.replace("?","");
  const arr = str.split("&");
  const obj = {};
  arr.forEach(item => {
    const q = item.split("=");
    obj[q[0]] = q[1];
  });
  return obj;
}
export default queryParser;