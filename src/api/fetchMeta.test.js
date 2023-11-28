import { determineFetchParameters } from "./fetchBooks";

describe('determineFetchParameters', () => {
  describe('default page size', () => {
    test('no arguments', () => {
      const input = {}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 10, offset: 0}
      ])
    })

    test('page 2', () => {
      const input = {pageSize: 10, pageIndex: 1}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 10, offset: 10}
      ])
    })
  })

  describe('Page Size 25', () => {
    test('Page 2', () => {
      const input = {pageSize: 25, pageIndex: 1}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 25, offset: 25}
      ])
    })
  })

  describe('Page Size 50', () => {
    test('Page 1', () => {
      const input = {pageSize: 50, pageIndex: 0}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 40, offset: 0},
        {max: 10, offset: 40}
      ])
    })

    test('Page 2', () => {
      const input = {pageSize: 50, pageIndex: 1}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 40, offset: 50},
        {max: 10, offset: 90}
      ])
    })
  })

  describe('Page Size 50', () => {
    test('Page 1', () => {
      const input = {pageSize: 50, pageIndex: 0}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 40, offset: 0},
        {max: 10, offset: 40}
      ])
    })

    test('Page 2', () => {
      const input = {pageSize: 50, pageIndex: 1}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 40, offset: 50},
        {max: 10, offset: 90}
      ])
    })
  })

  describe('Page Size 125', () => {
    test('Page 1', () => {
      const input = {pageSize: 125, pageIndex: 0}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 40, offset: 0},
        {max: 40, offset: 40},
        {max: 40, offset: 80},
        {max: 5, offset: 120}
      ])
    })
    
    test('Page 2', () => {
      const input = {pageSize: 125, pageIndex: 1}
      expect(determineFetchParameters(input)).toMatchObject([
        {max: 40, offset: 125},
        {max: 40, offset: 165},
        {max: 40, offset: 205},
        {max: 5, offset: 245}
      ])
    })    
  })
})
