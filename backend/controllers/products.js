const mp = require('../config/mercadopago')

exports.procutDetail100 = async (req, res) => {
  const prod = {
    title: 'Donación',
    unit_price: 100,
    quantity: 1,
    currency_id : 'MXN'
  }
  let preference = {
    items: [
      prod
    ],

    "back_urls": {
      "success": "/",
      "failure": "/",
      "pending": "/"
    }
  };

  const { body: { id } } = await mp.preferences.create(preference)
  prod.prefId = id

  res.status(200).json(prod)
}

exports.procutDetail200 = async (req, res) => {
  const prod = {
    title: 'Donación',
    unit_price: 200,
    quantity: 1,
    currency_id : 'MXN'
  }
  let preference = {
    items: [
      prod
    ],
    // Esta vez, ya que tenemos una SPA no necesitamos poner el form con el action redirigiendo 
    // a donde el usuario debe ir cuando el pago sea exitoso
    // este vez podemos agregar estos links que ayudan a redirigir en el front, una vez un pago es exitoso.
    "back_urls": {
      "success": "/",
      "failure": "/",
      "pending": "/"
    }
  };

  const { body: { id } } = await mp.preferences.create(preference)
  prod.prefId = id

  res.status(200).json(prod)
}

exports.procutDetail300 = async (req, res) => {
  const prod = {
    title: 'Donación',
    unit_price: 300,
    quantity: 1,
    currency_id : 'MXN'
  }
  let preference = {
    items: [
      prod
    ],
    // Esta vez, ya que tenemos una SPA no necesitamos poner el form con el action redirigiendo 
    // a donde el usuario debe ir cuando el pago sea exitoso
    // este vez podemos agregar estos links que ayudan a redirigir en el front, una vez un pago es exitoso.
    "back_urls": {
      "success": "/",
      "failure": "/",
      "pending": "/"
    }
  };

  const { body: { id } } = await mp.preferences.create(preference)
  prod.prefId = id

  res.status(200).json(prod)
}

exports.procutDetail400 = async (req, res) => {
  const prod = {
    title: 'Donación',
    unit_price: 400,
    quantity: 1,
    currency_id : 'MXN'
  }
  let preference = {
    items: [
      prod
    ],
    // Esta vez, ya que tenemos una SPA no necesitamos poner el form con el action redirigiendo 
    // a donde el usuario debe ir cuando el pago sea exitoso
    // este vez podemos agregar estos links que ayudan a redirigir en el front, una vez un pago es exitoso.
    "back_urls": {
      "success": "/",
      "failure": "/",
      "pending": "/"
    }
  };

  const { body: { id } } = await mp.preferences.create(preference)
  prod.prefId = id

  res.status(200).json(prod)
}
