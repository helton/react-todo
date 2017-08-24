import { partial, pipe } from './utils'

const add = (a, b) => a + b
const addThree = (a, b, c) => a + b + c
const inc = num => num + 1
const dbl = num => num * 2

test('partial applies the first argument ahead of time', () => {
  const inc = partial(add, 1)
  const result = inc(2)
  expect(result).toEqual(3)
})

test('partial applies the multiple arguments ahead of time', () => {
  const inc = partial(addThree, 1, 3)
  const result = inc(2)
  expect(result).toEqual(6)
})

test('pipe passes the results of inc to dbl', () => {
  const pipeline = pipe(inc, dbl)
  const result = pipeline(2)
  expect(result).toEqual(6)
})

test('pipe passes the results of dbl to inc', () => {
  const pipeline = pipe(dbl, inc)
  const result = pipeline(2)
  expect(result).toEqual(5)
})

test('pipe passes the results of dbl to inc to add', () => {
  const pipeline = pipe(dbl, inc, partial(add, 10))
  const result = pipeline(2)
  expect(result).toEqual(15)
})