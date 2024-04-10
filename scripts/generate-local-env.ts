import { copyFile } from 'node:fs/promises'
import path from 'node:path'

void (async () => {
  const listArgs = process.argv.slice(2)
  const environment = listArgs[0]
  let newEnvFilenameGenerated = '.env'
  if (environment) newEnvFilenameGenerated += `.${environment}`

  await copyFile(path.resolve('.env.example'), path.resolve(newEnvFilenameGenerated))
})()
