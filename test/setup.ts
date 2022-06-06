import { rm } from 'fs/promises'
import { join } from 'path'

beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'))
  } catch (error) {
    // No handling need in case of error
  }
})

// afterEach(async () => {
//   const conn = await getConnection()
//   conn.destroy()
// })
