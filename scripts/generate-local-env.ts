import { copyFile } from 'fs/promises'
import path from 'path'

void (async () => {
  await copyFile(path.resolve('.env.example'), path.resolve('.env'))
})()
