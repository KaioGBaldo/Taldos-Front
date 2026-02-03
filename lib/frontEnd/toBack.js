const BackEnd = async (route, obj = {}) => {

  return new Promise((resolve, reject) => {
    fetch(`/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(r => r.json()).then(val => {
      resolve(val)
    }).catch(val => {
      reject(val)
    })

  })
}

export default BackEnd
