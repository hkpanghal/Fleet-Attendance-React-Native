// import { networkInterfaces }  from 'os';

// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url)

// // const {networkInterfaces} = require("os")

// const nets = networkInterfaces;
// const results = Object.create(null);
 
// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//         if (net.family === familyV4Value && !net.internal) {
//             if (!results[name]) {
//                 results[name] = [];
//             }
//             results[name].push(net.address);
//         }
//     }
 
// }
// const ipAddress = results["Wi-Fi"][0]
// console.log(ipAddress)
// module.exports=  {ipAddress}  