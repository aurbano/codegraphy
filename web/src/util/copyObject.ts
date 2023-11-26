// import structuredClone from '@ungap/structured-clone';

function copyObject<T>(obj: T) {
  return structuredClone<T>(obj);
}

export default copyObject;
