function typeOf(value: unknown) {
  const exactType = Object.prototype.toString.call(value);
  const matched = /^\[\S+ (\S+)]$/g.exec(exactType);
  return matched ? matched[1] : exactType;
}

export default typeOf;