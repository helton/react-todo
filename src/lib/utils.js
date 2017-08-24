export const partial = (fn, ...args) => fn.bind(null, ...args)

const compose = (f, g) => (...args) => g(f(...args))

export const pipe = (...fns) => fns.reduce(compose)