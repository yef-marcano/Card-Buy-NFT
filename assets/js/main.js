window.addEventListener('load', async () => {
  // Boton de conectar
  $('.connect-button').click(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        initPayButton()
      } catch (err) {
        $('.status').html('Acceso denegado a la cuenta', err)
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      initPayButton()
    } else {
      $('.status').html('No se ha instalado Metamask (u otro proveedor Web3)')
    }
  })
})


const initPayButton = () => {
  $("#pay-connect").html('Pagar').addClass('pay-button').removeClass('connect-button');
  // Boton de pagar
  $('.pay-button').click(() => {
    // La dirección de pago es donde se enviarán los fondos.
    const paymentAddress = '0xA987A265b7438158d1598a47b84102EA9CF0F2e5'
    const amountEth = 0.041

    web3.eth.sendTransaction({
      to: paymentAddress,
      value: web3.toWei(amountEth, 'ether')
    }, (err, transactionId) => {
      if (err) {
        console.log('Pago fallido', err)
        $('.status').html('Pago fallido')
      } else {
        console.log('Payment successful', transactionId)
        $('.status').html('Pago exitoso')
      }
    })
  })

}