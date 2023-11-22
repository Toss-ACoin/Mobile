// import React from 'react';
// import { ToastAndroid } from 'react-native';
// import { PayPalButton, requestOneTimePayment } from 'react-native-paypal';

// export const PayPal = ({ value, name, isDisable, collectionId }) => {
//   const currency = 'PLN';
//   const amount = value ? value.toString() : '0';
//   const onSuccess = (confirmation) => {
//     // Handle success
//     ToastAndroid.show(
//       `Whooo u donate ${value}zł to ${name}`,
//       ToastAndroid.SHORT
//     );
//   };

//   const onError = (error) => {
//     // Handle error
//     console.error(error);
//   };

//   const onCancel = (data) => {
//     // Handle cancellation
//     console.log(data);
//   };

//   const {
//     nonce,
//     payerId,
//     email,
//     firstName,
//     lastName,
//     phone
//   } = await requestOneTimePayment(
//     token,
//     {
//       amount,
//       // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
//       currency: {currency},
//       // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
//       localeCode: 'pl_PL', 
//       shippingAddressRequired: false,
//       userAction: 'commit', // display 'Pay Now' on the PayPal review page
//       // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
//       intent: 'authorize', 
//     }
//   );

//   return (
//     <PayPalButton
//       style={{ height: 40, color: 'white', layout: 'horizontal' }}
//       amount={value ? value.toString() : '0'}
//       currencyCode={currency}
//       isDisabled={!value || isDisable}
//       success={(confirmation) => onSuccess(confirmation)}
//       error={(error) => onError(error)}
//       cancel={(data) => onCancel(data)}
//     />
//   );
// };
