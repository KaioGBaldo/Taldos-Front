const DB_KEY = 'taldo_front_db'

const defaultDb = () => ({
  modos: [
    { id: 'op', nome: 'Ordem Paranormal', ativo: true, id_modo: 1 }
  ],
  rpgs: [],
  conquistas: [],
  fichas: [],
  pastas: [],
  arquivosByPasta: {}
})

let memoryDb = null
let persistTimer = null

const schedulePersist = (db) => {
  if (typeof window === 'undefined') return

  if (persistTimer) window.clearTimeout(persistTimer)

  persistTimer = window.setTimeout(() => {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
    persistTimer = null
  }, 120)
}


const flushPersist = () => {
  if (typeof window === 'undefined') return
  if (!memoryDb) return

  if (persistTimer) {
    window.clearTimeout(persistTimer)
    persistTimer = null
  }

  localStorage.setItem(DB_KEY, JSON.stringify(memoryDb))
}

if (typeof window !== 'undefined' && !window.__taldoPersistListener) {
  window.addEventListener('beforeunload', flushPersist)
  window.__taldoPersistListener = true
}

const loadDb = () => {
  if (memoryDb) return memoryDb

  if (typeof window === 'undefined') {
    memoryDb = defaultDb()
    return memoryDb
  }

  try {
    const raw = localStorage.getItem(DB_KEY)
    memoryDb = raw ? { ...defaultDb(), ...JSON.parse(raw) } : defaultDb()
  } catch {
    memoryDb = defaultDb()
  }

  return memoryDb
}

const saveDb = (db) => {
  memoryDb = db
  schedulePersist(db)
}

const now = () => Date.now()
const uid = () => Math.random().toString(36).substring(2, 10)

const memoryUsage = (db) => {
  return Object.values(db.arquivosByPasta)
    .flat()
    .reduce((acc, file) => acc + (file.size || 0), 0)
}

const BackEnd = async (route, obj = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const db = loadDb()

      switch (route) {
      case 'getModosJogo':
        return resolve(db.modos.filter((m) => m.ativo))

      case 'criar-rpg': {
        const link = uid()
        db.rpgs.push({ id: link, nome: obj.nome || 'Novo RPG', tipo: obj.tipo || 'op', createdAt: now() })
        saveDb(db)
        return resolve({ link })
      }

      case 'emblemas/get':
        return resolve(db.conquistas)

      case 'emblemas/set': {
        const exists = db.conquistas.some((c) => String(c.id_conquista) === String(obj.id_conquista))
        if (!exists) {
          db.conquistas.push({
            id: uid(),
            id_conquista: Number(obj.id_conquista),
            data: now()
          })
          saveDb(db)
          return resolve({ message: true })
        }
        return resolve({ message: false })
      }

      case 'fichas/get':
        return resolve(db.fichas.map((f) => ({ id: f.id, descricao: f.descricao || '', nome: f.nome, img: f.img || '' })))

      case 'fichas/set': {
        const ficha = { ...obj, id: uid(), createdAt: now() }
        db.fichas.push(ficha)
        saveDb(db)
        return resolve({ ok: true, id: ficha.id })
      }

      case 'arquivos/get':
        return resolve(db.pastas)

      case 'arquivos/set': {
        const pasta = { uid_folder: uid(), nome: obj.nome || 'Nova Pasta' }
        db.pastas.push(pasta)
        db.arquivosByPasta[pasta.uid_folder] = []
        saveDb(db)
        return resolve({ uid_folder: pasta.uid_folder })
      }

      case 'arquivos/getFile': {
        const files = db.arquivosByPasta[obj.uid_folder] || []
        return resolve(files)
      }

      case 'arquivos/setFile': {
        const target = obj.uid_folder
        if (!target) return resolve({ error: 'Pasta inválida' })

        if (!db.arquivosByPasta[target]) db.arquivosByPasta[target] = []

        const image = {
          nome: obj.image?.name || `arquivo-${uid()}.png`,
          link: obj.base64,
          size: obj.image?.size || 0
        }
        db.arquivosByPasta[target].push(image)
        saveDb(db)
        return resolve({ ok: true })
      }

      case 'getMemoria': {
        const used = memoryUsage(db)
        return resolve({
          memoria: {
            total: 350000000,
            used
          }
        })
      }

      case 'payments/get':
        return resolve({ url: '/h/plano' })

      default:
        return reject(new Error(`Rota não implementada no modo front-only: ${route}`))
      }
    } catch (error) {
      reject(error)
    }
  })
}

export default BackEnd
