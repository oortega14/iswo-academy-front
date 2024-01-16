// 'use client'

// import React, { useEffect, useState, useContext } from 'react';
// import { useUIStore } from '@/store/ui/ui-store';

// const GetBanks = async (baseUrl: any) => {
//   try {
//     const request = await fetch(`${baseUrl}/epayco/banks`,{
//       method: 'GET',
//       headers: { 'Content-type': 'application/json;charset=UTF-8' },
//       credentials: 'include',
//     });
//     const response = await request.json()
//     return response
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }

// const Payments = () => {
//   const [banks, setBanks] = useState([])
//   const documentTypes = [{ name: 'Cédula de Ciudadania', value: 'CC' },
//                          { name: 'Cédula Extranjera', value: 'CE' } ]
//   const baseUrl = useUIStore((state) => state.baseUrl)

//   const [paymentData, setPaymentData] = useState({
//     doc_type: '',
//     bank_code: '',
//     doc_number: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone: '',
//     ip: ''
//   });

//   useEffect(()=> {
//     GetBanks(baseUrl)
//       .then((data) => {
//         setBanks(data.banks);
//       })
//   }, [])

//   const handleChange = (e: any) => {
//     const { target } = e;
//     const { name, value } = target;
//     let newValues = { ...paymentData, [name]: value}
//     setPaymentData(newValues);
//   }

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const request = await fetch(`${baseUrl}/payments`, {
//         method: 'POST',
//         headers: { 'Content-type': 'application/json;charset=UTF-8' },
//         credentials: 'include',
//         body: JSON.stringify( { payment: { amount: '10000', transaction_params: paymentData} }),
//       });
//       const response = await request.json()
//       if (request.status == 200) {
//         console.log("success")
//       } else {
//       }
//       return response;
//     } catch (e) {
//       console.log("error", e)
//     }
//   };

//   return (
//     <React.Fragment>
//       <h1>Bancos</h1>
//       <form className="w-full space-y-2" onSubmit={handleSubmit}>
//         <label className="text-lg font-semibold text-slate-600"> Tipo de documento </label>
//         <select name="doc_type" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}>
//           <option value={-1}>Tipo de Documento:</option>
//           {documentTypes.map((docType, i) => (
//             <option key={'categoria' + i} value={docType.value}> {docType.name} </option>
//           ))}
//         </select>

//         <label className="text-lg font-semibold text-slate-600"> Banco </label>
//         <select name="bank_code" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}>
//           <option value={-1}>Banco:</option>
//           {banks.map((bank: any, i) => {
//            return (
//             <option key={'banco' + i} value={bank?.bankCode}> {bank?.bankName} </option>
//           )})}
//         </select>

//         <label className="text-lg font-semibold text-slate-600"> Número de documento </label>
//         <input type="number" name="doc_number" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}/>

//         <label className="text-lg font-semibold text-slate-600"> Nombre </label>
//         <input type="text" name="first_name" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}/>

//         <label className="text-lg font-semibold text-slate-600"> Apellido </label>
//         <input type="text" name="last_name" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}/>

//         <label className="text-lg font-semibold text-slate-600"> Email </label>
//         <input type="text" name="email" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}/>

//         <label className="text-lg font-semibold text-slate-600"> Teléfono </label>
//         <input type="number" name="phone" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}/>

//         <label className="text-lg font-semibold text-slate-600"> IP </label>
//         <input type="text" name="ip" className="w-full rounded-lg border-2 px-2 py-1" onChange={handleChange}/>

//         <button type="submit" className='flex cursor-pointer items-center  justify-center rounded-md bg-gradient-to-b from-slate-50 to-slate-300 text-sm font-semibold text-slate-600 drop-shadow-lg hover:from-slate-300 hover:to-slate-50 lg:py-2 lg:text-lg'>
//           Guardar
//         </button>
//       </form>
//     </React.Fragment>
//   );
// };

// export default Payments;
