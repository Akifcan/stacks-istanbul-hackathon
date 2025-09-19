interface DatabaseConfig {
  host: string
  port: number
  user: string
  name: string
  password: string
}

interface JWTConfig {
  secret: string
}

interface AppConfig {
  port: number
}

interface ContractConfig {
  privateKey: string
  address: string
}