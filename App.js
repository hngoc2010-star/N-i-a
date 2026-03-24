import React, {useState} from "react";
import {View,Text,TextInput,FlatList,TouchableOpacity,StyleSheet} from "react-native";
import {formatNumber,calcTotalEXW,calcSellAmount,calcProfit} from "./utils";
import * as Clipboard from "expo-clipboard";

export default function App(){

const [supplier,setSupplier]=useState("");
const [orderDate,setOrderDate]=useState("");
const [deliveryDate,setDeliveryDate]=useState("");
const [qty,setQty]=useState("");
const [type,setType]=useState("");
const [f,setF]=useState("1F");
const [logo,setLogo]=useState("VNPL");
const [exw,setExw]=useState("");
const [logistics,setLogistics]=useState("");
const [sell,setSell]=useState("");

const [orders,setOrders]=useState([]);

const addOrder=()=>{

const q=parseFloat(qty)||0;
const e=parseFloat(exw)||0;
const s=parseFloat(sell)||0;
const l=parseFloat(logistics)||0;

const totalEXW=calcTotalEXW(q,e);
const sellAmount=calcSellAmount(q,s);
const profit=calcProfit(q,e,s,l);

const newOrder={
id:Date.now().toString(),
supplier,
orderDate,
deliveryDate,
qty:q,
type,
f,
logo,
exw:e,
totalEXW,
logistics:l,
sell:s,
profit
};

setOrders([...orders,newOrder]);
};

const copyResult=()=>{

let text="";

orders.forEach(o=>{
text+=`
Order:${o.orderDate} | Delivery:${o.deliveryDate}
${o.supplier}
Qty:${o.qty}
EXW:${formatNumber(o.exw)}
Sell:${formatNumber(o.sell)}
Profit:${formatNumber(o.profit)}

`;
});

Clipboard.setStringAsync(text);
};

return(

<View style={styles.container}>

<Text style={styles.title}>PLYWOOD ORDER</Text>

<TextInput placeholder="Supplier" style={styles.input} onChangeText={setSupplier}/>
<TextInput placeholder="Order Date" style={styles.input} onChangeText={setOrderDate}/>
<TextInput placeholder="Delivery Date" style={styles.input} onChangeText={setDeliveryDate}/>

<TextInput placeholder="Quantity" keyboardType="numeric" style={styles.input} onChangeText={setQty}/>
<TextInput placeholder="Type" style={styles.input} onChangeText={setType}/>

<TextInput placeholder="EXW price" keyboardType="numeric" style={styles.input} onChangeText={setExw}/>
<TextInput placeholder="Logistics" keyboardType="numeric" style={styles.input} onChangeText={setLogistics}/>
<TextInput placeholder="Sell price" keyboardType="numeric" style={styles.input} onChangeText={setSell}/>

<TouchableOpacity style={styles.button} onPress={addOrder}>
<Text style={styles.buttonText}>ADD ORDER</Text>
</TouchableOpacity>

<FlatList
data={orders}
keyExtractor={(item)=>item.id}
renderItem={({item})=>{

return(

<View style={styles.row}>

<Text>{item.orderDate}</Text>
<Text>{item.deliveryDate}</Text>
<Text>{item.supplier}</Text>
<Text>{item.qty}</Text>

<Text>{formatNumber(item.totalEXW)}</Text>

<Text style={{
color:item.profit>0?"blue":"red",
fontWeight:"bold"
}}>
{formatNumber(item.profit)}
</Text>

</View>

);
}}
/>

<TouchableOpacity style={styles.copy} onPress={copyResult}>
<Text style={styles.buttonText}>COPY ZALO</Text>
</TouchableOpacity>

</View>

);
}

const styles=StyleSheet.create({

container:{
flex:1,
padding:20,
marginTop:40
},

title:{
fontSize:24,
fontWeight:"bold",
marginBottom:10
},

input:{
borderWidth:1,
borderColor:"#ccc",
padding:8,
marginBottom:8
},

button:{
backgroundColor:"#2c7",
padding:10,
alignItems:"center",
marginBottom:10
},

copy:{
backgroundColor:"#28f",
padding:10,
alignItems:"center",
marginTop:10
},

buttonText:{
color:"#fff",
fontWeight:"bold"
},

row:{
flexDirection:"row",
justifyContent:"space-between",
padding:8,
borderBottomWidth:1
}

});
