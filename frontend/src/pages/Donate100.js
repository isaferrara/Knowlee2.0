import { useState, useEffect, useRef } from 'react';
import { getProduct100 } from '../services/products';
import React from 'react'



function Donate100() {
  const [product, setProduct] = useState(null)

  const paymentContainereRef = useRef()

  useEffect(() => {

    async function fetchProduct(){
    const { data: product } = await getProduct100()
    //product.unit_price = 300
    product.currency_id = 'MXN'

    // Generamos el script que nos pide mercado pago pero a mano con createElement
    const script = document.createElement("script");

    // Agregamos los atributos que el script requiere
    script.src = "https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js";
    script.setAttribute('data-preference-id', product.prefId)
    // hacemos appendChild de nuestro script recien generado a nuestro elemento con la referencia
    paymentContainereRef.current.appendChild(script);

    setProduct(product);
    }
    fetchProduct()
    
  }, [])

  return (
    <div>
      <h1>Donate</h1>
      <p>{product?.unit_price}</p>
      {/*<pre>{JSON.stringify(product, null, 2)}</pre>*/}
      {/* asignamos la referencia al elemento que queremos que contenga el boton de mercadopago (que lo trae nuestro script) */}
      <div ref={paymentContainereRef}></div>
    </div>
  );
}

export default Donate100;